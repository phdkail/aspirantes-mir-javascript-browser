// Variables globales
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const deleteBtn = document.getElementById('delete-btn');
let todos = [];

// Función para generar un ID único
function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Función para agregar una tarea a la lista
function addTodo() {
  const todoText = input.value.trim();
  if (todoText !== '') {
    const todo = {
      id: generateID(),
      text: todoText,
      completed: false
    };
    todos.push(todo);
    renderTodoList();
    input.value = '';
  }
}

// Función para renderizar la lista de tareas
function renderTodoList() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      toggleTodoCompleted(todo.id);
    });
    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.classList.add('completed');
    }
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoList.appendChild(todoItem);
  });
}

// Función para cambiar el estado de completado de una tarea
function toggleTodoCompleted(todoId) {
  todos = todos.map(todo => {
    if (todo.id === todoId) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  renderTodoList();
}

// Función para eliminar las tareas completadas
function deleteCompletedTodos() {
  todos = todos.filter(todo => !todo.completed);
  renderTodoList();
}

// Evento de envío del formulario
form
