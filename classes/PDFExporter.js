class PDFExporter {
    exportToPDF(photobook) {
        console.log(photobook)
        var doc = new jsPDF({
            unit: 'px',
            format: 'a4'
          })

        var widthRatio = doc.internal.pageSize.getWidth()/photobook.width;
        var heightRatio = doc.internal.pageSize.getHeight()/photobook.height;
        
        var pageCount = 1;
        for (let page of photobook.pages) {
            //loop with all pages of photobook
            doc.addImage(page.backgroundImage, "JPEG", 0, 0, page.width, page.height, "background", "NONE");
            var imgCount = 1;
            for (let image of page.images){
                //loop with all images of page

                var angle = this.getAngle(image.rotation)// angle in full 360 degree range

                var rotatedOrigin = this.getRotatedOrigin(image.left, image.top, image.width, image.height,
                    widthRatio, heightRatio, image.rotation)

                doc.addImage(image.backgroundImage, "JPEG", rotatedOrigin.x, rotatedOrigin.y-image.height*heightRatio,
                image.width*widthRatio, image.height*heightRatio,"img"+pageCount+"."+imgCount, "NONE", angle);

                imgCount++;
            }
            for (let textBox of page.textBoxes){
                //loop with all textBoxes of page

                doc.setFontSize(textBox.fontSize);
                
                
                var textX = (textBox.left+10)*widthRatio
                var textY = (textBox.top+10+textBox.fontSize)*widthRatio

                console.log(textBox.left);
                console.log(textBox.top);
                console.log(textBox.text);

                doc.text(textX, textY, textBox.text);

            }
            doc.addPage();
        }
        doc.deletePage(2);
        doc.save('elo.pdf');
    }

    //TODO: Refactor it so that widthRatio and heightRatio are uniform for entire photobook and not passed as parameter
    getRotatedOrigin(x, y, width, height, widthRatio, heightRatio, rotation) {
        var rot = rotation * (Math.PI/180); //rotation in radians

        var centerX = x*widthRatio+(width*widthRatio)/2;
        var centerY = y*heightRatio+(height*heightRatio)/2;

        var bottomX = x*widthRatio;
        var bottomY = y*heightRatio+height*heightRatio;
                
        var newX = centerX + (bottomX-centerX)*Math.cos(rot) - (bottomY-centerY)*Math.sin(rot);
        var newY = centerY + (bottomX-centerX)*Math.sin(rot) + (bottomY-centerY)*Math.cos(rot);

        return {x:newX, y:newY}
    }

    getAngle(rotation){
        if (-rotation >=0 ) return -rotation;
        return 360-rotation;
    }
}