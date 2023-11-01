function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var initialPosition = {left: 0, top: 0};

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    initialPosition.left = elmnt.offsetLeft;
    initialPosition.top = elmnt.offsetTop;
    
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
    document.addEventListener('mouseleave', closeDragElement);

    var makeBinVisible = document.getElementById('targetDiv');
    makeBinVisible.style.visibility="visible";
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  }

function closeDragElement() {
    // Keeping a reference to the bin element to avoid multiple DOM searches
    var makeBinHid = document.getElementById("targetDiv"); 

    // Check if the element is inside the target and perform any operations
    if (isInsideTarget(elmnt, makeBinHid)) {
        onDropInsideTarget(elmnt);
    } else {
        elmnt.style.left = initialPosition.left + "px";
        elmnt.style.top = initialPosition.top + "px";
    }

    // Always hide the bin after the drag ends, regardless of whether the item was dropped inside
    makeBinHid.style.visibility="hidden";

    // Remove the event listeners after all operations are complete
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
    document.removeEventListener('mouseleave', closeDragElement);
}
  
}

function isInsideTarget(draggedElement, targetElement) {
  var draggedRect = draggedElement.getBoundingClientRect();
  var targetRect = targetElement.getBoundingClientRect();

  return (
    draggedRect.top < targetRect.bottom &&
    draggedRect.bottom > targetRect.top &&
    draggedRect.left < targetRect.right &&
    draggedRect.right > targetRect.left
  );
}

function onDropInsideTarget(draggedElement) {
  // Your existing code here...
  let attribute = draggedElement.getAttribute("data-custom-value") 
  deleteTaskListByName(attribute)
  var todoSub = document.getElementById('todoSubsections');
  todoSub.innerHTML=""
  retrieveStoredTaskLists();
}

