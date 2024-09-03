const elements = document.querySelectorAll('.floatImage, .skills');

function initFloatingEffect(element) {
    // Get the viewport dimensions
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    // Ensure the element has a unique initial position
    let posX = Math.random() * (viewportWidth - element.clientWidth);
    let posY = Math.random() * (viewportHeight - element.clientHeight);
    let directionX = (Math.random() * 2 - 1) * 2; // Random initial direction and speed
    let directionY = (Math.random() * 2 - 1) * 2; // Random initial direction and speed

    function changeDirection() {
        directionX = (Math.random() * 2 - 1) * 2; // New random direction
        directionY = (Math.random() * 2 - 1) * 2; // New random direction
    }

    setInterval(changeDirection, 5000);

    function moveElement() {
        // Update the viewport dimensions on each move
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;

        posX += directionX;
        posY += directionY;

        // Ensure the element stays within the bounds of the current viewport
        if (posX < 0 || posX > viewportWidth - element.clientWidth) {
            directionX = -directionX;
        }
        if (posY < 0 || posY > viewportHeight - element.clientHeight) {
            directionY = -directionY;
        }

        // Update element position
        element.style.position = 'absolute'; // Ensure the element is positioned absolutely
        element.style.left = `${posX}px`;
        element.style.top = `${posY}px`;

        // Keep the movement smooth
        requestAnimationFrame(moveElement);
    }

    moveElement();
}

// Initialize floating effect for each element
elements.forEach(initFloatingEffect);

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.floatImage, .skills');
    const minScale = 0; // Minimum scale when far away
    const maxScale = 1.; // Maximum scale when close
    const proximity = 300; // Distance threshold for scaling up

    let mouseX = window.innerWidth / 2; // Initialize mouseX to center of the screen
    let mouseY = window.innerHeight / 2; // Initialize mouseY to center of the screen

    // Function to calculate distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    // Function to update scaling based on proximity to the mouse
    function updateScaling() {
        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const elementX = elementRect.left + elementRect.width / 2;
            const elementY = elementRect.top + elementRect.height / 2;

            const distance = getDistance(mouseX, mouseY, elementX, elementY);
            const scale = Math.max(minScale, Math.min(maxScale, (proximity - distance) / proximity));

            element.style.transform = `scale(${scale})`;
        });
    }

    // Update mouse position on mouse move
    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Check the mouse position and update scaling every 50ms
    setInterval(updateScaling, 50);

    // Initialize floating effect for each element
    const initFloatingEffect = (element) => {
        let posX = Math.random() * (window.innerWidth - element.clientWidth);
        let posY = Math.random() * (window.innerHeight - element.clientHeight);
        let directionX = (Math.random() * 2 - 1) * 2;
        let directionY = (Math.random() * 2 - 1) * 2;

        const changeDirection = () => {
            directionX = (Math.random() * 2 - 1) * 2;
            directionY = (Math.random() * 2 - 1) * 2;
        };

        setInterval(changeDirection, 5000);

        const moveElement = () => {
            console.log("call")
            posX += directionX;
            posY += directionY;

            if (posX < 0 || posX > window.innerWidth - element.clientWidth) {
                directionX = -directionX;
            }
            if (posY < 0 || posY > window.innerHeight - element.clientHeight) {
                directionY = -directionY;
            }

            element.style.left = `${posX}px`;
            element.style.top = `${posY}px`;

            requestAnimationFrame(moveElement);
        };
        moveElement
    };

    elements.forEach(initFloatingEffect);
});
