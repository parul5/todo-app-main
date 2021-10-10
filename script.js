'use strict';

// function for dark theme 😍
document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
    } else {
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;
    }
});

// function to generate unique ID for each task 
let uniqueId = function () {
    return Date.now();
}

// Array of objects to store information about task
let tasks = [{
    description: 'Buy some coffee',
    isChecked: false,
    id: uniqueId()
},
{
    description: 'Buy milk',
    isChecked: true,
    id: 163380157084
}
];


// count variables has number of active tasks 
let count = 0;
function setCount() {
    count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].isChecked) {
            count++;
        }
    }
}

// variable for filtering task view
let activeFilter = 0;

// function to generate bottom bar
function bottombar() {
    let html = '', filters = '';
    html += `<div class="bottom-bar"><div>${count} tasks left</div>`;
    if (activeFilter == 0) {
        // show bottom bar with 'All' highlighted
        filters += `<div id="filters" ><span class="highlight" onclick="setFilter(0)" >All</span><span onclick="setFilter(1)" >Active</span><span onclick="setFilter(2)">Completed</span></div>`;
    } else if (activeFilter == 1) {
        //show bottom bar with active highlighted
        filters += `<div id="filters" ><span onclick="setFilter(0)" >All</span><span class="highlight" onclick="setFilter(1)">Active</span><span onclick="setFilter(2)">Completed</span></div>`;
    } else {
        // show completed highlighted
        filters += `<div id="filters" ><span onclick="setFilter(0)" >All</span><span onclick="setFilter(1)">Active</span><span class="highlight" onclick="setFilter(2)">Completed</span></div>`;
    }
    
    if (screen.width > 780) {
        html += filters;
        html += `<span onclick="clearAllCompleted()">Clear All completed</span></div>`;
        document.getElementById('task-view').innerHTML += html;
    } else {
        html += `<span onclick="clearAllCompleted()">Clear All completed</span></div></div>`;
        document.getElementById('task-view').innerHTML += html;
        document.getElementById('mobile-filters').innerHTML = filters;
    }   
}

// this function changes value of activeFilter. It is called by elements in bottom bar
function setFilter(filter) {
    activeFilter = filter;
    listTasks();
}


//  function to clear all Completed tasks and remove from array
function clearAllCompleted() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isChecked) {
            tasks.splice(i, 1);
        }
    }
    listTasks();
}

// this functinon creates HTML code from tasks array and add it to the #task-view div/
function listTasks() {
    let html = '';
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isChecked) {
            if (activeFilter != 1) {
                html += `<div class="task-card draggable" id="${tasks[i].id}" draggable="true">
                    <div class="circle check checked" onclick="check(${tasks[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg></div>
                    <p class="task-desc"><strike>${tasks[i].description}</strike></p>
                    <button onclick="deleteTask(${tasks[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path
                        fill="#494C6B"
                        fill-rule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                    </svg></button>
                </div>`;
            }
        } else {
            if (activeFilter != 2) {
                html += `<div class="task-card draggable" id="${tasks[i].id}" draggable="true">
                    <div class="circle check" onclick="check(${tasks[i].id})"><div class="inner-circle"></div></div>
                    <p class="task-desc">${tasks[i].description}</p>
                    <button onclick="deleteTask(${tasks[i].id})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <path
                        fill="#494C6B"
                        fill-rule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                    </svg></button>
                    </div>`;
                }
            }
    }
    document.getElementById('task-view').innerHTML = html;
    setCount();
    bottombar();
}

// function to delete a task from array and rerender all tasks.
function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (id == tasks[i].id) {
            tasks.splice(i, 1);
        }
    }
    console.log('deleting task with id ' + id);
    setCount();
    listTasks();
}

// Function to add task in array
function createNewTask(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        if (e.target.value == '') return;
        let obj = { description: e.target.value, isChecked: false, id: uniqueId() };
        tasks.push(obj);
        listTasks();
        e.target.value = '';
    }
}

// function checks/completes a task. triggered by checkbox in each task.
function check(cardId) {
    count = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (cardId == tasks[i].id) {
            tasks[i].isChecked = !tasks[i].isChecked;
        }
    }
    listTasks();
}

// this function call renders tasks initially which are there for demo purpose
listTasks();

document.getElementById('new-task').addEventListener("keydown", createNewTask);

// const draggables = document.querySelectorAll('.draggable');
// const constainer = document.querySelector('task-view');

// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', () => {
//         console.log('dragging');
//         draggable.classList.add('dragging');
//     });
//     draggable.addEventListener('dragend', () => {
//         draggable.classList.remove('dragging');
//     })
// });

// function getDragAfterElement(task, y) {
//     const draggableElements = [...document.querySelectorAll('draggable:not(.dragging)')]
// }


