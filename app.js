// Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const dueDateInput = document.getElementById('due-date-input'); // New
const categoryInput = document.getElementById('category-input'); // New
const priorityInput = document.getElementById('priority-input'); // New

// Task Array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add Task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value; // New
    const category = categoryInput.value; // New
    const priority = priorityInput.value; // New

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dueDate: dueDate, // New
            category: category, // New
            priority: priority // New
        };
        tasks.push(task);
        updateTasks();
        taskInput.value = '';
        dueDateInput.value = ''; // New
        categoryInput.value = ''; // New
        priorityInput.value = ''; // New
    }
});

// Update Tasks List and LocalStorage
function updateTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${task.text} - ${task.dueDate} - ${task.category} - ${task.priority}</span> <!-- Updated -->
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
        taskList.appendChild(li);

        // Complete Task
        li.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;
            updateTasks();
        });

        // Delete Task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            updateTasks();
        });

        // Edit Task
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText;
                updateTasks();
            }
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter Tasks
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        filterTasks(filter);
    });
});

function filterTasks(filter) {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return filter === 'completed' ? task.completed : !task.completed;
    });
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${task.text} - ${task.dueDate} - ${task.category} - ${task.priority}</span> <!-- Updated -->
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
        taskList.appendChild(li);

        // Complete Task
        li.querySelector('.complete-btn').addEventListener('click', () => {
            task.completed = !task.completed;
            updateTasks();
        });

        // Delete Task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            updateTasks();
        });

        // Edit Task
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', task.text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                task.text = newTaskText;
                updateTasks();
            }
        });
    });
}

// Initial Load
updateTasks();
