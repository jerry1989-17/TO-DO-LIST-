const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');

// Load tasks from localStorage on page load
window.addEventListener('load', loadTasks);

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="task-buttons">
      <button onclick="completeTask(this)">Complete</button>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="removeTask(this)">Remove</button>
    </div>
  `;

  taskList.appendChild(li);
  newTaskInput.value = '';

  // Save tasks to localStorage
  saveTasks();
}

function completeTask(button) {
  const task = button.parentElement.parentElement;
  task.classList.toggle('completed');
  saveTasks();
}

function removeTask(button) {
  const task = button.parentElement.parentElement;
  taskList.removeChild(task);
  saveTasks();
}

function editTask(button) {
  const task = button.parentElement.parentElement;
  const taskText = task.querySelector('span');
  const newText = prompt('Edit the task:', taskText.textContent);

  if (newText !== null) {
    taskText.textContent = newText;
    saveTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  const taskElements = taskList.querySelectorAll('li');
  taskElements.forEach((task) => {
    const taskText = task.querySelector('span').textContent;
    const isCompleted = task.classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button onclick="completeTask(this)"${task.completed ? ' class="completed"' : ''}>Complete</button>
          <button onclick="editTask(this)">Edit</button>
          <button onclick="removeTask(this)">Remove</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
}