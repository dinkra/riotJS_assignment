var tasks = {
	title: 'Todo list',
	items: [
		{ title: 'Task1', done: true },
		{ title: 'Task2', done: false }
	]
};

var todoTag;


//set array of tasks to LocalStorage
function updateLocalStorage() {
	var tasksArray = JSON.stringify(tasks.items);
	localStorage.setItem('tasksArray', tasksArray);
}

//get array of tasks from LocalStorage
function updateTasks() {
	if (localStorage.length) {
		tasks.items = JSON.parse(localStorage.getItem('tasksArray'));
	}
	todoTag.update();
}

// add new task
function addTask() {
	var val = $("#newTask").val();
	if (val) {
		$("#newTask").val('');
		tasks.items.push({ title: val, done: false });
	};
	todoTag.update();
	updateLocalStorage();
	return false;
}

//delete task
function deleteTask(i) {
	tasks.items.splice(i, 1);
	todoTag.update();
	updateLocalStorage();

}

//done or undone task 
function doneTask(i) {
	if (tasks.items[i].done) {
		tasks.items[i].done = false
	} else {
		tasks.items[i].done = true
	}todoTag.update();
	updateLocalStorage();
}

//popup where is possible to change item
function editTask(i) {
	var x = window.prompt('Edit your task', tasks.items[i].title);
	if (x) { 
		tasks.items[i].title = x;
	}
	todoTag.update();
	updateLocalStorage();

}



$(document).ready(function(){

	//delete task event
	$('ul').on('click', '.delete_task', function() {
        deleteTask($(this).attr('data-task-id'));
    });

	//done task event
	$('ul').on('click', '.done_task', function() {
        doneTask($(this).attr('data-task-id'));
    });

	//edit task event
    $('ul').on('click', '.edit_task', function() {
        editTask($(this).attr('data-task-id'));
    });

    updateTasks();

});








