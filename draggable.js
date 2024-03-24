

function makeDraggable(lista) {
    const listContainer = document.getElementById('todoSelSubsection');

    if (!listContainer.dataset.draggableInitialized) {
        listContainer.addEventListener('dragover', e => {
            e.preventDefault();
            highlightDragOverTarget(e);
        });

        listContainer.addEventListener('dragleave', e => {
            e.preventDefault();
            removeHighlight(e);
        });

        listContainer.addEventListener('drop', e => {
            e.preventDefault();
            removeHighlight(e);
            handleDrop(e, lista);
        });

        listContainer.addEventListener('dragstart', handleDragStart);

        listContainer.dataset.draggableInitialized = "true";
    }
}

function handleDragStart(e) {
    if (e.target.matches('.draggable')) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-name'));
        e.target.style.opacity = "0.5"; // Example styling, adjust as needed
    }
}

function highlightDragOverTarget(e) {
    const overTarget = e.target.closest('.draggable');
    if (overTarget) {
        // Optionally, clear styles from all other elements
        resetAllDragOverEffects();

        overTarget.classList.add('drag-over'); // Mark it visually
        overTarget.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)";
    }
}

function removeHighlight(e) {
    const leaveTarget = e.target.closest('.draggable');
    if (leaveTarget) {
        leaveTarget.classList.remove('drag-over');
        leaveTarget.style.boxShadow = '';
    }
}

function resetAllDragOverEffects() {
    document.querySelectorAll('.draggable.drag-over').forEach(element => {
        element.classList.remove('drag-over');
        element.style.boxShadow = '';
    });
}

function handleDrop(e, lista) {
    const draggedName = e.dataTransfer.getData('text/plain');
    let targetElement = e.target.closest('.draggable');

    if (!targetElement) return;

    const targetName = targetElement.getAttribute('data-name');
    const draggedIndex = lista.findIndex(item => item.name === draggedName);
    const targetIndex = lista.findIndex(item => item.name === targetName);

    if (draggedIndex > -1 && targetIndex > -1) {
        [lista[draggedIndex].number, lista[targetIndex].number] = [lista[targetIndex].number, lista[draggedIndex].number];
        lista.sort((a, b) => a.number - b.number);

        storeTaskLists(lista); // Implement or ensure this function saves the updated lista state
        renderSelectedList(lista); // Re-render your list with the updated order
    } else {
        console.error('Error: Draggable item not found in the list.');
    }

    // Ensure to reset opacity or any other drag styles
    document.querySelectorAll('.draggable').forEach(draggable => {
        draggable.style.opacity = ""; // Reset any drag styles
    });
}

