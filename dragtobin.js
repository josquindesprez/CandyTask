//dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos3 = 0;
  var initialPosition = 0;  // To store the initial position

  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    // Store the initial position before dragging starts
    initialPosition = elmnt.offsetLeft;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    let attribute = elmnt.getAttribute("data-custom-value");
    var makeVisibleId = document.getElementById(`targetDiv${attribute}`); 
    console.log(`attribute is ${attribute}`)
    makeVisibleId.style.visibility="visible";
    //makeVisibleId.style.background="linear-gradient(to right, white 0%, red 50%, white 100%);" 
    makeVisibleId.style.background="red";
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position (only horizontally):
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;
    // set the element's new position (only horizontally):
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    let attribute = elmnt.getAttribute("data-custom-value");
    var targetId = `targetDiv${attribute}`;
    if (isInsideTarget(elmnt, document.getElementById(targetId))) {
      // Call your function here when the element is inside the targetDiv
       
      onDropInsideTarget(elmnt);
    } else {
      // If not inside target, revert back to original position
       // selectTaskList(taskList)  
        elmnt.style.left = initialPosition + "px";
    }
    
    var makeHidId = document.getElementById(`targetDiv${attribute}`); 
    console.log(attribute)
    makeHidId.style.visibility="hidden";  
    document.onmouseup = null;
    document.onmousemove = null;
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
  // Do whatever you want to do when the dragged element is inside the target div
let attribute = draggedElement.getAttribute("data-custom-value") 
console.log("INSIDE TARGET")
deleteTaskListByName(attribute)
//location.reload()
var todoSub = document.getElementById('todoSubsections');
todoSub.innerHTML=""
retrieveStoredTaskLists();

}

