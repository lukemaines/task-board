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
    $('#done').empty();

    taskList.foreach(task => {
        const card = createTaskCard(task);
        $(`#${task.status}-cards`).append(card);
    }); 
        $('#delete-task').on('click', handleDeleteTask);
        $( '.card' ).draggable();
      
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = $('#task-title').val();
    const dueDate = $('#task-due-date').val();
    const description = $('#task-description').val();
    
if (!title || !dueDate || !description) {
    alert("Please fill out all fields!");
} else {
    const newTask = {
        id: generateTaskId(), title, dueDate, description, deadline, status: 'todo'
    };
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    
    renderTaskList();

    
}



}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest(".card").data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage("tasks", JSON.stringify(taskList));

    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
        $( "#draggable" ).draggable();
        $( "#droppable" ).droppable({
          drop: function( event, ui ) {
            $( this )
              .addClass( "ui-state-highlight" )
              .find( "p" )
                .html( "Dropped!" );
          }
        });

};


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $( function() {
        $( "#draggable" ).draggable();
        $( "#droppable" ).droppable({
          drop: function( event, ui ) {
            $( this )
              .addClass( "ui-state-highlight" )
              .find( "p" )
                .html( "Dropped!" );
          }
        });
      } );

});
