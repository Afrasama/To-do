
// JavaScript Code

// Select elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ""; // Clear the list
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = task.completed ? "completed" : "";

        // Task content
        const taskContent = document.createElement("span");
        taskContent.textContent = task.name;
        taskContent.addEventListener("click", () => toggleTaskCompletion(index));

        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(index));

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));

        // Append elements
        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });

    // Update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    tasks.push({ name: taskName, completed: false });
    taskInput.value = ""; // Clear input field
    renderTasks();
}

// Toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Edit a task
function editTask(index) {
    const newTaskName = prompt("Edit task:", tasks[index].name);
    if (newTaskName !== null && newTaskName.trim() !== "") {
        tasks[index].name = newTaskName.trim();
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listeners
addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Initial render
renderTasks();
