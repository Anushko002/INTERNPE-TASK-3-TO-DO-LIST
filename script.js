const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Load saved todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos to the list
function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveAndRender();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Save todos to localStorage and re-render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Handle form submission to add a new todo
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    saveAndRender();
    input.value = '';
    input.focus();
  }
});

// Initial render on page load
renderTodos();
