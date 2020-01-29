class PPTXExporter {
    constructor(photobook){
        this.pptx = new PptxGenJS();
        this.docWidth = 8.27;
        this.docHeight = 11.7;
        this.widthRatio = 446.46 / photobook.width;
        this.heightRatio = 631.417 / photobook.height;
        this.pptx.defineLayout({ name:'A4', width:this.docWidth, height:this.docHeight });
        this.pptx.layout = 'A4'

        this.photobook = photobook;
        this.currentSlide = null;
    }

    exportToPPTX() {
        for (let page of photobook.pages){
            var slide = this.pptx.addSlide();
            this.currentSlide = slide;
            if(page.backgroundImage != undefined){
                slide.addImage({ data:page.backgroundImage, x:0, y:0, w:this.docWidth, h:this.docHeight });
            }

            // combine textBoxes and images from page to one array
            // and then sort them by z-index
            var elements = page.textBoxes.concat(page.images);
            elements.sort(this.compareElements);

            // insert all of the elements on a current slide
            for (let element of elements){
                if (element.constructor.name == "TextBox"){
                    this.insertText(element);
                }
                else if(element.constructor.name == "PhotobookImage"){
                    this.insertImage(element);
                }
            }
        }

        this.pptx.writeFile(this.photobook.name+'.pptx');
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

    insertImage(img){
        this.currentSlide.addImage({ data:img.backgroundImage, x:this.xToInch(img.left), y:this.yToInch(img.top), 
           w:this.xToInch(img.width), h:this.yToInch(img.height), rotate:Math.round(img.rotation) });
    }

    insertText(textBox){
        if(textBox.backgroundColor == "white"){ 
            textBox.backgroundColor="#FFFFFF"
        }
        
        var textColor = textBox.textColor;
        if(textBox.textColor.toString() == "#000"){ 
            textColor="#000000";
        }

        var options = {align:textBox.TextAlign, fontSize:textBox.fontSize*this.widthRatio, color:textColor.substr(1), bold:textBox.bold,
            italic: textBox.italic}

        if(textBox.urlMode){ 
                options.hyperlink = {url: textBox.urlText}
        }

        this.currentSlide.addText(
            [{
                text: textBox.text, 
                options: options
                }],
                {x:this.xToInch(textBox.left), y:this.yToInch(textBox.top), w:this.xToInch(textBox.width), h:this.yToInch(textBox.height),
                rotate:Math.round(textBox.rotation), shape:this.pptx.shapes.RECTANGLE, fill: textBox.backgroundColor.substr(1)}
            );
    }

    xToInch(value){
        return value/446.46* 8.27 * this.widthRatio;
    }

    yToInch(value){
        return value/631.417 * 11.7 * this.heightRatio;
    }
}