const page = document.querySelector(".page-container");
const image = document.querySelector(".image-wrapper");
const hookResize = document.querySelector(".hook-resize");
const hookRotate = document.querySelector(".hook-rotate");

move(image);
rotateElement(image, hookRotate);
resize(image, hookResize);

//shift keypress test
$(document).keydown(function (e) {
    if (e.shiftKey){
        image.text("shift"); 
    }
});

$(document).keyup(function (e) {
        image.text(""); 
});