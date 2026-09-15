console.log("NEXUS JavaScript loaded successfully!");
const dateElement = document.querySelector("#current-date");
const welcomeMessage = document.querySelector("#welcome-message");

const today = new Date();

console.log(today);
const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
});
dateElement.textContent = formattedDate;

const hour = today.getHours();

let greeting;

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 17) {
    greeting = "Good Afternoon";
} else if (hour < 21) {
    greeting = "Good Evening";
} else {
    greeting = "Good Night";
}

const topbarGreeting = document.querySelector("#topbar-greeting");
topbarGreeting.textContent = greeting;
welcomeMessage.textContent = `${greeting}. Let's get things done.`;

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {
    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");
    });
});

let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#start-btn");

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

startButton.addEventListener("click", function () {

    if (timerInterval !== null) {
        return;
    }

    startButton.textContent = "Focus Running...";

    timerInterval = setInterval(function () {

        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            startButton.textContent = "Start Focus";
            alert("Focus session completed!");
        }

    }, 1000);
});

setInterval(function () {

}, 1000);
clearInterval(timerInterval);


const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});
tasks.push(newTask);

taskList.addEventListener("change", function (event) {

    if (!event.target.classList.contains("task-checkbox")) {
        return;
    }

    const taskId = Number(event.target.dataset.id);

    const task = tasks.find(function (task) {
        return task.id === taskId;
    });

    if (task) {
        task.completed = event.target.checked;
    }

    saveTasks();

    renderTasks();

});
taskList.addEventListener("click", function (event) {

    if (!event.target.classList.contains("delete-task")) {
        return;
    }

    const taskId = Number(event.target.dataset.id);

    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();

    renderTasks();

});

taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-task")) {

        const taskItem = event.target.closest(".task-item");

        taskItem.remove();

        updateTaskCount();
    }

});

function updateTaskCount() {

    const totalTasks =
        document.querySelectorAll(".task-item").length;

    taskCount.textContent =
        `${totalTasks} ${totalTasks === 1 ? "Task" : "Tasks"}`;
}

let tasks = JSON.parse(localStorage.getItem("nexusTasks")) || [];

function saveTasks() {

    localStorage.setItem(
        "nexusTasks",
        JSON.stringify(tasks)
    );

}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const taskItem = document.createElement("div");

        taskItem.classList.add("task-item");

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <div class="task-content">

                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${task.text}
                </span>

            </div>

            <button
                class="delete-task"
                data-id="${task.id}"
            >
                ×
            </button>
        `;

        taskList.appendChild(taskItem);

    });

    updateTaskCount();
    updateCompletedCount();
}

function updateTaskCount() {

    const totalTasks = tasks.length;

    taskCount.textContent =
        `${totalTasks} ${totalTasks === 1 ? "Task" : "Tasks"}`;
}
const completedCount =
    document.querySelector("#completed-count");

    function updateCompletedCount() {

    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    });

    completedCount.textContent = completedTasks.length;
}
const completedCount =
    document.querySelector("#completed-count");

function updateCompletedCount() {

    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    });

    completedCount.textContent = completedTasks.length;
}

renderTasks();