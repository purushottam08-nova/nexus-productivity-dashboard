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

    const taskItem = document.createElement("div");

    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox">

            <span class="task-text">
                ${taskText}
            </span>
        </div>

        <button class="delete-task">
            ×
        </button>
    `;

    taskList.appendChild(taskItem);

    taskInput.value = "";

    updateTaskCount();
}
addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

taskList.addEventListener("change", function (event) {

    if (event.target.classList.contains("task-checkbox")) {

        const taskItem = event.target.closest(".task-item");

        taskItem.classList.toggle("completed");

    }

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