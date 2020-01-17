class PDFExporter {
    constructor(photobook){
        this.doc = new jsPDF({
            unit: 'px',
            format: 'a4'
          });
        this.docWidth = this.doc.internal.pageSize.getWidth();
        this.docHeight = this.doc.internal.pageSize.getHeight();
        this.widthRatio = this.docWidth / photobook.width;
        this.heightRatio = this.docHeight / photobook.height;
        this.photobook = photobook;
        this.pageCount = 1;
    }

    exportToPDF() {
        console.log("WIDTH :" + this.docWidth)
        console.log("HEIGHT :" + this.docHeight)
        for (let page of photobook.pages){
            if(page.backgroundImage != undefined){
                this.doc.addImage(page.backgroundImage, "JPEG", 0, 0, this.docWidth, this.docHeight, "background_"+this.pageCount.toString(), "NONE");
            }
                var imgCount = 1;

            // combine textBoxes and images from page to one array
            // and then sort them by z-index
            var elements = page.textBoxes.concat(page.images);
            elements.sort(this.compareElements);

            for (let element of elements){
                if (element.constructor.name == "TextBox"){
                    console.log("textBox added");
                    this.insertText(element);
                }
                else if(element.constructor.name == "PhotobookImage"){
                    this.insertImage(element, imgCount);
                    imgCount++;
                }
            }

            this.doc.addPage();
            this.pageCount++;
        }
        this.doc.deletePage(this.pageCount);
        this.doc.save(this.photobook.name+'.pdf');
    }

    getRotatedOrigin(x, y, width, height, rotation) {
        var rot = rotation * (Math.PI/180); //rotation in radians

        var centerX = x*this.widthRatio+(width*this.widthRatio)/2;
        var centerY = y*this.heightRatio+(height*this.heightRatio)/2;

        var bottomX = x*this.widthRatio;
        var bottomY = y*this.heightRatio+height*this.heightRatio;
                
        var newX = centerX + (bottomX-centerX)*Math.cos(rot) - (bottomY-centerY)*Math.sin(rot);
        var newY = centerY + (bottomX-centerX)*Math.sin(rot) + (bottomY-centerY)*Math.cos(rot);

        return {x:newX, y:newY}
    }
    getRotatedTextOrigin(x, y, tx, ty, width, height, rotation) {
        var rot = rotation * (Math.PI/180); //rotation in radians

        var centerX = x*this.widthRatio+(width*this.widthRatio)/2;
        var centerY = y*this.heightRatio+(height*this.heightRatio)/2;
                
        var newX = centerX + (tx*this.widthRatio-centerX)*Math.cos(rot) - (ty*this.heightRatio-centerY)*Math.sin(rot);
        var newY = centerY + (tx*this.widthRatio-centerX)*Math.sin(rot) + (ty*this.heightRatio-centerY)*Math.cos(rot);

        return {x:newX, y:newY}
    }

    getAngle(rotation){
        if (-rotation >=0 ) return -rotation;
        return 360-rotation;
    }

    compareElements(a, b){
        if (a.zIndex < b.zIndex){
            return -1;
        }
        if (a.zIndex > b.zIndex){
            return 1;
        }
        return 0;
    }

    insertImage(img, imgCount){
        var angle = this.getAngle(img.rotation)// angle in full 360 degree range

        var rotatedOrigin = this.getRotatedOrigin(img.left, img.top, img.width, img.height, img.rotation)

        this.doc.addImage(img.backgroundImage, "JPEG", rotatedOrigin.x, rotatedOrigin.y-img.height*this.heightRatio,
            img.width*this.widthRatio, img.height*this.heightRatio,"img"+this.pageCount+"."+imgCount, "NONE", angle);
    }

    insertText(textBox){
        var angle = this.getAngle(textBox.rotation)

        //draw background rectangle
        var centerX = textBox.left*this.widthRatio+textBox.width*this.widthRatio/2;
        var centerY = textBox.top*this.heightRatio+textBox.height*this.heightRatio/2;
        var ctx = this.doc.context2d
        ctx.save()
        ctx.translate(centerX, centerY);
        ctx.rotate((360-angle)*Math.PI/180);
        ctx.fillStyle = textBox.backgroundColor;
        ctx.translate(-centerX, -centerY);
        ctx.fillRect(textBox.left*this.widthRatio, textBox.top*this.heightRatio, textBox.width*this.widthRatio, textBox.height*this.heightRatio);
        ctx.restore()

        //insert and format text
        this.doc.setFontSize(textBox.fontSize*this.widthRatio);
        this.doc.setTextColor(textBox.textColor);
        this.doc.setTextColor(textBox.textColor);

        var textDimensions = this.doc.getTextDimensions(textBox.text)

        if(textBox.bold && textBox.italic){
            this.doc.setFontType("bolditalic");
        }
        else if(textBox.bold){
            this.doc.setFontType("bold");
        }
        else if(textBox.italic){
            this.doc.setFontType("italic");
        }

        var textX = textBox.left;
        if(textBox.TextAlign == "left") textX += 5;
        if(textBox.TextAlign == "center") textX = textX + textBox.width/2 - textDimensions.w/2;
        if(textBox.TextAlign == "right") textX = textX + textBox.width - textDimensions.w - 5;
        var textY = textBox.top+textBox.height/2+textDimensions.h/3
        var rotatedOrigin = this.getRotatedTextOrigin(textBox.left, textBox.top, textX, textY, textBox.width, textBox.height, textBox.rotation)
        this.doc.text(textBox.text, rotatedOrigin.x, rotatedOrigin.y, {angle:angle.toString(), rotationDirection: "1"});
        if(textBox.urlMode){
            var rotatedEndOrigin = this.getRotatedTextOrigin(textBox.left, textBox.top, textX + textDimensions.w, textY, textBox.width, textBox.height, textBox.rotation)
            this.doc.link(rotatedOrigin.x, rotatedOrigin.y-textDimensions.h, Math.abs(rotatedOrigin.x - rotatedEndOrigin.x),  Math.abs(rotatedOrigin.y - rotatedEndOrigin.y)+textDimensions.h, {url:textBox.urlText.href});
        } 
    }
}