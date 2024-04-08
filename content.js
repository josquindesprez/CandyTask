document.addEventListener("DOMContentLoaded", function () {
    // Define approximate hours for each time period
    const dawnStart = 5;
    const dayStart = 7;
    const sunsetStart = 18;
    const nightStart = 20;

    // Function to set background image based on time and location
    function setBackgroundImage(userCountry) {
        const currentHour = new Date().getHours();
        let imageUrl;

        if (userCountry === 'Italy') {
            // Set image URL for Italy (Milan)
            if (currentHour >= dawnStart && currentHour < dayStart) {
                imageUrl = './milano/milano1.jpg';
            } else if (currentHour >= dayStart && currentHour < sunsetStart) {
                imageUrl = './milano/milano6.jpg';
            } else if (currentHour >= sunsetStart && currentHour < nightStart) {
                imageUrl = './milano/milano3.jpg';
            } else {
                imageUrl = './milano/milano4.jpg';
            }
        } else {
            // Default to Paris images if country is not Italy or location cannot be determined
            if (currentHour >= dawnStart && currentHour < dayStart) {
                imageUrl = './milano/parisdawn.jpg';
            } else if (currentHour >= dayStart && currentHour < sunsetStart) {
                imageUrl = './milano/parisday.jpg';
            } else if (currentHour >= sunsetStart && currentHour < nightStart) {
                imageUrl = './milano/parissunset2.jpg';
            } else {
                imageUrl = './milano/parisnight.jpg';
            }
        }

        // Set the background image of the body
        document.body.style.backgroundImage = `url('${imageUrl}')`;
    }

    // Function to get user's location based on IP
    function getUserLocation() {
        fetch('https://ipapi.co/json/')
            .then(response => response.json())
            .then(data => {
                const userCountry = data.country_name;
                setBackgroundImage(userCountry === 'France' ? 'France' : userCountry);
            })
            .catch(error => {
                console.error('Error fetching location:', error);
                // Default to Paris images if location cannot be determined
                setBackgroundImage('France');
            });
    }

    getUserLocation();
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


function toggleDisplay(tD,sF) {
    

    // Check if targetDiv is currently hidden
    if (tD.style.display === "none" || tD.style.display === "") {
        tD.style.display = "block"; // Show targetDiv
        sF.style.display = "none"; // Hide selectLIFA
    } else {
        tD.style.display = "none"; // Hide targetDiv
        sF.style.display = "block"; // Show selectLIFA
    }
}





// Function to create a panel block for a task list
function createPanelBlock(taskList) {
  const panelBlock = document.createElement('div');
  let name = `dbc${taskList.name}`
  var id = `${taskList.id}`
  var textCon = taskList.name;
  panelBlock.setAttribute('data-textContent', textCon)
  panelBlock.style.borderBottom = "none";
  panelBlock.id = `dragpb${taskList.name}` 
  panelBlock.className = 'panel-block is-fullwidth has-text-centered has-text-black is-size-6  is-uppercase has-text-weight-bold onhoversfondo ';
  panelBlock.style.background ="transparent";
  //
  panelBlock.style.outline = "none";
  panelBlock.style.direction="ltr"; 
  
  
  if (taskList.name != "Tasks attive!"){
  var number = numberOfActiveTasks(taskList)
  
  }
  var textColor = "";
  if (getCurrentDayTime() == "Day"){
      textColor = "black"}
  else if(getCurrentDayTime() == "Night"){
       textColor = "white"}

    panelBlock.innerHTML = 


    `<div class="column is-2">
         <button class="button has-text-white has-text-weight-bold montserrat is-rounded is-small" id="cp${taskList.name}" >${number}</button>
    </div>
     <div class="column is-1"></div>
     <div class="column is-7" id="drag${name}" data-bin-value="${name}" data-custom-value="${id}" style="" >
         <label id="listLabel${name}" class="my-text montserrat has-text-${textColor} has-text-alert">${taskList.name}</label>
         <input id="newname${name}" value="${taskList.name}" class="input is-black montserrat has-text-black has-text-weight-bold is-small" style="display:none"></input> 
         
     </div>
     <div id="selDelContainer" class="column is-3">
         <button class="neonbutton selectList" id="selectLI${name}" >
            <i id="selectLIFAS${name}" class="fas fa-arrow-right"></i>
         </button>
     <div class="column is-12" id="targetDiv${name}" style="display:none;">    
         <div class="column is-12" id="trash${name}" style=""> <span class="trash">
                    
                    <span></span>
                    <i></i>
                    </span>
         </div>
         <button  class="bottoneListRename${name} fas fa-pen" id="bottoneListRename${name}" style="background-color:transparent;border:none"></button> 
        </div> 
     </div>
     
     
     `
  const panel = document.getElementById('todoSubsections');
  panel.appendChild(panelBlock);
  panelBlock.addEventListener('contextmenu', function(event) {
    // Prevent the default context menu from appearing
    event.preventDefault();
    document.getElementById(`selectLI${name}`).style.visibility = "hidden";
    panelBlock.style.background ="transparent";

    var display = document.getElementById(`drag${name}`);
    display.innerHTML = `<label id="listLabel${name}" class="my-text montserrat has-text-${textColor} has-text-alert">${taskList.name}</label>
                         <input id="newname${name}" value="${taskList.name}" class="input is-black montserrat has-text-black has-text-weight-bold is-small" style="display:none"></input> 
` 
    toggleDisplay(document.getElementById(`targetDiv${name}`),document.getElementById(`selectLI${name}`));
    
}); 
  document.getElementById(`trash${name}`).addEventListener('click',function(){
      
      let attribute = id; 
      deleteTaskListByName(attribute)
      var todoSub = document.getElementById('todoSubsections');
      todoSub.innerHTML=""
      retrieveStoredTaskLists();


  })


 document.getElementById(`bottoneListRename${name}`).addEventListener('mouseover', function() {
    this.classList.add('animate__animated', 'animate__swing');
  });

  document.getElementById(`bottoneListRename${name}`).addEventListener('animationend', function() {
    this.classList.remove('animate__animated', 'animate__swing');
  });


document.getElementById(`bottoneListRename${name}`).addEventListener('click', function(){
     event.preventDefault()
     var inpNewListName = document.getElementById(`newname${name}`)
     
    
     document.getElementById(`listLabel${name}`).style.display="none";
      
    if (inpNewListName.style.display !== 'block'){
        console.log('inp is not block');
        inpNewListName.style.display = "block";   
            
    } 
    else if (inpNewListName.style.display === 'block') {
    // If it's visible, hide it
     
    if (inpNewListName.value.length>0){
       //rename and reload
        var newName = inpNewListName.value;
        renameTaskListByName(taskList.id, newName)
        var todoSub = document.getElementById('todoSubsections');
        todoSub.innerHTML=""
        retrieveStoredTaskLists();
        
         
    }
      else{ alert('inserisci un nome!')}
  } 

// Aggiungi un event listener per la pressione del tasto "Enter"
  document.getElementById(`newname${name}`).addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        console.log('enter')
        // Verifica se l'input è visibile e il suo valore è valido
        if (inpNewListName.style.display === 'block' && inpNewListName.value.trim().length > 0) {
            // Simula il click sul bottone
            //document.getElementById(`bottoneListRename${name}`).click();
            var newName = inpNewListName.value;
        renameTaskListByName(taskList.id, newName)
        var todoSub = document.getElementById('todoSubsections');
        todoSub.innerHTML=""
        retrieveStoredTaskLists();
            }
    }
});
})




  var selectLiArrow = document.getElementById(`selectLI${name}`);

  selectLiArrow.addEventListener('mouseenter', function(){
  var display = document.getElementById(`drag${name}`);
  
  var ActiveTaskList =  displayActiveTasks(taskList.name);
  
  display.style.maxHeight="100%";
  display.style.maxWidth ="100%";
  
  if (ActiveTaskList.length > 0){
  var unli = document.createElement('div');
  display.innerHTML= ``;
  display.appendChild(unli);
  
  var textActiveTasks = ""
  ActiveTaskList.forEach(taskname =>{
      var li = document.createElement('li')
      li.className = "montserrat is-size-7";
      li.style.textAlign = "left";
      li.style.listStylePosition = "outside"; 
      li.style.maxWidth = "100%";
      li.style.maxHeigh = "100%";
       
      li.textContent = taskname;
      
      unli.appendChild(li);

  });
        
      ;} 

console.log("CIAAAAAAO")
  })
selectLiArrow.addEventListener('mouseleave', function(){

var display = document.getElementById(`drag${name}`);
display.innerHTML = `<label id="listLabel${name}" class="my-text montserrat has-text-${textColor} has-text-alert">${taskList.name}</label>
         <input id="newname${name}" value="${taskList.name}" class="input is-black montserrat has-text-black has-text-weight-bold is-small" style="display:none"></input> 
`
})

  panelBlock.addEventListener('mouseenter', function(){
  
  panelBlock.style.background =hexToRgba(taskList.color, 0.3);
  document.getElementById(`selectLI${name}`).style.visibility = "visible";
  document.getElementById(`selectLIFAS${name}`).style.textShadow = `0 0 5px ${taskList.color}`  ;

  setScrollbarColors(hexToRgba(taskList.color, 0.7), hexToRgba(taskList.color, 0.3))   
  
     
  })
  
  panelBlock.addEventListener('mouseleave', function(){
  
  document.getElementById(`selectLI${name}`).style.visibility = "hidden";
  panelBlock.style.background ="transparent";
  var display = document.getElementById(`drag${name}`);
  
console.log('leave')

  
  })
  
  
  
  document.getElementById(`selectLI${name}`).addEventListener('click', function () {
    selectTaskList(taskList);
    
  });
  

  var cpbutton = document.getElementById(`cp${taskList.name}`);
  
  cpbutton.style.backgroundColor= hexToRgba(taskList.color,0.5)
  cpbutton.style.borderColor= taskList.color;  
  cpbutton.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(taskList.color,0.4)}` 
  cpbutton.innerHTML = `${number}<div id="contsel${taskList.name}" class="select is-small" style="display:none;opacity:0; "><select id="sel${taskList.name}"  ><option value="#b52828" style="background-color: #b52828;"></option>
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
    
    cpbutton.style.backgroundColor= hexToRgba(this.value,0.3)
    cpbutton.style.borderColor= this.value;  
    cpbutton.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(this.value,0.4)}`
    var todoSel = document.getElementById('todoSelSubsection')
    todoSel.style.borderTopWidth= "6px";
    todoSel.style.borderTopColor= this.value;
    todoSel.style.borderTopStyle= "solid";
    
    todoSel.style.backgroundColor = `${this.value}80` 
    taskList.color = this.value;
    const taskListString = JSON.stringify(taskList);
     
    storeTaskLists();
    });
   
  
  
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
    
    taskLists = JSON.parse(storedTaskLists);
    createPanel4Active();
    taskLists.forEach((taskList) => {
      createPanelBlock(taskList);
    });
  }
}

function renameTaskListByName(taskListId, newName) {
  const storedTaskLists = localStorage.getItem('taskLists');
  if (storedTaskLists) {
    let taskLists = JSON.parse(storedTaskLists);

    // Update the name of the task list with the specified ID
    taskLists = taskLists.map(taskList => {
      if (taskList.id === taskListId) {
        return {...taskList, name: newName};
      }
      return taskList;
    });

    // Store the updated task lists back in local storage
    localStorage.setItem('taskLists', JSON.stringify(taskLists));
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

function getTimeLeft(endDate) {
    // Get the current date and time
    const now = new Date();
    const endData = new Date(endDate)
    // Calculate the difference in milliseconds
    const diff = endData - now;
    
    // Convert the difference to other units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Determine the largest unit of time to use
    if (days > 0) {
        return `${days} days left`;
    } else if (hours > 0) {
        return `${hours} hours left`;
    } else if (seconds > 0) {
        return `${seconds} seconds left`;
    } else {
        
        return "Time's up!";
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
      var originalTitle = document.getElementById('titolo').innerText;
      progressBar.addEventListener('mouseenter', function(){
          document.getElementById('titolo').innerText = getTimeLeft(tsk.timer.endDate)
          
      });
      progressBar.addEventListener('mouseleave', function(){
          document.getElementById('titolo').innerText = originalTitle; 
      });
            





    function updatePercValue(tsk){
          
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
    
    
    const dateExpiryAndCurrent = calculateExpiryDate()
    const startDate = dateExpiryAndCurrent.currentDate;
    const endDate = dateExpiryAndCurrent.expiryDate;
    /*const ctlp = calculateTimeLeftAndPercentage(startDate, endDate)
    const percentageLeft = ctlp.percentageLeft*/
    const selectedlist = getSelectedTaskList()
     
    const selectedTask = selectedlist.tasks[tvalue];
     
     
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


function renameTask(task,newName) {
    const selectedTaskList = getSelectedTaskList();
    if (!selectedTaskList) {
        console.error("No task list selected.");
        return;
    }

    else {
        
        task.name = newName;
        storeTaskLists(); 
        //selectedTaskList.task.name = newName 
        //storeTaskLists();  // Store the updated task lists in the browser's local storage
    
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



function renderCalendar() {
    var calendarDiv = document.getElementById('calendarDiv');
    var existingCalendar = document.getElementById('calendar');

    // Check if the calendar already exists
    if (existingCalendar) {
        existingCalendar.remove(); // Remove the existing calendar if it's already there
    }

    var caldiv = document.createElement('div');
    caldiv.id = "calendar";
    caldiv.className = "column is-12";
    calendarDiv.appendChild(caldiv);

    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'it',
        eventMouseEnter: function(mouseEnterInfo) {
            // Create a tooltip element
            var tooltip = document.createElement('div');
            tooltip.className = 'calendar-tooltip';
            tooltip.innerHTML = mouseEnterInfo.event.title;
            tooltip.style.position = 'absolute';
            tooltip.style.top = (mouseEnterInfo.jsEvent.pageY + 10) + 'px'; // Offset by 10px
            tooltip.style.left = (mouseEnterInfo.jsEvent.pageX + 10) + 'px'; // Offset by 10px
            tooltip.style.backgroundColor = 'white';
            tooltip.style.border = '1px solid #000';
            tooltip.style.borderRadius = '4px';
            tooltip.style.padding = '5px';
            tooltip.style.pointerEvents = 'none'; // Ensure the tooltip doesn't block mouse events
            tooltip.style.zIndex = '100';
            document.body.appendChild(tooltip);
        },
        eventMouseLeave: function(mouseLeaveInfo) {
            // Remove the tooltip element when mouse leaves
            var tooltips = document.getElementsByClassName('calendar-tooltip');
            while (tooltips.length > 0) {
                tooltips[0].parentNode.removeChild(tooltips[0]);
            }
        },
        // other FullCalendar options...
    });

    // Retrieve active tasks
    const activeTasks = getActiveTasks();

    // Add each task as an event to the calendar
    activeTasks.forEach(task => {
        const endDate = new Date(task.timer.endDate);
        const formattedDate = endDate.toISOString().split('T')[0];

        calendar.addEvent({
            title: task.name, // Any other property that represents the task's title
            start: formattedDate, // Set the start date of the event
            color: task.listColor, // Set the color of the event (optional)
        });
    });

    calendar.render();
}




function showListColumn(){
document.getElementById('calendarDiv').style.display="none"
document.getElementById('listlists').style.display = "none";
document.getElementById('backToListsContainer').style.display="block";
document.getElementById('listColumn').style.display = "block";


}
function showActiveCalendar(){
 
document.getElementById('listlists').style.display = "none";    
document.getElementById('listColumn').style.display = "none";
document.getElementById('backToListsContainer').style.display="block";
document.getElementById('calendarDiv').style.display="block";

renderCalendar()

}   
function showListlists(){
//document.getElementById('todoSelSubsection').style.visibility="hidden";
document.getElementById('listColumn').style.display = "none";


document.getElementById('listlists').style.display = "block";    
document.getElementById('backToListsContainer').style.display="none";
document.getElementById('calendarDiv').style.display = "none";
}

function sortByNumberAttribute(arr) {
  return arr.sort((a, b) => a.number - b.number);
}

function renderTitleHead(container,name,colore){
  const panelBlock = document.createElement('div');
  var name =name 
  
  var textCon = name;
  panelBlock.setAttribute('data-textContent', textCon)
  panelBlock.id = "titleHead";
  panelBlock.style.borderBottom = "none";
  panelBlock.className = 'panel-block is-fullwidth has-text-centered has-text-black is-size-6  is-uppercase has-text-weight-bold onhoversfondo ';
  panelBlock.style.position = "sticky";
  panelBlock.style.top = "0px";
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
         <p id="titolo" class="my-text montserrat  ">${name}</p>
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
 
  panelBlock.style.background =hexToRgba(colore, 0.6);
  

    
      
  var head = container;
  
  if(head){
  document.getElementById('todoSelSubsection').appendChild(panelBlock);}
  //head.innerHTML="";
  //head.appendChild(panelBlock);}
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
  var initialScrollPosition = listContainer.scrollTop; 
  listContainer.addEventListener('scroll', function() {
    // Get current scroll position
    var currentScrollPosition = listContainer.scrollTop;

    // Check if scrolled away from initial position
    if (currentScrollPosition > initialScrollPosition) {
        document.getElementById('titleHead').style.background = hexToRgba(colore,1);
        
    } 
    // Check if returned to initial position
    else if (currentScrollPosition <= initialScrollPosition) {
        
        document.getElementById('titleHead').style.background = hexToRgba(colore,0.6);
    }
});
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
    var renameButton = document.createElement('button')    
    var newNameInput = document.createElement('input')
    var checkBoxContainer = document.createElement('div')
    var checkBox = document.createElement('input')


    progressBarContainer.className="column is-4 is-child progressBarContainer";
    deleteButtContainer.className="column is-2 is-child deleteButtContainer"; 
    deleteButton.className="bottonePin fas fa-trash fa-2x1"
    deleteButton.style.backgroundColor= "rgba(255,255,255,0)"
    deleteButton.style.visibility ="hidden";
    deleteButton.style.border = "none";
    renameButton.className = "bottoneRename fas fa-pen fa-2x1"
    renameButton.style.backgroundColor= "rgba(255,255,255,0)"
    renameButton.style.visibility ="hidden";
    renameButton.style.border = "none";
    newNameInput.className ="input is-black montserrat has-text-black has-text-weight-bold is-small"
    newNameInput.style.display="none";
    newNameInput.value= task.name;
    
    newNameInput.style.backgroundColor="rgba(255,255,255,0.5)"
    checkBox.type = "checkbox"
    checkBox.style.visibility = "visible";
    taskItem.className="columns mt-5 draggable";
    taskItem.setAttribute('data-name', task.name); 
    taskItem.setAttribute('draggable', 'true');
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
      //
      //console.log(taskName.id)
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
    //taskItem.appendChild(checkBox); CHECKBOX CURRENTLY NOT APPENDED
    taskItem.appendChild(newNameInput);
    //taskItem.appendChild(buttonContainer);
    taskItem.appendChild(progressBarContainer);
    taskItem.appendChild(deleteButtContainer);
    taskItem.appendChild(pinButtonContainer);
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
        //console.log(`found ${task.name}`) 
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
      //
    } 
      lista.sort((a, b) => a.number - b.number);  
      //console.log(lista)
      storeTaskLists();
      renderSelectedList(lista)

    })

    deleteButtContainer.appendChild(deleteButton);
    deleteButtContainer.appendChild(renameButton); 
    deleteButton.addEventListener('click', function (event) {
    // Prevent the event from propagating up and triggering other event listeners
    //event.stopPropagation();
    removeTaskFromList(task);
    // Re-render the list of tasks
    renderSelectedList(lista);
});
    
    renameButton.addEventListener('click', function(){

     if (newNameInput.style.display === 'block') {
    // If it's visible, hide it
     
    if (newNameInput.value.length>0){
    renameTask(task,newNameInput.value)
    
    taskName.textContent = newNameInput.value;
    newNameInput.style.display = 'none';
    taskName.style.display="block";}
      else{ alert('inserisci un nome!')}
  } else {
    taskName.style.display="none";
    // If it's hidden, make it visible
    newNameInput.style.display = 'block';
    
  }
   newNameInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        console.log('enter')
        // Verifica se l'input è visibile e il suo valore è valido
        if (newNameInput.style.display === 'block' && newNameInput.value.trim().length > 0) {
            // Simula il click sul bottone
            //document.getElementById(`bottoneListRename${name}`).click();
            renameTask(task,newNameInput.value)
            taskName.textContent = newNameInput.value;
            newNameInput.style.display = 'none';
            taskName.style.display="block";
        }
        else if(newNameInput.style.display === 'block' && newNameInput.value.trim().length === 0){
            alert('inserisci un nome!')
    }   

            }
    }
);



    })




    taskItem.addEventListener('mouseenter', function(){
    checkBox.style.visibility ="visible";
    pinButton.style.visibility = "visible";
    deleteButton.style.visibility="visible";
    renameButton.style.visibility="visible";
    //
    });
    taskItem.addEventListener('mouseleave',function(){
    checkBox.style.visibility ="hidden";
    pinButton.style.visibility ="hidden";
    deleteButton.style.visibility="hidden";
    renameButton.style.visibility="hidden";
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
    taskName.addEventListener('click', function (){console.log(calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate))})
    //var taskValue = addTimerButton.value;
     
    //progressBarContainer.appendChild(timerProgressBar);
    const gradientWidth = (percLeft / 100) * progressBarContainer.offsetWidth;
    
        
    //addTimerButton.addEventListener('click', function () {
    taskName.addEventListener('click',function(){
    tvalue=taskName.value;
    //console.log(`tvalue is ${tvalue}`)
    const modal = document.getElementById('timerModal')
    modal.classList.add('is-active');
    //const TaskValue = tvalue;
    //console.log(tvalue) 
  // Add the task value to the submitTimer function call
     

});
    
    try{
    
    var cltp = calculateTimeLeftAndPercentage(task.timer.startDate, task.timer.endDate);
    if (!isNaN(cltp.percentageLeft) || cltp.percentageLeft > 0){
     
    //console.log(`left percentage of ${task.name} is ${cltp.secondsLeft}`) 
        }}
    catch(e){
        }
     
    
    
  });
    
   makeDraggable(lista)
   
   
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

  //
  //
          
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


