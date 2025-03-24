class Task {
    constructor(name, description) {
      this.id = Date.now();
      this.name = name;
      this.description = description;
      this.status = 'pending';
    }
  }
  
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  const taskForm = document.getElementById('task-form');
  const taskNameInput = document.getElementById('task-name');
  const taskDescriptionInput = document.getElementById('task-description');
  const taskList = document.querySelector('.task-list');
  const filterAll = document.getElementById('filter-all');
  const filterPending = document.getElementById('filter-pending');
  const filterCompleted = document.getElementById('filter-completed');
  
  // Render tasks
  function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
      if (filter === 'completed') return task.status === 'completed';
      if (filter === 'pending') return task.status === 'pending';
      return true;
    });
  
    filteredTasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      if (task.status === 'completed') taskItem.classList.add('completed');
  
      taskItem.innerHTML = `
        <div>
          <div class="task-name">${task.name}</div>
          <div class="task-description">${task.description}</div>
        </div>
        <div class="task-actions">
          <button class="complete-btn" onclick="toggleTaskStatus(${task.id})">${task.status === 'pending' ? 'Complete' : 'Undo'}</button>
          <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
          <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
  
  // Add task
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const name = taskNameInput.value.trim();
    const description = taskDescriptionInput.value.trim();
  
    if (!name) {
      alert('Task name cannot be empty!');
      return;
    }
  
    const newTask = new Task(name, description);
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskNameInput.value = '';
    taskDescriptionInput.value = '';
  });
  
  // Toggle task status
  function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    saveTasks();
    renderTasks();
  }
  
  // Edit task
  function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newName = prompt('Edit task name:', task.name);
    const newDescription = prompt('Edit task description:', task.description);
  
    if (newName !== null && newName.trim() !== '') {
      task.name = newName.trim();
      task.description = newDescription.trim();
      saveTasks();
      renderTasks();
    }
  }
  
  // Delete task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
  }
  
  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Filter tasks
  filterAll.addEventListener('click', () => renderTasks('all'));
  filterPending.addEventListener('click', () => renderTasks('pending'));
  filterCompleted.addEventListener('click', () => renderTasks('completed'));
  
  // Initial render
  renderTasks();