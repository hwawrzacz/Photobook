//rotate
const rotateElement = (element, hook) => {
    const rotateStarter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.addEventListener('mousemove', rotate);
        window.addEventListener('mouseup', endRotate);
    };

    const rotate = (e) => {
        const imageStyles = window.getComputedStyle(element);
        let width = parseFloat(imageStyles.getPropertyValue('width'));
        let height = parseFloat(imageStyles.getPropertyValue('height'));
        let centerX = element.offsetLeft + (width / 2);
        let centerY = element.offsetTop + (height / 2);
        let mouseX = parseFloat(e.pageX);
        let mouseY = parseFloat(e.pageY);
        let radians = Math.atan2(mouseX - centerX, mouseY - centerY);
        let degree = (radians * (180 / Math.PI) * -1);
        element.style.setProperty('transform', `rotate(${degree}deg)`);
    };

    const endRotate = () => {
        window.removeEventListener('mousemove', rotate);
        window.removeEventListener('mouseup', endRotate);
    };
    
    hook.addEventListener('mousedown', rotateStarter);
};
