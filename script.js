// KEY CHANGE: Import from the '@splinetool/runtime' package, not the 'viewer'.
import { Application } from 'https://unpkg.com/@splinetool/runtime@1.8.2/build/runtime.js';

// Configuration for movement
const MOVEMENT_STEP = 50; 

// Get the necessary elements
const canvas = document.getElementById('spline-canvas');
const controls = document.getElementById('controls');

// This will hold our Spline application instance
let spline; 

/**
 * Moves a specified truck object in a given direction.
 * (Attached to the window object to be accessible by HTML onclick)
 */
window.moveTruck = function(objectName, direction) {
    if (!spline) {
        console.warn('Spline app is not ready yet.');
        return;
    }
    
    const truck = spline.findObjectByName(objectName);

    if (!truck) {
        console.error(`Object '${objectName}' NOT FOUND. Check the name in the Spline editor!`);
        return;
    }

    const currentPosition = truck.position;
    let newPosition = { ...currentPosition }; // Create a copy

    switch (direction) {
        case 'forward': 
            newPosition.z -= MOVEMENT_STEP; 
            break;
        case 'backward': 
            newPosition.z += MOVEMENT_STEP;
            break;
        case 'left': 
            newPosition.x -= MOVEMENT_STEP;
            break;
        case 'right': 
            newPosition.x += MOVEMENT_STEP;
            break;
    }
    
    // Animate the position by directly setting the new values
    truck.position.x = newPosition.x;
    truck.position.y = newPosition.y;
    truck.position.z = newPosition.z;
};

/**
 * Main function to initialize and load the Spline scene.
 */
async function main() {
    // Initially disable controls
    if (controls) {
        controls.style.pointerEvents = 'none';
        controls.style.opacity = '0.5';
    }

    // Start the Spline application
    spline = new Application(canvas);

    // Load the scene and wait for it to be ready
    await spline.load('https://prod.spline.design/h-uXRz4tG5eQsGgf/scene.splinecode');
    
    console.log('Spline scene loaded successfully. Controls enabled.');

    // Enable the controls now that the scene is fully loaded
    if (controls) {
        controls.style.pointerEvents = 'auto';
        controls.style.opacity = '1.0';
    }
}

// Run the main initialization function
main();

{/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.70/build/spline-viewer.js"></script> */}
