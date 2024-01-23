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
  
  if (taskList.name == "Tasks attive!"){
  
  var totalNumber = totalNumberOfActiveTasks()
  
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
    
 panelBlock.addEventListener('mouseenter', function(){
  
  panelBlock.style.background =hexToRgba(taskList.color, 0.3);
  setScrollbarColors(hexToRgba(taskList.color, 0.7), hexToRgba(taskList.color, 0.3))   
 
})
  
  panelBlock.addEventListener('mouseleave', function(){
  
  panelBlock.style.background ="transparent";
  })
  
 panelBlock.addEventListener('click', function(){showActiveCalendar()})   
  const panel = document.getElementById('todoSubsections');
   
  panel.appendChild(panelBlock);
  var dragelement = document.getElementById(`drag${name}`);
  //dragElement(dragelement);
  console.log(`dragged ${taskList.name}`);
}
