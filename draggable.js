function makeDraggable(lista) {
    const listContainer = document.getElementById('todoSelSubsection');

    // Adding dragover, drop, and dragstart listeners if not already added
    if (!listContainer.dataset.draggableInitialized) {
        // Allow dragging over the container
        listContainer.addEventListener('dragover', e => {
            e.preventDefault(); // Necessary to allow for dropping
        });

        // Handle drop
        listContainer.addEventListener('drop', e => {
            e.preventDefault();
            handleDrop(e, lista);
        });

        // Handle drag start using event delegation
        listContainer.addEventListener('dragstart', handleDragStart);

        // Mark as initialized to prevent adding listeners again
        listContainer.dataset.draggableInitialized = "true";
    }
}

function handleDragStart(e) {
    if (e.target.matches('.draggable')) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
    }
}

function handleDrop(e, lista) {
    const draggedName = e.dataTransfer.getData('text/plain');
    let targetElement = e.target.closest('.draggable');
    
    if (!targetElement) return; // Exit if the drop target is not a draggable item

    const targetName = targetElement.getAttribute('data-name');
    const draggedIndex = lista.findIndex(item => item.name === draggedName);
    const targetIndex = lista.findIndex(item => item.name === targetName);

    if (draggedIndex > -1 && targetIndex > -1) {
        // Swap their 'number' properties and sort lista
        [lista[draggedIndex].number, lista[targetIndex].number] = [lista[targetIndex].number, lista[draggedIndex].number];
        lista.sort((a, b) => a.number - b.number);

        // Persist the updated list and refresh the UI
        storeTaskLists(lista); // Make sure this function correctly handles storing the updated list
        renderSelectedList(lista); // Ensure this re-renders the list, potentially calling makeDraggable again as needed
    } else {
        console.error('Error: Draggable item not found in the list.');
    }
}

