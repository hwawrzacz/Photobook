class PDFExporter {
    exportToPDF(photobook) {

        var doc = new jsPDF({
            unit: 'px',
            format: 'a4'
          })

        var widthRatio = doc.internal.pageSize.getWidth()/photobook.width;
        var heightRatio = doc.internal.pageSize.getHeight()/photobook.height;

        
        for (let page of photobook.pages) {
            //loop with all pages of photobook

            for (let image of page.images){
                //loop with all images of page

                //TODO: put all the rotation logic in other method
                if (-image.rotation >=0 ){
                    var angle = -image.rotation;
                }
                else{
                    var angle = 360-image.rotation;
                } // angle in full 360 degree range

                var rotation = image.rotation * (Math.PI/180); //rotation in radians

                var centerX = image.left*widthRatio+(image.width*widthRatio)/2;
                var centerY = image.top*heightRatio+(image.height*heightRatio)/2;

                var bottomX = image.left*widthRatio;
                var bottomY = image.top*heightRatio+image.height*heightRatio;
                
                var newX = centerX + (bottomX-centerX)*Math.cos(rotation) - (bottomY-centerY)*Math.sin(rotation);
                var newY = centerY + (bottomX-centerX)*Math.sin(rotation) + (bottomY-centerY)*Math.cos(rotation);

                doc.addImage(image.backgroundImage, "JPEG", newX,
                newY-image.height*heightRatio, image.width*widthRatio, image.height*heightRatio, "XD", "NONE", angle);
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
}