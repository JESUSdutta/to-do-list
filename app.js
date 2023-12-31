// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Function
function addTodo(event) {
    event.preventDefault(); // Prevent form submission

    // Create a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // Make the li a child of the div
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // Make the button a child of the div
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    // Make the button a child of the div
    todoDiv.appendChild(trashButton);

    // Make the todoDiv a child of the todoList in the HTML
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}


function deleteCheck(event){
    const item = event.target;

    //delete the todo 
    if ( item.classList[0] === "trash-btn" ) {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    //check mark
    if ( item.classList[0] === "complete-btn" ) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    
    let todos;

    //check if i already got some
    if(localStorage.getItem("todos") === null) {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
    let todos;

    //check if i already got some
    if(localStorage.getItem("todos") === null) {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
     // Create a div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    // Make the li a child of the div
    todoDiv.appendChild(newTodo);

    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    // Make the button a child of the div
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    // Make the button a child of the div
    todoDiv.appendChild(trashButton);

    // Make the todoDiv a child of the todoList in the HTML
    todoList.appendChild(todoDiv);

    }
)}



function removeLocalTodos(todo){
    let todos;

    //check if i already got some
    if(localStorage.getItem("todos") === null) {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}