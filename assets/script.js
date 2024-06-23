// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const deadline = dayjs(task.deadline); 
    const today = dayjs();
    let cardColor = '';

    if (task.status === 'done') {
        cardColor = "text-bg-light";
    }
    else if (today.isSame(deadline, 'day')) {
        cardColor = "text-bg-danger";
    }
    else (today.isBefore(deadline, 'day')) {
        cardColor = "text-bg-warning"; 
    }
    
    return `
    <div class="card ${cardColor} mb-3" style="max-width: 18rem;" data-id="${task.id}">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">Due: ${task.dueDate}/p>
            <a href="#" class="btn btn-danger delete-task">Delete</a>
        </div>
    </div>`;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $('#todo').empty();
    $('#in-progress').empty();
    
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
