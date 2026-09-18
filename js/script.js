document.addEventListener("DOMContentLoaded", function () {

    const today = new Date();

    const dateElement = document.querySelector("#current-date");
    const welcomeMessage = document.querySelector("#welcome-message");
    const topbarGreeting = document.querySelector("#topbar-greeting");

    const taskInput = document.querySelector("#task-input");
    const addTaskButton = document.querySelector("#add-task-btn");
    const taskList = document.querySelector("#task-list");
    const taskCount = document.querySelector("#task-count");
    const completedCount = document.querySelector("#completed-count");

    const timerDisplay = document.querySelector("#timer");
    const startButton = document.querySelector("#start-btn");
    const pauseButton = document.querySelector("#pause-btn");
    const resetButton = document.querySelector("#reset-btn");

    const focusTimeDisplay = document.querySelector("#focus-time");

    let tasks = JSON.parse(localStorage.getItem("nexusTasks")) || [];

    let completedFocusMinutes =
        Number(localStorage.getItem("nexusFocusMinutes")) || 0;

    let timeLeft = 25 * 60;
    let timerInterval = null;
    let isRunning = false;

    function updateDateAndGreeting() {

        const formattedDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });

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

        if (dateElement) {
            dateElement.textContent = formattedDate;
        }

        if (topbarGreeting) {
            topbarGreeting.textContent = greeting;
        }

        if (welcomeMessage) {
            welcomeMessage.textContent =
                `${greeting}. Let's get things done.`;
        }
    }

    function setupNavigation() {

        const navItems = document.querySelectorAll(".nav-item");

        navItems.forEach(function (item) {

            item.addEventListener("click", function (event) {

                event.preventDefault();

                navItems.forEach(function (nav) {
                    nav.classList.remove("active");
                });

                item.classList.add("active");
            });

        });
    }

    function saveTasks() {

        localStorage.setItem(
            "nexusTasks",
            JSON.stringify(tasks)
        );

    }

    function updateTaskCount() {

        const totalTasks = tasks.length;

        if (taskCount) {
            taskCount.textContent =
                `${totalTasks} ${totalTasks === 1 ? "Task" : "Tasks"}`;
        }
    }

    function updateCompletedCount() {

        const completedTasks = tasks.filter(function (task) {
            return task.completed;
        });

        if (completedCount) {
            completedCount.textContent = completedTasks.length;
        }
    }

    function renderTasks() {

        if (!taskList) {
            return;
        }

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

    function addTask() {

        if (!taskInput) {
            return;
        }

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

        taskInput.focus();
    }

    function setupTaskEvents() {

        if (addTaskButton) {
            addTaskButton.addEventListener("click", addTask);
        }

        if (taskInput) {
            taskInput.addEventListener("keydown", function (event) {

                if (event.key === "Enter") {
                    addTask();
                }

            });
        }

        if (taskList) {

            taskList.addEventListener("change", function (event) {

                if (!event.target.classList.contains("task-checkbox")) {
                    return;
                }

                const taskId =
                    Number(event.target.dataset.id);

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

                const taskId =
                    Number(event.target.dataset.id);

                tasks = tasks.filter(function (task) {
                    return task.id !== taskId;
                });

                saveTasks();

                renderTasks();
            });
        }
    }

    function updateTimerDisplay() {

        if (!timerDisplay) {
            return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function startTimer() {

        if (isRunning) {
            return;
        }

        isRunning = true;

        if (startButton) {
            startButton.textContent = "Running...";
        }

        timerInterval = setInterval(function () {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimerDisplay();

            } else {

                completeSession();

            }

        }, 1000);
    }

    function pauseTimer() {

        if (!isRunning) {
            return;
        }

        clearInterval(timerInterval);

        timerInterval = null;

        isRunning = false;

        if (startButton) {
            startButton.textContent = "Resume";
        }
    }

    function resetTimer() {

        clearInterval(timerInterval);

        timerInterval = null;

        isRunning = false;

        timeLeft = 25 * 60;

        if (startButton) {
            startButton.textContent = "Start";
        }

        updateTimerDisplay();
    }

    function saveFocusTime() {

        localStorage.setItem(
            "nexusFocusMinutes",
            completedFocusMinutes
        );
    }

    function updateFocusTime() {

        if (!focusTimeDisplay) {
            return;
        }

        if (completedFocusMinutes >= 60) {

            const hours =
                Math.floor(completedFocusMinutes / 60);

            const minutes =
                completedFocusMinutes % 60;

            focusTimeDisplay.textContent =
                `${hours}h ${minutes}m`;

        } else {

            focusTimeDisplay.textContent =
                `${completedFocusMinutes}m`;
        }
    }

    function completeSession() {

        clearInterval(timerInterval);

        timerInterval = null;

        isRunning = false;

        completedFocusMinutes += 25;

        saveFocusTime();

        updateFocusTime();

        timeLeft = 25 * 60;

        if (startButton) {
            startButton.textContent = "Start";
        }

        updateTimerDisplay();

        alert("Focus session completed! Great work.");
    }

    function setupTimerEvents() {

        if (startButton) {
            startButton.addEventListener("click", startTimer);
        }

        if (pauseButton) {
            pauseButton.addEventListener("click", pauseTimer);
        }

        if (resetButton) {
            resetButton.addEventListener("click", resetTimer);
        }
    }

    updateDateAndGreeting();

    setupNavigation();

    setupTaskEvents();

    setupTimerEvents();

    renderTasks();

    updateTimerDisplay();

    updateFocusTime();

});
