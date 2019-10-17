const page = document.querySelector(".page-container");
const image = document.querySelector(".image");
// const imageWraper = document.querySelector(".image-wrapper");
const hookResize = document.querySelector(".hook-resize");
const hookRotate = document.querySelector(".hook-rotate");

resize(image, hookResize);
move(image);
rotateElement(image, hookRotate);

//shift keypress test
// $(document).keydown(function (e) {
//     if (e.shiftKey){
//         image.text("shift"); 
//     }
// });

// $(document).keyup(function (e) {
//         image.text(""); 
// });