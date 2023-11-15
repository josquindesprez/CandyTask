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



// Example usage
addProgressiveNumbersToTasks();




function getCurrentDayTime(){
    const dawnStart = 5;
    const dayStart = 7;
    const sunsetStart = 18;
    const nightStart = 20;

    // Get the current hour
    const currentHour = new Date().getHours();
    var DayTime = "";
    if (currentHour >= dawnStart && currentHour < dayStart) {
        DayTime = "Day";
    } else if (currentHour >= dayStart && currentHour < sunsetStart) {
        DayTime = "Day";
    } else if (currentHour >= sunsetStart && currentHour < nightStart) {
        DayTime = "Night";
    } else {
        DayTime = "Day";
        document.getElementById('addTaskList').style.color="white";
        document.getElementById('addTaskList').onmouseover = function(){ this.style.color="#0af";}
        document.getElementById('addTaskList').onmouseout = function(){ this.style.color="#white";}
    }
   return DayTime;
}


var panel = document.getElementById('panel');
var todoSS = document.getElementById('todoSubsections'); 
var addTL = document.getElementById('addTaskList');


/*
panel.addEventListener('mouseenter', function(){
   
    
   var todoSS = document.getElementById('todoSubsections');
   todoSS.style.visibility = 'visible';
});

panel.addEventListener('mouseleave', function(){
   
   var todoSS = document.getElementById('todoSubsections');
   todoSS.style.visibility = 'hidden';
   

});*/

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
  panelBlock.style.borderBottom = "none";
  panelBlock.className = 'panel-block is-fullwidth has-text-centered has-text-black is-size-6  is-uppercase has-text-weight-bold onhoversfondo ';
  panelBlock.style.background ="transparent";
  //
  panelBlock.style.outline = "none";
  panelBlock.style.direction="ltr"; 
  
   

  var textColor = "";
  if (getCurrentDayTime() == "Day"){
      textColor = "black"}
  else if(getCurrentDayTime() == "Night"){
       textColor = "white"}

    panelBlock.innerHTML = 


    `<div class="column is-2">
         <button class="button is-rounded is-small" id="cp${taskList.name}" ></button>
    </div>
     <div class="column is-1"></div>
     <div class="column is-7" id="drag${name}" data-bin-value="${name}" data-custom-value="${id}" style="" >
         <p  class="my-text montserrat has-text-${textColor} has-text-alert">${taskList.name}</p>
     </div>
     <div class="column is-2">
         <button class="neonbutton selectList" id="selectLI${name}" >
            <i id="selectLIFAS${name}" class="fas fa-arrow-right"></i>
         </button>
     </div>`
 panelBlock.addEventListener('mouseenter', function(){
  //console.log('panel block hover');
  //panelBlock.style.borderLeftWidth = "10px";
  //panelBlock.style.borderLeft = "solid";
  //panelBlock.style.borderLeftColor= taskList.color;
  panelBlock.style.background =hexToRgba(taskList.color, 0.3);
  document.getElementById(`selectLI${name}`).style.visibility = "visible";
  document.getElementById(`selectLIFAS${name}`).style.textShadow = `0 0 5px ${taskList.color}`  ;

  setScrollbarColors(hexToRgba(taskList.color, 0.7), hexToRgba(taskList.color, 0.3))   
 
     //panelBlock.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(taskList.color,0.4)}`
  })
  
  panelBlock.addEventListener('mouseleave', function(){
  //console.log('panel block leave');
  //panelBlock.style.boxShadow = `0px 0px 0px 0px ${hexToRgba(taskList.color,0.4)}`
  //panelBlock.style.borderLeft = "none";
  document.getElementById(`selectLI${name}`).style.visibility = "hidden";
  panelBlock.style.background ="transparent";
  })
  //panelBlock.style.borderColor= taskList.color;})

  // Add event listener to select the task list when the panel block is clicked
    
  const panel = document.getElementById('todoSubsections');
   
  panel.appendChild(panelBlock);
  document.getElementById(`selectLI${name}`).addEventListener('click', function () {
    selectTaskList(taskList);
    console.log('click');
  });
  

  var cpbutton = document.getElementById(`cp${taskList.name}`);
  
  cpbutton.style.backgroundColor= hexToRgba(taskList.color,0.5)
  cpbutton.style.borderColor= taskList.color;  
  cpbutton.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(taskList.color,0.4)}` 
  cpbutton.innerHTML = `<div id="contsel${taskList.name}" class="select is-small" style="display:none;opacity:0; "><select id="sel${taskList.name}"  ><option value="#b52828" style="background-color: #b52828;"></option>
                        <option value="#6e290c" style="background-color: #6e290c;"></option>
                        <option value="#f28218" style="background-color: #f28218;"></option>
                        <option value="#f0ec24" style="background-color: #f0ec24; color: black;"></option>
                        <option value="#4dbf4b" style="background-color: #4dbf4b;"></option>
                        <option value="#366f9e" style="background-color: #366f9e;"></option>
                        <option value="#9a3dd9" style="background-color: #9a3dd9;"></option></select></div>`;
     
   cpbutton.addEventListener('mouseenter', function() {
    document.getElementById(`contsel${taskList.name}`).style.display = 'block';
    
  });

   cpbutton.addEventListener('mouseleave', function() {

     document.getElementById(`contsel${taskList.name}`).style.display = 'none';

   });
   
    document.getElementById(`sel${taskList.name}`).addEventListener('change', function() {
    //cpbutton.style.backgroundColor = this.value;
    cpbutton.style.backgroundColor= hexToRgba(this.value,0.3)
    cpbutton.style.borderColor= this.value;  
    cpbutton.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(this.value,0.4)}`
    console.log(this.value)
    //panelBlock.style.borderColor= this.value;  
    //panelBlock.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(this.value,0.4)}`
    var todoSel = document.getElementById('todoSelSubsection')
    todoSel.style.borderTopWidth= "6px";
    todoSel.style.borderTopColor= this.value;
    todoSel.style.borderTopStyle= "solid";
    
    todoSel.style.backgroundColor = `${this.value}80` 
    taskList.color = this.value;
    const taskListString = JSON.stringify(taskList);
    console.log(`the color is ${taskList.color}`); 
    storeTaskLists();
    });
   
  var dragelement = document.getElementById(`drag${name}`);
  dragElement(dragelement);
  console.log(`dragged ${taskList.name}`);
}  









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
  /*const todoLink = document.getElementById('todoLink');
  const timerLink = document.getElementById('timerLink');

  if (taskList.type === 'todo') {
    todoLink.classList.add('is-active');
    timerLink.classList.remove('is-active');
  } else {
    todoLink.classList.remove('is-active');
    timerLink.classList.add('is-active');
  }*/
}


let taskLists = [];
function generateUniqueID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
// Define the colors and their readable names
const colors = [
  { code: "#ff0", name: "Yellow" },
  { code: "#0f0", name: "Green" },
  { code: "#00f", name: "Blue" },
  { code: "#f0f", name: "Pink" },
  { code: "#ff9900", name: "Orange" }
];

// Function to create the select element with options
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
    id: id,
    color:"#FFFFFF",  
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


// Function to create or update a style element for the scrollbar thumb and track
function setScrollbarColors(thumbColor, trackColor) {
  // Check if the style element already exists
  let styleId = 'custom-scrollbar-style';
  let styleEl = document.getElementById(styleId);

  // If it doesn't exist, create it and append to <head>
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  // Set the CSS text for the scrollbar thumb and track pseudo-elements
  styleEl.textContent = `
    ::-webkit-scrollbar-thumb { background: ${thumbColor} !important; }
    ::-webkit-scrollbar-track { background: ${trackColor} !important; }
  `;
}
function showListColumn(){
document.getElementById('backToListsContainer').style.display="block";
document.getElementById('listlists').style.display = "none";    
document.getElementById('listColumn').style.display = "block";


}
function showListlists(){
document.getElementById('listColumn').style.display = "none";
document.getElementById('listlists').style.display = "block";    
document.getElementById('backToListsContainer').style.display="none";

}

function sortByNumberAttribute(arr) {
  return arr.sort((a, b) => a.number - b.number);
}

function renderTitleHead(container,name,colore){
  const panelBlock = document.createElement('div');
  var name =name 
  
  var textCon = name;
  panelBlock.setAttribute('data-textContent', textCon)
  panelBlock.style.borderBottom = "none";
  panelBlock.className = 'panel-block is-fullwidth has-text-centered has-text-black is-size-6  is-uppercase has-text-weight-bold onhoversfondo ';
  panelBlock.style.background ="transparent";
  //
  panelBlock.style.outline = "none";
  var textColor = "";
  if (getCurrentDayTime() == "Day"){
      textColor = "black"}
  else if(getCurrentDayTime() == "Night"){
       textColor = "white"}

    panelBlock.innerHTML = 


    `
     <div class="column is-7" >
         <p  class="my-text montserrat  ">${name}</p>
     </div>
    <div class="field has-addons">
              <div class="control ">
                <input class="inputneon input is-large mt-2" type="text" id="taskInput" placeholder="Enter task..." style="">
              </div>
              <div class="control">
                     
                <button class="neonbutton" id="addTaskButton"><i class="fas fa-plus mb-1"></i></button>
                <!--button class="neonbutton" id="removeTaskButton"><i class="fas fa-times"></i> </button-->
                  
              </div> 
    `
 
  panelBlock.style.background =hexToRgba(colore, 0.3);
  

    
      
  var head = container;
  console.log(head);
  if(head){
  head.innerHTML="";
  head.appendChild(panelBlock);}
  else{console.log('impossibile appendere il titolo')}
  const addTaskButton = document.getElementById('addTaskButton');
  addTaskButton.addEventListener('click', addTask);

}


function renderSelectedList(taskarray) {
  //const wordClock = document.getElementById('clock');
  //wordClock.style.opacity = 0;
  //wordClock.style.visibility="hidden";
  
  var colore = getSelectedTaskList().color
  showListColumn() 
  //makeClockHorizontal(); 
  const lista = taskarray;
  console.log(sortByNumberAttribute(lista))
  console.log(lista)
  const listColumn = document.getElementById('listColumn')
  const listContainer = document.getElementById('todoSelSubsection');
    var coloreRgba = hexToRgba(colore,0.30)
  var coloreRgba1 = hexToRgba(colore,0.10)
  listContainer.style.backgroundColor= coloreRgba1;
  listContainer.style.backdropFilter= "blur(5px)";
  setScrollbarColors(hexToRgba(colore, 0.7),coloreRgba);

// Syntax: box-shadow: h-offset v-offset blur spread color;
  //listContainer.style.boxShadow = `0px -5px 5px 0px ${hexToRgba(colore,0.3)}`;
  
  var todoSel = document.getElementById('todoSelSubsection')
  //listContainer.style.borderTopWidth= "6px";
  
  //listContainer.style.borderTopColor= hexToRgba(colore,0.4);
  document.documentElement.style.scrollbarColor = colore;
// Set the scrollbar width to thin for the whole document
  document.documentElement.style.scrollbarWidth = "thin";
  
  listContainer.style.borderTopStyle= "none";
  //console.log(listContainer)
  // Clear existing list items before rendering
  listContainer.innerHTML = '';
  let counter = 0;
  listContainer.style.visibility="visible";
  renderTitleHead(listContainer,getSelectedTaskList().name,colore);

  lista.forEach((task) => {
    var percLeft = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate).percentageLeft
    
    var taskItem = document.createElement('div');
    var taskName = document.createElement('div');
    var buttonContainer = document.createElement('div');
    var pinButtonContainer= document.createElement('div');
    var pinButton = document.createElement('button');
    var addTimerButton = document.createElement('button');
    var iconaClessidra = document.createElement('i')
    var deleteButtContainer = document.createElement('div')
    var progressBarContainer = document.createElement('div')
    var deleteButton = document.createElement('button') 
    progressBarContainer.className="column is-4 is-child progressBarContainer";
    deleteButtContainer.className="column is-2 is-child deleteButtContainer"; 
    deleteButton.className="bottonePin fas fa-trash fa-2x1"
    deleteButton.style.backgroundColor= "rgba(255,255,255,0)"
    deleteButton.style.visibility ="hidden";
    deleteButton.style.border = "none";
    taskItem.className="columns mt-5";
    
    if (getCurrentDayTime() == "Day"){ 
    taskName.className ="column montserrat is-4 is-parent is-vcentered has-text-left has-text-black has-text-weight-bold ml-4";}
    else if (getCurrentDayTime() == "Night") {
    taskName.className ="column montserrat is-4 is-parent is-vcentered has-text-left has-text-white has-text-weight-bold ml-4";}

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
    taskItem.appendChild(pinButtonContainer);
    taskItem.appendChild(taskName);
    //taskItem.appendChild(buttonContainer);
    taskItem.appendChild(progressBarContainer);
    taskItem.appendChild(deleteButtContainer);
    
    pinButtonContainer.appendChild(pinButton);
    pinButtonContainer.className="column is-1";
    pinButtonContainer.style.outline ="none";
    pinButtonContainer.style.backgroundColor = "transparent";
    pinButton.style.visibility ="hidden";
    pinButton.style.outline = "none";
    pinButton.style.backgroundColor= "rgba(255,255,255,0)";
    pinButton.style.border = "none";
    pinButton.className="bottonePin fas fa-thumbtack fa-pin";
    pinButton.innerHTML=``;
    
    pinButton.addEventListener('click', function(){
     
    let foundIndex = -1;

    for (let i = 0; i < lista.length; i++) {
      if (lista[i].name === task.name) {
        lista[i].number = 1;
        foundIndex = i;
        console.log(`found ${task.name}`) 
        break; // Stop the loop once we've found the object
      }
    }

    // If we found the object, iterate over the list and increment the number for the remaining objects
    if (foundIndex !== -1) {
      let currentNumber = 1;
      for (let i = 0; i < lista.length; i++) {
        if (i !== foundIndex) { // Skip the object that already has number 1 assigned
          currentNumber++;
          lista[i].number = currentNumber;
        }
      } 
    } else {
      console.log(`No object with taskName '${task.name}' found.`);
    } 
      lista.sort((a, b) => a.number - b.number);  
      console.log(lista)
      storeTaskLists();
      renderSelectedList(lista)

    })

    deleteButtContainer.appendChild(deleteButton);
     
    deleteButton.addEventListener('click', function (event) {
    // Prevent the event from propagating up and triggering other event listeners
    //event.stopPropagation();
    removeTaskFromList(task);
    // Re-render the list of tasks
    renderSelectedList(lista);
});

    taskItem.addEventListener('mouseenter', function(){
    pinButton.style.visibility = "visible";
    deleteButton.style.visibility="visible";
    console.log('taskItem enter');
    });
    taskItem.addEventListener('mouseleave',function(){
    pinButton.style.visibility ="hidden";
    deleteButton.style.visibility="hidden";
    });
    var percLeft = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate).percentageLeft
    var secondsLeft = calculateTimeLeftAndPercentage( task.timer.startDate, task.timer.endDate).secondsLeft
    if (percLeft !=0){
    createProgressBar(percLeft,secondsLeft,progressBarContainer,task)
;} 
listContainer.style.maxHeight = "400px";
listContainer.style.overflow="hidden auto";

//listContainer.style.setProperty('--scrollbar-color', colore);


        

    
    //var tvalue = parseInt(counter);
    counter += 1;
    taskName.addEventListener('click', function (){console.log(taskName);console.log(calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate))})
    //var taskValue = addTimerButton.value;
     
    //progressBarContainer.appendChild(timerProgressBar);
    const gradientWidth = (percLeft / 100) * progressBarContainer.offsetWidth;
    
        
    //addTimerButton.addEventListener('click', function () {
    taskName.addEventListener('click',function(){
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
  /*const todoLink = document.getElementById('todoLink');
  todoLink.addEventListener('click', function () {
    hideTimerSection();
    showTodoSection();
  });

  // Event listener for "Timer" link
  const timerLink = document.getElementById('timerLink');
  timerLink.addEventListener('click', function () {
    hideTodoSection();
    showTimerSection();
  });*/

  // Event listener for "Add Task List" button
  const addTaskListButton = document.getElementById('addTaskList');
  addTaskListButton.addEventListener('click', function () {
    addTaskList();
  });

  // Event listener for "Add Task" button
 // const addTaskButton = document.getElementById('addTaskButton');
  //addTaskButton.addEventListener('click', addTask);
  const backToListsButton = document.getElementById('backToLists');
  backToListsButton.addEventListener('click', function(){
     showListlists()});
  // Event listener for "Remove Task" button
  //const removeTaskButton = document.getElementById('removeTaskButton');
 /* removeTaskButton.addEventListener('click', function(){
// Select all elements with class "deleteButtContainer"
    var elements = document.querySelectorAll('.deleteButtContainer');

    // Loop through each element and set their visibility to "visible"
    elements.forEach(function(element) {
        element.style.visibility = 'visible';
    });


  });*/

  const cancelModalButton = document.getElementById('modalCancelButton');
  cancelModalButton.addEventListener('click', closeModal);

    
  // Retrieve stored task lists on page load
  retrieveStoredTaskLists();
});


