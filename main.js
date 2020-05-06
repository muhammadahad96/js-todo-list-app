// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('click', filterTodo);

// Functions
function addTodo(e) {
  e.preventDefault();
  // Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create li item
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Save to Local Storage
  saveLocalTodo(todoInput.value);

  const checkButton = document.createElement('button');
  const trashButton = document.createElement('button');

  // Check Button
  checkBtn(checkButton);
  todoDiv.appendChild(checkButton);

  // Trash Button
  trashBtn(trashButton);
  todoDiv.appendChild(trashButton);

  // Append Todo List
  todoList.appendChild(todoDiv);

  // Clear input value
  todoInput.value = '';
}

function checkBtn(checkButton) {
  checkButton.innerHTML = '<i class="fas fa-check"></li>';
  checkButton.classList.add('check-btn');
}

function trashBtn(trashButton) {
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add('trash-btn');
}

function deleteCheck(e) {
  // Get the item on which click event listened
  const item = e.target;

  // Remove todo item
  if (item.classList[0] === 'trash-btn') {
    const todoItem = item.parentElement;
    todoItem.classList.add('delete');
    removeLocalTodo(todoItem);
    todoItem.addEventListener('transitionend', function() {
      todoItem.remove();
    });
  }

  // Check todo item
  if (item.classList[0] === 'check-btn') {
    const todoItem = item.parentElement;
    todoItem.classList.toggle('checked');
  }
}

// Filter Dropdown 
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        break;
    }
  });
}

// Save to Local Storage
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Fetch from Local Storage
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo) {
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li item
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const checkButton = document.createElement('button');
    const trashButton = document.createElement('button');

    // Check Button
    checkBtn(checkButton);
    todoDiv.appendChild(checkButton);

    // Trash Button
    trashBtn(trashButton);
    todoDiv.appendChild(trashButton);

    // Append Todo List
    todoList.appendChild(todoDiv);
  });
}

// Delete from Local Storage
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
