// Function to check if a date is in the future
function isFutureDate(dateString) {
    const now = new Date();
    const endDate = new Date(dateString);
    return endDate > now;
}

function numberOfActiveTasks(list){
var number = 0;
list.tasks.forEach(task => {
            if (task.timer && task.timer.endDate && isFutureDate(task.timer.endDate)) {
                number += 1;
            }
});
return number;
}

function totalNumberOfActiveTasks(){

var number = 0;
taskLists.forEach(list => {
        // Filter the tasks to find those that have an active timer
        list.tasks.forEach(task => {
            if (task.timer && task.timer.endDate && isFutureDate(task.timer.endDate)) {
                // Sum the active task to the total
                number += 1;
            }
        });
    });
return number;
}



// Function to get all active tasks
function getActiveTasks() {
    // Retrieve the string from local storage
    const taskListsString = localStorage.getItem('taskLists');

    // Parse the string into a JavaScript object
    const taskLists = JSON.parse(taskListsString);

    // Array to store active tasks
    let activeTasks = [];

    // Iterate through each list
    taskLists.forEach(list => {
        // Filter the tasks to find those that have an active timer
        list.tasks.forEach(task => {
            if (task.timer && task.timer.endDate && isFutureDate(task.timer.endDate)) {
                // Add the active task to the array
                activeTasks.push(task);
            }
        });
    });
    activeTasks.color = "#000"
    activeTasks.name = "Tasks attive!"
    return activeTasks;
}

// Example usage
const activeTasks = getActiveTasks();
console.log(activeTasks);
