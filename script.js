const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTask = null;

const addTask = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("Write something yar........");
        return false;
    }

    if(addBtn.value === "Edit" ){
        editTask.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{
    // creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p); 

    //Creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>' ; 
    editBtn.classList.add("btn","edtbtn");
    li.appendChild(editBtn);

    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>' ; 
    deleteBtn.classList.add("btn","dltbtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
    }
}

const updateTask = (e)=>{
    const str = e.target.innerHTML;
    //delete the task
    if(str == '<i class="fa-solid fa-trash-can"></i>' ){
        // console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }
    if(str == '<i class="fa-solid fa-pen-to-square"></i>'){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTask = e;
    }
}

const saveLocalTodos = (todo)=>{
    let todos = [];
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.log(todos);
}

const getLocalTodos = () => {
    let todos = [];
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            // creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p); 

            //Creating edit button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>' ; 
            editBtn.classList.add("btn","edtbtn");
            li.appendChild(editBtn);

            // creating delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>' ; 
            deleteBtn.classList.add("btn","dltbtn");
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
            inputBox.value = "";
        });
    }
}

const deleteLocalTodos = (todo) => {
    let todos = [];
    if(localStorage.getItem("todos") === null ){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    // slice does not change the original array, it creates copy of the arrey
    // splice alters the original array
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex  = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todo));
    
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTask);
todoList.addEventListener('click', updateTask);


