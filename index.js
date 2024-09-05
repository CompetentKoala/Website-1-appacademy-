const elements = document.querySelectorAll('.floatImage, .skills');

function initFloatingEffect(element) {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    let posX = Math.random() * (viewportWidth - element.clientWidth);
    let posY = Math.random() * (viewportHeight - element.clientHeight);
    let directionX = (Math.random() * 2 - 1) * 2;
    let directionY = (Math.random() * 2 - 1) * 2;

    function changeDirection() {
        directionX = (Math.random() * 2 - 1) * 2;
        directionY = (Math.random() * 2 - 1) * 2;
    }

    setInterval(changeDirection, 5000);

    function moveElement() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;

        posX += directionX;
        posY += directionY;

        if (posX < 0 || posX > viewportWidth - element.clientWidth) {
            directionX = -directionX;
        }
        if (posY < 0 || posY > viewportHeight - element.clientHeight) {
            directionY = -directionY;
        }

        element.style.position = 'absolute';
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;

        requestAnimationFrame(moveElement);
    }

    moveElement();

    element.addEventListener('click', (event) => {
        const clickX = event.clientX;
        const clickY = event.clientY;

        element.style.transition = 'transform 0.2s, opacity 0.2s';
        element.style.transform = 'scale(0)';
        element.style.opacity = '0';

        setTimeout(() => {
            const staticText = document.createElement('div');
            staticText.className = 'staticText';
            staticText.textContent = element.textContent;
            staticText.style.position = 'absolute';
            staticText.style.left = `${clickX}px`;
            staticText.style.top = `${clickY}px`;
            staticText.style.transform = 'translate(-50%, -50%)'; // Center the text on the click point
            staticText.style.color = 'white';
            staticText.style.fontSize = '1.2em';
            staticText.style.filter = 'blur(1px)';

            document.body.appendChild(staticText);
            element.remove();
        }, 200);
    });
}

elements.forEach(initFloatingEffect);

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.floatImage, .skills');
    const minScale = 0;
    const maxScale = 2;
    const proximity = 300;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function updateScaling() {
        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const elementX = elementRect.left + elementRect.width / 2;
            const elementY = elementRect.top + elementRect.height / 2;

            const distance = getDistance(mouseX, mouseY, elementX, elementY);
            const scale = Math.max(minScale, Math.min(maxScale, (proximity - distance) / proximity));
            const blur = 2 * (1 - scale);

            element.style.transform = `scale(${scale})`;
            element.style.filter = `blur(${blur}px)`;
        });
    }

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    setInterval(updateScaling, 50);
    elements.forEach(initFloatingEffect);
});
