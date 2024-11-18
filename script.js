let tasks = [];
let editingIndex = -1;

document.getElementById("todoForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const date = document.getElementById("taskDate").value;

  if (title && date) {
    if (editingIndex >= 0) {
      tasks[editingIndex] = { title, description, date, completed: false };
      editingIndex = -1;
    } else {
      tasks.push({ title, description, date, completed: false });
      console.log('data', tasks)
    }
    renderTasks();
    resetForm();
    const modal = bootstrap.Modal.getInstance(document.getElementById("todoModal"));
    modal.hide();
  }
});

document.querySelector(".add-task-btn").addEventListener("click", function () {
  editingIndex = -1;
  resetForm();
});

function renderTasks(filteredTasks = null) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasksToRender = filteredTasks || tasks;
  if (tasksToRender.length === 0) {
    const noTasksMessage = document.createElement("div");
    noTasksMessage.className = "no-Tasks-Message list-group-item";
    noTasksMessage.innerHTML = "<em>No tasks available</em>";
    taskList.appendChild(noTasksMessage);
  } else {
    tasksToRender.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.className = `task-item list-group-item ${task.completed ? 'completed' : ''}`;

      taskItem.innerHTML = `
        <div class="task-info">
          <strong>${task.title}</strong><br>
          ${task.description}<br>
          <small>Due: ${task.date}</small>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
          <button class="btn btn-success btn-sm" onclick="editTask(${index})">Edit</button>
          <button class="btn btn-primary btn-sm" onclick="mark(${index})">
            ${task.completed ? 'Completed' : 'Mark as Completed'}
          </button>
        </div>
      `;
      taskList.appendChild(taskItem);
    });
  }
}

function resetForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskDate").value = task.date;
  editingIndex = index;

  const modal = new bootstrap.Modal(document.getElementById("todoModal"));
  modal.show();
}


function mark(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

document.getElementById("filterdate").addEventListener("change", function () {
  const filterDate = this.value;
  const filteredTasks = tasks.filter(task => {
    console.log("task",task);
    return task.date === filterDate; 
  });

  renderTasks(filteredTasks);
});
