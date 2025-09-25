// Configuration for movement
const MOVEMENT_STEP = 50; 
const TRUCK_NAME_A = "truck"; 
const TRUCK_NAME_B = "truck 2"; 

// Get the element
const splineViewer = document.getElementById('spline-scene');
const controls = document.getElementById('controls');

// Initially disable controls until the scene is ready
if (controls) {
    controls.style.pointerEvents = 'none'; // Disable button clicks
    controls.style.opacity = '0.5'; // Visually indicate they are disabled
}

/**
 * Moves a specified truck object in a given direction.
 * (Defined globally for the HTML onclick to work)
 */
window.moveTruck = async function(objectName, direction) {
    // This check handles cases where the button is clicked before load, 
    // although the load listener should prevent the user from clicking.
    if (!splineViewer || !splineViewer.spline) {
        console.warn('Spline API not initialized yet. Controls are still loading.');
        return;
    }

    try {
        const truck = await splineViewer.spline.findObjectByName(objectName);

        if (!truck) {
            console.error(`Object '${objectName}' NOT FOUND. Check the name in Spline!`);
            return;
        }

        const currentPosition = truck.position;
        let newPosition = { ...currentPosition };

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

        splineViewer.spline.setObjectPosition(objectName, newPosition, 200);

    } catch (error) {
        console.error('Error moving truck:', error);
    }
};

// --- API Ready Check ---
if (splineViewer) {
    splineViewer.addEventListener('load', () => {
        console.log('Spline scene loaded. Ready to move trucks! Controls enabled.');
        
        // 🌟 FIX: Enable the controls ONLY when the scene is fully loaded
        if (controls) {
            controls.style.pointerEvents = 'auto'; // Re-enable button clicks
            controls.style.opacity = '1.0'; // Restore visual look
        }
    });
} else {
    console.error('Spline viewer element not found.');
}