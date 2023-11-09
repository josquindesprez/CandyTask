function addProgressiveNumbersToTasks() {
  // Retrieve the taskLists object from local storage
  let taskLists = JSON.parse(localStorage.getItem('taskLists'));

  if (taskLists) {
    let currentNumber = 1; // Start numbering from 1
    taskLists.forEach(list => {
      list.tasks.forEach(task => {
        task.number = currentNumber++; // Assign the current number and increment it
      });
    });

    // Save the updated task lists back to local storage
    localStorage.setItem('taskLists', JSON.stringify(taskLists));
    console.log('Task numbers updated successfully!');
  } else {
    console.log('No taskLists found in local storage.');
  }
}


