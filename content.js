document.addEventListener("DOMContentLoaded", function () {
    // Define approximate hours for each time period
    const dawnStart = 5;
    const dayStart = 7;
    const sunsetStart = 18;
    const nightStart = 20;

    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the appropriate image
    let imageUrl;
    if (currentHour >= dawnStart && currentHour < dayStart) {
        imageUrl = './milano/milano1.jpg';
    } else if (currentHour >= dayStart && currentHour < sunsetStart) {
        imageUrl = './milano/milano6.jpg';
    } else if (currentHour >= sunsetStart && currentHour < nightStart) {
        imageUrl = './milano/milano3.jpg';
    } else {
        imageUrl = './milano/milano4.jpg';
    }

    // Set the background image of the body
    document.body.style.backgroundImage = `url('${imageUrl}')`;
});

var panel = document.getElementById('panel');
var todoSS = document.getElementById('todoSubsections'); 
var addTL = document.getElementById('addTaskList');



panel.addEventListener('mouseenter', function(){
   
    
   var todoSS = document.getElementById('todoSubsections');
   todoSS.style.visibility = 'visible';
});

panel.addEventListener('mouseleave', function(){
   
   var todoSS = document.getElementById('todoSubsections');
   todoSS.style.visibility = 'hidden';
   

});

addTL.addEventListener('mouseover', function(){ 
    addTL.innerHTML ="Add!";

});

addTL.addEventListener('mouseleave', function(){ 
    addTL.innerHTML ="Lists";

});




// Function to show/hide sections
function showTodoSection() {
  var todoSection = document.getElementById('todoSection');
  todoSection.style.display = 'block';
}

function hideTodoSection() {
  var todoSection = document.getElementById('todoSection');
  todoSection.style.display = 'none';
}

function showTimerSection() {
  var timerSection = document.getElementById('timerSection');
  timerSection.style.display = 'block';
}

function hideTimerSection() {
  var timerSection = document.getElementById('timerSection');
  timerSection.style.display = 'none';
}

// Function to create a panel block for a task list
function createPanelBlock(taskList) {
  const panelBlock = document.createElement('div');
  var name = `dbc${taskList.name}`
  var id = `${taskList.id}`
  var textCon = taskList.name;
  panelBlock.setAttribute('data-textContent', textCon)
  panelBlock.className = 'panel-block is-fullwidth has-text-centered has-text-black is-size-6  is-uppercase has-text-weight-bold onhoversfondo ';
  panelBlock.style.background ="trasparent";
  panelBlock.style.outline = "none";
  panelBlock.style.border = "none";
    /*panelBlock.innerHTML = `<div id="drag${name}" data-bin-value="${name}" data-custom-value="${id}" style="position:absolute;" class="column is-2 has-background-primary"><p  class="my-text marker has-text-alert">${taskList.name}</p></div><div class="column is-4 has-background-success"></div><div class="column is-4"></div><div id="${name}" ></div>`*/
    panelBlock.innerHTML = `<div class="column is-4"></div><div id="drag${name}" data-bin-value="${name}" data-custom-value="${id}" style="position:absolute;left:8rem;" ><p  class="my-text marker has-text-alert">${taskList.name}</p></div>`
 
  

  // Add event listener to select the task list when the panel block is clicked
  panelBlock.addEventListener('click', function () {
    selectTaskList(taskList);
    console.log('click');
  });
  
  const panel = document.getElementById('todoSubsections');
  
  panel.appendChild(panelBlock);
  /*var removeButtonContainer=document.getElementById(name)
  var removeButton = document.createElement('div');
  removeButton.id=`targetDiv${id}`;
  removeButton.className="confini";
  removeButton.innerHTML =`<p class="" >drag&delete!</p>`
  removeButton.style.visibility = "hidden";
  
  removeButtonContainer.appendChild(removeButton);*/
  var dragelement = document.getElementById(`drag${name}`);
  dragElement(dragelement);
  






}

// Function to select a task list and mark it as active
// Function to select a task list and mark it as active
function selectTaskList(taskList) {
  
  // Get all panel blocks and convert NodeList to array
  const panelBlocks = Array.from(document.querySelectorAll('.panel-block'));

  // Remove the 'is-active' class from all panel blocks
  panelBlocks.forEach((panelBlock) => {
    panelBlock.classList.remove('is-active');
  });
  
  // Add the 'is-active' class to the selected panel block
  const selectedPanelBlock = panelBlocks.find((panelBlock) => panelBlock.getAttribute('data-textContent') === taskList.name);
  console.log(selectedPanelBlock)
  if (selectedPanelBlock) {
    selectedPanelBlock.classList.add('is-active');
     
    var todosubsec = document.getElementById('todoSelSubsection')
    if (todosubsec.hasChildNodes()) {
    // If it has child nodes, remove all of them
    while (todosubsec.firstChild) {
      todosubsec.removeChild(todosubsec.firstChild);
    }
    }
    
    kant = document.createElement('div');
    kant.innerHTML = taskList.name;
     
    todosubsec.appendChild(kant);
    
    renderSelectedList(taskList.tasks) 
    
  }

  // Update the selected task list
  const todoLink = document.getElementById('todoLink');
  const timerLink = document.getElementById('timerLink');

  if (taskList.type === 'todo') {
    todoLink.classList.add('is-active');
    timerLink.classList.remove('is-active');
  } else {
    todoLink.classList.remove('is-active');
    timerLink.classList.add('is-active');
  }
}


let taskLists = [];
function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Function to add a new task list
function addTaskList() {
  const taskListName = prompt('Enter the name of the new task list:');
  if (!taskListName) {
    return; // If the user cancels or provides an empty name, do nothing.
  }

  // Check if a task list with the same name already exists
  const existingTaskList = taskLists.find(taskList => taskList.name === taskListName);
  if (existingTaskList) {
    alert('A task list with the same name already exists.');
    return;
  }

  const todoLink = document.getElementById('todoLink');
  const timerLink = document.getElementById('timerLink');
  const isTodoActive = todoLink.classList.contains('is-active');
  const id = generateUniqueID()
  console.log(`id is ${id}`)
  // Create a new task list object
  const newTaskList = {
    name: taskListName,
    type: isTodoActive ? 'todo' : 'timer',
    tasks: [],
    id: id
  };

  // Add the new task list to the taskLists array
  taskLists.push(newTaskList);

  // Save the updated task lists to local storage
  storeTaskLists();

  // Create the panel block for the new task list
  createPanelBlock(newTaskList);

  // If the new task list is a "Todo" type, update the subsections
  if (isTodoActive) {
    updateSubsections(newTaskList, document.getElementById('todoSubsections'), document.getElementById('timerSubsections'));
  }
}



// Function to store the task lists in the browser's local storage
function storeTaskLists() {
  localStorage.setItem('taskLists', JSON.stringify(taskLists));
}

// Function to retrieve the task lists from the browser's local storage (if any)
function retrieveStoredTaskLists() {
  const storedTaskLists = localStorage.getItem('taskLists');
  if (storedTaskLists) {
    console.log(storedTaskLists);
    taskLists = JSON.parse(storedTaskLists);
    taskLists.forEach((taskList) => {
      createPanelBlock(taskList);
    });
  }
}

function deleteTaskListByName(taskListId) {
  
  const storedTaskLists = localStorage.getItem('taskLists');
  if (storedTaskLists) {
    let taskLists = JSON.parse(storedTaskLists);

    // Filter out the task list with the specified ID
    taskLists = taskLists.filter(taskList => taskList.id !== taskListId);

    // Store the updated task lists back in local storage
    localStorage.setItem('taskLists', JSON.stringify(taskLists));
  }
}



//CREATEPROGRESSBARFUNCTION
function createProgressBar(percLeft,secondsLeft,pb,tsk) {
      // Create a progress bar element
      const progressBar = document.createElement('progress');
      progressBar.classList.add('progress', 'is-primary');
      progressBar.max = 100;
      progressBar.value = percLeft;

      // Set a label for the progress bar
      progressBar.setAttribute('data-label', `${percLeft}%`);

      // Append the progress bar to the container
      //const container = document.getElementById('progressbarContainer');
      pb.appendChild(progressBar);
      function updatePercValue(tsk){
          console.log('updating progress value')
          var task = tsk;
          var newPercValue = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate).percentageLeft 
          
          progressBar.value = newPercValue
        switch (true) {
          case newPercValue > 75:
            progressBar.className = "progress is-success";
            // Perform actions for values greater than 75
            break;
          case newPercValue >= 35:
            progressBar.className = "progress is-warning";
            // Perform actions for values between 35 and 75
            break;
            case newPercValue <= 35:
            progressBar.className = "progress is-danger"; 
            // Perform actions for values less than 35
          }
        }
            setInterval(() => updatePercValue(tsk), 1000);
             
        }

function submitTimer () {
    
    console.log(`submitimer is submitting to ${tvalue}`)
    const dateExpiryAndCurrent = calculateExpiryDate()
    const startDate = dateExpiryAndCurrent.currentDate;
    const endDate = dateExpiryAndCurrent.expiryDate;
    /*const ctlp = calculateTimeLeftAndPercentage(startDate, endDate)
    const percentageLeft = ctlp.percentageLeft*/
    const selectedlist = getSelectedTaskList()
     
    const selectedTask = selectedlist.tasks[tvalue];
    console.log(`selected Task is ${selectedTask.name}`); 
     
  // Create a new timer object
  const newTimer = {
    startDate: startDate,
    endDate: endDate,
    // You can add any other properties related to the timer here if needed
  };
  
  // Assign the new timer object to the selected task's timer property
  selectedTask.timer = newTimer;

  // Save the updated task lists to local storage
  storeTaskLists();

  // Close the modal (if needed)
  closeModal(); 

  renderSelectedList(selectedlist.tasks)

}
var tvalue = 0;
var modalSubmitButton = document.getElementById('modalSubmitButton'); 
modalSubmitButton.addEventListener('click',()=>submitTimer());



function removeTaskFromList(taskToRemove) {
    const selectedTaskList = getSelectedTaskList();
    if (!selectedTaskList) {
        console.error("No task list selected.");
        return;
    }

    const taskIndex = selectedTaskList.tasks.findIndex(task => task.name === taskToRemove.name);
    if (taskIndex > -1) {
        selectedTaskList.tasks.splice(taskIndex, 1);
        storeTaskLists();  // Store the updated task lists in the browser's local storage
    } else {
        console.error("Task not found in the list.");
    }
}





function renderSelectedList(taskarray) {
  const wordClock = document.getElementById('clock');
  wordClock.style.opacity = 0;
  makeClockHorizontal(); 
  const lista = taskarray;
  console.log(lista)
  const listColumn = document.getElementById('listColumn')
  const listContainer = document.getElementById('todoSelSubsection');
  //console.log(listContainer)
  // Clear existing list items before rendering
  listContainer.innerHTML = '';
  let counter = 0;
  listColumn.style.visibility="visible";
  lista.forEach((task) => {
    var percLeft = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate).percentageLeft
    
    var taskItem = document.createElement('div');
    var taskName = document.createElement('div');
    var buttonContainer = document.createElement('div');
    
    var addTimerButton = document.createElement('button');
    var iconaClessidra = document.createElement('i')
    var deleteButtContainer = document.createElement('div')
    var progressBarContainer = document.createElement('div')
    var deleteButton = document.createElement('button') 
    progressBarContainer.className="column is-4 is-child progressBarContainer";
    deleteButtContainer.className="column is-2 is-child"; 
    deleteButton.className=" removeTaskButton "
    
     
    taskItem.className="columns mt-5";
    
    
    taskName.className ="column marker is-4 is-parent is-vcentered has-text-centered has-text-black has-text-weight-bold";
    taskName.textContent = task.name;
    taskName.id= `${task.name}${counter}`;
    taskName.value=counter;
// Add bounce animation on hover
    taskName.addEventListener('mouseenter', () => {
      taskName.classList.add('animate__animated', 'animate__pulse');
      console.log(`${task.name} tvalue is ${taskName.value} and has ${percLeft}% left`);
      console.log(taskName.id)
      //console.log(task)
    });

    // Remove animation on mouse leave
    taskName.addEventListener('mouseleave', () => {
      taskName.classList.remove('animate__animated', 'animate__pulse');
    });

    //buttonContainer.className = "column is-parent";
    //addTimerButton.className = "button is-small is-black-bis";
    //iconaClessidra.className = "fas fa-hourglass";
    
    listContainer.appendChild(taskItem);
    
    taskItem.appendChild(taskName);
    //taskItem.appendChild(buttonContainer);
    taskItem.appendChild(progressBarContainer);
    taskItem.appendChild(deleteButtContainer);
    deleteButtContainer.appendChild(deleteButton);
    deleteButtContainer.className = "deleteButtContainer";
    deleteButtContainer.style="visibility:hidden";
    //buttonContainer.appendChild(addTimerButton);
    //addTimerButton.appendChild(iconaClessidra);
    


    var percLeft = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate).percentageLeft
    var secondsLeft = calculateTimeLeftAndPercentage( task.timer.startDate, task.timer.endDate).secondsLeft
    if (percLeft !=0){
    createProgressBar(percLeft,secondsLeft,progressBarContainer,task)
;} 
    
deleteButton.addEventListener('click', function (event) {
    // Prevent the event from propagating up and triggering other event listeners
    event.stopPropagation();

    // Remove the task from the task list
    removeTaskFromList(task);

    // Re-render the list of tasks
    renderSelectedList(lista);
});
    

    
    //var tvalue = parseInt(counter);
    counter += 1;
    taskName.addEventListener('click', function (){console.log(taskName);console.log(calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate))})
    //var taskValue = addTimerButton.value;
     
    //progressBarContainer.appendChild(timerProgressBar);
    const gradientWidth = (percLeft / 100) * progressBarContainer.offsetWidth;
    
        
    //addTimerButton.addEventListener('click', function () {
    taskItem.addEventListener('click',function(){
    tvalue=taskName.value;
    console.log(`tvalue is ${tvalue}`)
    const modal = document.getElementById('timerModal')
    modal.classList.add('is-active');
    //const TaskValue = tvalue;
    //console.log(tvalue) 
  // Add the task value to the submitTimer function call
     

});
    
    try{
    
    var cltp = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate);
    if (!isNaN(cltp.percentageLeft) || cltp.percentageLeft > 0){
     
    console.log(`left percentage of ${task.name} is ${cltp.secondsLeft}`) 
        }}
    catch(e){
        console.log(e);}
     
    
    
  });


}


function updateProgress(){
    const cltp = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate);
    timerProgressBar.value = cltp.percentageLeft;}; 

 


function closeModal () {
    const modal = document.getElementById('timerModal') 
    modal.classList.remove('is-active');
  };



function calculateExpiryDate() {
  const days = parseInt(document.getElementById('daysInput').value) || 0;
  const hours = parseInt(document.getElementById('hoursInput').value) || 0;
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
  
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();

  const expiryTimestamp = currentTimestamp + (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
  const expiryDate = new Date(expiryTimestamp);

  console.log('Current Date:', currentDate);
  console.log('Expiry Date:', expiryDate);
          
  return {
    currentDate: currentDate,
    expiryDate: expiryDate
  };
}


function calculateTimeLeftAndPercentage(sd, ed) {
  const currentTimestamp = new Date().getTime();
  const startts = Date.parse(sd);
  const endts = Date.parse(ed);
  
  const startDate = new Date(startts);
  const endDate = new Date(endts);
  
  const timeDifference = endDate.getTime() - startDate.getTime();
  const timeRemaining = endDate.getTime() - currentTimestamp;
  
  // Calculate days, hours, minutes, and seconds left
  const daysLeft = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  // Calculate the total duration in milliseconds
  const totalDuration = endDate.getTime() - startDate.getTime();
  
  // Calculate the percentage of time left
  const percentageLeft = totalDuration > 0 ? (timeRemaining / totalDuration) * 100 : 0;
  
  return {
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
    percentageLeft,
  };
}






function addTask() {
  const selectedTaskList = getSelectedTaskList();

  if (!selectedTaskList) {
    console.error("No task list selected.");
    return;
  }

  const taskInput = document.getElementById("taskInput");

  // Check if taskInput element exists before accessing its value
  if (!taskInput) {
    console.error("Task input element not found.");
    return;
  }

  const task = taskInput.value.trim();

  if (task !== "") {

   const newTask = {
      name: task,
      timer:{startDate: "", 
      endDate: ""} 
    }; 

    selectedTaskList.tasks.push(newTask);
    //updateSubsections();
    taskInput.value = "";
    storeTaskLists();
    renderSelectedList(selectedTaskList.tasks)
  }
}


function removeTask() {
  const taskListSelect = document.getElementById("taskListSelect");
  const selectedTaskListIndex = taskListSelect.value;
  const subsectionsDiv = document.getElementById("subsections");
  const taskDiv = subsectionsDiv.querySelector(".task-item");
  
  if (selectedTaskListIndex >= 0 && taskDiv) {
    const selectedTaskIndex = taskDiv.getAttribute("data-task-index");
    taskLists[selectedTaskListIndex].tasks.splice(selectedTaskIndex, 1);
    updateSubsections();
    storeTaskLists();
  }
}

function deleteTaskList(taskListName) {
  // Find the index of the task list with the specified name
  const index = taskLists.findIndex(taskList => taskList.name === taskListName);
  
  if (index !== -1) {
    // Remove the task list from the array
    taskLists.splice(index, 1);

    // Update the local storage with the modified array
    storeTaskLists();
    console.log(`Task list "${taskListName}" was deleted.`);
  } else {
    console.error(`No task list found with the name "${taskListName}".`);
  }
}

function showNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.jpg',  // Path to the icon for the notification
        title: 'My Extension Notification',
        message: message
    });
}




function getSelectedTaskList() {
  const panelBlocks = document.querySelectorAll('.panel-block');
  const selectedPanelBlock = Array.from(panelBlocks).find(panelBlock => panelBlock.classList.contains('is-active'));

  if (!selectedPanelBlock) {
    console.error("No task list is active.");
    return null;
  }

  const selectedTaskListName = selectedPanelBlock.getAttribute('data-textContent');
  return taskLists.find(taskList => taskList.name === selectedTaskListName);
}
// Add event listeners when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Event listener for "To-Do List" link
  const todoLink = document.getElementById('todoLink');
  todoLink.addEventListener('click', function () {
    hideTimerSection();
    showTodoSection();
  });

  // Event listener for "Timer" link
  const timerLink = document.getElementById('timerLink');
  timerLink.addEventListener('click', function () {
    hideTodoSection();
    showTimerSection();
  });

  // Event listener for "Add Task List" button
  const addTaskListButton = document.getElementById('addTaskList');
  addTaskListButton.addEventListener('click', function () {
    addTaskList();
  });

  // Event listener for "Add Task" button
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', addTask);

  // Event listener for "Remove Task" button
  const removeTaskButton = document.getElementById('removeTaskButton');
  removeTaskButton.addEventListener('click', function(){
// Select all elements with class "deleteButtContainer"
    var elements = document.querySelectorAll('.deleteButtContainer');

    // Loop through each element and set their visibility to "visible"
    elements.forEach(function(element) {
        element.style.visibility = 'visible';
    });


  });

  const cancelModalButton = document.getElementById('modalCancelButton');
  cancelModalButton.addEventListener('click', closeModal);

    
  // Retrieve stored task lists on page load
  retrieveStoredTaskLists();
});


