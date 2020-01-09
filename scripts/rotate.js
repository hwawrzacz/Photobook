// rotate
const rotateElement = (target, hook) => {
  const initializeRotating = (event) => {
    event.stopPropagation();
    event.preventDefault();
    window.addEventListener('mousemove', rotate);
    window.addEventListener('mouseup', endRotate);
  };

  const main = document.querySelector('#view');

  const rotate = (event) => {
    let centerX = target.left + (target.width / 2);
    let centerY = target.top + (target.height / 2);
    let mouseX = parseFloat(event.pageX - main.offsetLeft);
    let mouseY = parseFloat(event.pageY - main.offsetTop);
    let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
    let degree = (radians * (180 / Math.PI) * -1);

    if (event.shiftKey) {
      degree = Math.round((degree / 15)) * 15;
    }

    target.rotation = degree;
  };

  const endRotate = () => {
    window.removeEventListener('mousemove', rotate);
    window.removeEventListener('mouseup', endRotate);
  };

  hook.addEventListener('mousedown', initializeRotating);
};
