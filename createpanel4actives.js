function createPanel4Active() {
  var taskList = getActiveTasks()  
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
  panelBlock.style.position ="sticky"; 
  console.log(taskList.tasks)
  if (taskList.name == "Tasks attive!"){
  //var number = numberOfActiveTasks(taskList)
  var totalNumber = totalNumberOfActiveTasks()
  console.log(`${totalNumber} active tasks`);
  }
  var textColor = "";
  if (getCurrentDayTime() == "Day"){
      textColor = "black"}
  else if(getCurrentDayTime() == "Night"){
       textColor = "white"}

    panelBlock.innerHTML = 


    `<div class="column is-2">
         <button class="button has-text-black has-text-weight-bold montserrat is-rounded is-small" id="cp${taskList.name}" >${totalNumber}</button>
    </div>
     <div class="column is-1"></div>
     <div class="column is-7" id="drag${name}" data-bin-value="${name}" data-custom-value="${id}" style="" >
         <p  class="my-text montserrat has-text-${textColor} has-text-alert">${taskList.name}</p>
     </div>`
    /* <!--div class="column is-2">
         <button class="neonbutton selectList" id="selectLI${name}" >
            <i id="selectLIFAS${name}" class="fas fa-arrow-right"></i>
         </button>
     </div>*/
 panelBlock.addEventListener('mouseenter', function(){
  //console.log('panel block hover');
  //panelBlock.style.borderLeftWidth = "10px";
  //panelBlock.style.borderLeft = "solid";
  //panelBlock.style.borderLeftColor= taskList.color;
  panelBlock.style.background =hexToRgba(taskList.color, 0.3);
  //document.getElementById(`selectLI${name}`).style.visibility = "visible";
  //document.getElementById(`selectLIFAS${name}`).style.textShadow = `0 0 5px ${taskList.color}`  ;

  setScrollbarColors(hexToRgba(taskList.color, 0.7), hexToRgba(taskList.color, 0.3))   
 
     //panelBlock.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(taskList.color,0.4)}`
  })
  
  panelBlock.addEventListener('mouseleave', function(){
  //console.log('panel block leave');
  //panelBlock.style.boxShadow = `0px 0px 0px 0px ${hexToRgba(taskList.color,0.4)}`
  //panelBlock.style.borderLeft = "none";
  //document.getElementById(`selectLI${name}`).style.visibility = "hidden";
  panelBlock.style.background ="transparent";
  })
  //panelBlock.style.borderColor= taskList.color;})

  // Add event listener to select the task list when the panel block is clicked
    
  const panel = document.getElementById('todoSubsections');
   
  panel.appendChild(panelBlock);
  /*document.getElementById(`selectLI${name}`).addEventListener('click', function () {
    selectTaskList(taskList);
    console.log('click');
  });*
  

  var cpbutton = document.getElementById(`cp${taskList.name}`);
  
  cpbutton.style.backgroundColor= hexToRgba(taskList.color,0.5)
  cpbutton.style.borderColor= taskList.color;  
  cpbutton.style.boxShadow = `0px 0px 5px 1px ${hexToRgba(taskList.color,0.4)}` 
  cpbutton.innerHTML = `${totalNumber}<div id="contsel${taskList.name}" class="select is-small" style="display:none;opacity:0; "><select id="sel${taskList.name}"  ><option value="#b52828" style="background-color: #b52828;"></option>
                        <option value="#6e290c" style="background-color: #6e290c;"></option>
                        <option value="#f28218" style="background-color: #f28218;"></option>
                        <option value="#f0ec24" style="background-color: #f0ec24; color: black;"></option>
                        <option value="#4dbf4b" style="background-color: #4dbf4b;"></option>
                        <option value="#366f9e" style="background-color: #366f9e;"></option>
                        <option value="#9a3dd9" style="background-color: #9a3dd9;"></option></select></div>`;
     
/*   cpbutton.addEventListener('mouseenter', function() {
    document.getElementById(`contsel${taskList.name}`).style.display = 'block';
    
  });

   cpbutton.addEventListener('mouseleave', function() {

     document.getElementById(`contsel${taskList.name}`).style.display = 'none';

   });*/
   
    /*document.getElementById(`sel${taskList.name}`).addEventListener('change', function() {
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
    });*/
   
  var dragelement = document.getElementById(`drag${name}`);
  dragElement(dragelement);
  console.log(`dragged ${taskList.name}`);
}
