var tasks = {
	title: 'Todo list',
	items: [
		{ title: 'Task1', done: true },
		{ title: 'Task2', done: false }
	]
};

var todoTag;

function updateLocalStorage() {
	var tasksArray = JSON.stringify(tasks.items);
	localStorage.setItem('tasksArray', tasksArray);
}

function updateTasks() {
	if (localStorage.length) {
		tasks.items = JSON.parse(localStorage.getItem('tasksArray'));
	}
	todoTag.update();
}


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

function deleteTask(i) {
	tasks.items.splice(i, 1);
	todoTag.update();
	updateLocalStorage();

}

function doneTask(i) {
	if (tasks.items[i].done) {
		tasks.items[i].done = false
	} else {
		tasks.items[i].done = true
	}todoTag.update();
	updateLocalStorage();
}

function editTask(i) {

	var x = window.prompt('Edit your task', tasks.items[i].title);
	if (x) { 
		tasks.items[i].title = x;
	}
	todoTag.update();
	updateLocalStorage();

}



$(document).ready(function(){

	$('ul').on('click', '.delete_task', function() {
        deleteTask($(this).attr('data-task-id'));
    });

	$('ul').on('click', '.done_task', function() {
        doneTask($(this).attr('data-task-id'));
    });

    $('ul').on('click', '.edit_task', function() {
        editTask($(this).attr('data-task-id'));
    });

    updateTasks();

});








