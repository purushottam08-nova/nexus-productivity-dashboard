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

    const dailyProgress = document.querySelector("#daily-progress");
    const streakCount = document.querySelector("#streak-count");
    const focusTimeDisplay = document.querySelector("#focus-time");

    const taskPriority = document.querySelector("#task-priority");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const navItems = document.querySelectorAll(".nav-item");
    const pageSections = document.querySelectorAll(".page-section");

    const toastContainer = document.querySelector("#toast-container");

    const goalInput = document.querySelector("#goal-input");
    const addGoalButton = document.querySelector("#add-goal-btn");
    const goalList = document.querySelector("#goal-list");
    const totalGoals = document.querySelector("#total-goals");
    const completedGoals = document.querySelector("#completed-goals");
    const activeGoals = document.querySelector("#active-goals");

    const analyticsScore = document.querySelector("#analytics-score");
    const analyticsTotalTasks =
        document.querySelector("#analytics-total-tasks");
    const analyticsCompletedTasks =
        document.querySelector("#analytics-completed-tasks");
    const analyticsFocusTime =
        document.querySelector("#analytics-focus-time");
    const analyticsBars =
        document.querySelector("#analytics-bars");

    const noteTitle = document.querySelector("#note-title");
    const noteContent = document.querySelector("#note-content");
    const addNoteButton = document.querySelector("#add-note-btn");
    const notesList = document.querySelector("#notes-list");

    const themeToggle = document.querySelector("#theme-toggle");
    const clearDataButton = document.querySelector("#clear-data-btn");

    let currentFilter = "all";

    let tasks =
        JSON.parse(localStorage.getItem("nexusTasks")) || [];

    let goals =
        JSON.parse(localStorage.getItem("nexusGoals")) || [];

    let notes =
        JSON.parse(localStorage.getItem("nexusNotes")) || [];

    let completedFocusMinutes =
        Number(localStorage.getItem("nexusFocusMinutes")) || 0;

    let streakData =
        JSON.parse(localStorage.getItem("nexusStreak")) || {
            streak: 0,
            lastActiveDate: null
        };

    let weeklyActivity =
        JSON.parse(localStorage.getItem("nexusWeeklyActivity")) || {};

    let timeLeft = 25 * 60;
    let timerInterval = null;
    let isRunning = false;


    function updateDateAndGreeting() {

        const formattedDate =
            today.toLocaleDateString("en-US", {
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

    function showToast(message, type = "success") {

        if (!toastContainer) {
            return;
        }

        const toast =
            document.createElement("div");

        toast.classList.add(
            "toast",
            type
        );

        let icon = "✓";

        if (type === "warning") {
            icon = "!";
        }

        if (type === "danger") {
            icon = "×";
        }

        toast.innerHTML = `
            <div class="toast-icon">
                ${icon}
            </div>

            <span>
                ${message}
            </span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(function () {

            toast.classList.add("removing");

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 2500);
    }


    function saveTasks() {

        localStorage.setItem(
            "nexusTasks",
            JSON.stringify(tasks)
        );
    }


    function saveGoals() {

        localStorage.setItem(
            "nexusGoals",
            JSON.stringify(goals)
        );
    }


    function saveNotes() {

        localStorage.setItem(
            "nexusNotes",
            JSON.stringify(notes)
        );
    }


    function calculateProductivityScore() {

        const totalTasks = tasks.length;

        const completedTasks =
            tasks.filter(function (task) {
                return task.completed;
            }).length;

        let taskScore = 0;

        if (totalTasks > 0) {

            taskScore =
                (completedTasks / totalTasks) * 70;
        }

        const focusScore =
            Math.min(
                (completedFocusMinutes / 100) * 30,
                30
            );

        return Math.round(
            taskScore + focusScore
        );
    }


    function updateProgressMessage() {

        const progressMessage =
            document.querySelector(".stat-card:first-child p");

        if (!progressMessage) {
            return;
        }

        const score =
            calculateProductivityScore();

        if (score === 0) {

            progressMessage.textContent =
                "Start your day";

        } else if (score < 30) {

            progressMessage.textContent =
                "Good start";

        } else if (score < 60) {

            progressMessage.textContent =
                "Keep pushing";

        } else if (score < 80) {

            progressMessage.textContent =
                "Great progress";

        } else {

            progressMessage.textContent =
                "Excellent work";
        }
    }


    function updateTaskCount() {

        const totalTasks = tasks.length;

        if (taskCount) {

            taskCount.textContent =
                `${totalTasks} ${totalTasks === 1 ? "Task" : "Tasks"}`;
        }
    }


    function updateCompletedCount() {

        const completedTasks =
            tasks.filter(function (task) {
                return task.completed;
            });

        if (completedCount) {
            completedCount.textContent =
                completedTasks.length;
        }
    }


    function updateDailyProgress() {

        if (!dailyProgress) {
            return;
        }

        const score =
            calculateProductivityScore();

        dailyProgress.textContent =
            `${score}%`;

        updateProgressMessage();
    }


    function renderTasks() {

        if (!taskList) {
            return;
        }

        taskList.innerHTML = "";

        const filteredTasks =
            tasks.filter(function (task) {

                if (currentFilter === "active") {
                    return !task.completed;
                }

                if (currentFilter === "completed") {
                    return task.completed;
                }

                return true;
            });

        const priorityOrder = {
            high: 1,
            medium: 2,
            low: 3
        };

        filteredTasks.sort(function (a, b) {

            const priorityA =
                priorityOrder[a.priority || "medium"];

            const priorityB =
                priorityOrder[b.priority || "medium"];

            return priorityA - priorityB;
        });


        if (filteredTasks.length === 0) {

            const emptyState =
                document.createElement("div");

            emptyState.classList.add("empty-state");

            if (currentFilter === "completed") {

                emptyState.textContent =
                    "No completed tasks yet.";

            } else if (currentFilter === "active") {

                emptyState.innerHTML = `
                    <div class="empty-icon">✓</div>
                    <h3>No active tasks</h3>
                    <p>You're all caught up. Enjoy your progress.</p>
                `;

            } else {

                emptyState.innerHTML = `
                    <div class="empty-icon">✦</div>
                    <h3>No tasks yet</h3>
                    <p>Add your first task and start making progress.</p>
                `;
            }

            taskList.appendChild(emptyState);

            updateTaskCount();
            updateCompletedCount();
            updateDailyProgress();

            return;
        }


        filteredTasks.forEach(function (task) {

            const taskItem =
                document.createElement("div");

            taskItem.classList.add("task-item");

            if (task.completed) {
                taskItem.classList.add("completed");
            }

            const priority =
                task.priority || "medium";

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

                <div class="task-actions">

                    <span class="priority-badge ${priority}">
                        ${priority.toUpperCase()}
                    </span>

                    <button
                        class="delete-task"
                        data-id="${task.id}"
                    >
                        ×
                    </button>

                </div>
            `;

            taskList.appendChild(taskItem);
        });


        updateTaskCount();
        updateCompletedCount();
        updateDailyProgress();
    }


    function getTodayKey() {

        return new Date()
            .toISOString()
            .split("T")[0];
    }


    function updateWeeklyActivity() {

        const todayKey =
            getTodayKey();

        if (!weeklyActivity[todayKey]) {
            weeklyActivity[todayKey] = 0;
        }

        weeklyActivity[todayKey]++;

        localStorage.setItem(
            "nexusWeeklyActivity",
            JSON.stringify(weeklyActivity)
        );
    }


    function updateStreak() {

        const todayDate =
            getTodayKey();

        if (streakData.lastActiveDate === todayDate) {

            if (streakCount) {
                streakCount.textContent =
                    streakData.streak;
            }

            return;
        }


        if (streakData.lastActiveDate === null) {

            streakData.streak = 1;

        } else {

            const lastDate =
                new Date(streakData.lastActiveDate);

            const currentDate =
                new Date(todayDate);

            const difference =
                Math.floor(
                    (currentDate - lastDate) /
                    (1000 * 60 * 60 * 24)
                );


            if (difference === 1) {

                streakData.streak++;

            } else if (difference > 1) {

                streakData.streak = 1;
            }
        }


        streakData.lastActiveDate =
            todayDate;


        localStorage.setItem(
            "nexusStreak",
            JSON.stringify(streakData)
        );


        if (streakCount) {
            streakCount.textContent =
                streakData.streak;
        }
    }


    function addTask() {

        if (!taskInput) {
            return;
        }

        const taskText =
            taskInput.value.trim();

        if (taskText === "") {
            return;
        }

        const priority =
            taskPriority
                ? taskPriority.value
                : "medium";

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };


        tasks.push(newTask);

        saveTasks();

        updateWeeklyActivity();

        updateStreak();

        taskInput.value = "";

        renderTasks();

        updateAnalytics();

        taskInput.focus();

        taskInput.value = "";

        renderTasks();

        updateAnalytics();

        showToast("Task added successfully");

        taskInput.focus();
    }


    function setupTaskEvents() {

        if (addTaskButton) {

            addTaskButton.addEventListener(
                "click",
                addTask
            );
        }


        if (taskInput) {

            taskInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {
                        addTask();
                    }
                }
            );
        }


        if (taskList) {

            taskList.addEventListener(
                "change",
                function (event) {

                    if (
                        !event.target.classList.contains(
                            "task-checkbox"
                        )
                    ) {
                        return;
                    }


                    const taskId =
                        Number(
                            event.target.dataset.id
                        );


                    const task =
                        tasks.find(function (task) {

                            return task.id === taskId;

                        });


                    if (task) {

                        task.completed =
                            event.target.checked;

                        if (task.completed) {

                            updateStreak();
                            updateWeeklyActivity();

                            showToast(
                                "Task completed!",
                                "success"
                            );

                        } else {

                            showToast(
                                "Task marked as active",
                                "warning"
                            );
                        }
                    }

                    saveTasks();

                    renderTasks();

                    updateAnalytics();
                }
            );


            taskList.addEventListener(
                "click",
                function (event) {

                    if (
                        !event.target.classList.contains(
                            "delete-task"
                        )
                    ) {
                        return;
                    }


                    const taskId =
                        Number(
                            event.target.dataset.id
                        );


                    tasks =
                        tasks.filter(function (task) {

                            return task.id !== taskId;

                        });

                    saveTasks();

                    renderTasks();

                    updateAnalytics();

                    showToast(
                        "Task deleted",
                        "danger"
                    );
                }
            );
        }


        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add("active");


                    currentFilter =
                        button.dataset.filter;


                    renderTasks();
                }
            );
        });
    }


    function updateTimerDisplay() {

        if (!timerDisplay) {
            return;
        }

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;


        timerDisplay.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }


    function startTimer() {

        if (isRunning) {
            return;
        }

        isRunning = true;


        if (startButton) {
            startButton.textContent =
                "Running...";
        }


        timerInterval =
            setInterval(function () {

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

            startButton.textContent =
                "Resume";
        }
    }


    function resetTimer() {

        clearInterval(timerInterval);

        timerInterval = null;

        isRunning = false;

        timeLeft = 25 * 60;


        if (startButton) {

            startButton.textContent =
                "Start";
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
                Math.floor(
                    completedFocusMinutes / 60
                );

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

        updateDailyProgress();

        updateWeeklyActivity();

        updateStreak();

        updateAnalytics();

        timeLeft = 25 * 60;


        if (startButton) {

            startButton.textContent =
                "Start";
        }


        updateTimerDisplay();

        showToast(
            "Focus session completed! Great work.",
            "success"
        );
    }


    function setupTimerEvents() {

        if (startButton) {

            startButton.addEventListener(
                "click",
                startTimer
            );
        }


        if (pauseButton) {

            pauseButton.addEventListener(
                "click",
                pauseTimer
            );
        }


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                resetTimer
            );
        }
    }


    function addGoal() {

        if (!goalInput) {
            return;
        }

        const title =
            goalInput.value.trim();

        if (title === "") {
            return;
        }

        const newGoal = {
            id: Date.now(),
            title: title,
            progress: 0,
            completed: false,
            createdAt: new Date().toISOString()
        };

        goals.push(newGoal);

        saveGoals();

        goalInput.value = "";

        renderGoals();

        updateStreak();

        showToast(
            "Goal added successfully"
        );

        goalInput.focus();
    }


    function renderGoals() {

        if (!goalList) {
            return;
        }

        goalList.innerHTML = "";

                 if (goals.length === 0) {

            const empty =
                 document.createElement("div");

            empty.classList.add("empty-state");

            empty.innerHTML = `
                   <div class="empty-icon">◎</div>
                   <h3>No goals yet</h3>
                  <p>Define a goal and turn your vision into progress.</p>
            `;

            goalList.appendChild(empty);

            updateGoalSummary();

            return;
        }

        goals.forEach(function (goal) {

            const goalCard =
                document.createElement("div");

            goalCard.classList.add("goal-card");

            if (goal.completed) {
                goalCard.classList.add("completed");
            }

            const status =
                goal.completed
                    ? "COMPLETED"
                    : "IN PROGRESS";

            goalCard.innerHTML = `
                <div class="goal-top">

                    <div class="goal-title">
                        ${goal.title}
                    </div>

                    <div class="goal-status">
                        ${status}
                    </div>

                </div>

                <div class="goal-progress-row">

                    <div class="goal-progress">

                        <div
                            class="goal-progress-bar"
                            style="width: ${goal.progress}%"
                        ></div>

                    </div>

                    <span class="goal-percentage">
                        ${goal.progress}%
                    </span>

                </div>

                <div class="goal-controls">

                    <button
                        class="goal-minus"
                        data-id="${goal.id}"
                    >
                        −10%
                    </button>

                    <button
                        class="goal-plus"
                        data-id="${goal.id}"
                    >
                        +10%
                    </button>

                    <button
                        class="goal-complete"
                        data-id="${goal.id}"
                    >
                        ${goal.completed ? "Reopen" : "Complete"}
                    </button>

                    <button
                        class="goal-delete"
                        data-id="${goal.id}"
                    >
                        Delete
                    </button>

                </div>
            `;

            goalList.appendChild(goalCard);
        });


        updateGoalSummary();
    }


    function updateGoalSummary() {

        const completed =
            goals.filter(function (goal) {
                return goal.completed;
            }).length;

        const active =
            goals.length - completed;


        if (totalGoals) {
            totalGoals.textContent =
                goals.length;
        }

        if (completedGoals) {
            completedGoals.textContent =
                completed;
        }

        if (activeGoals) {
            activeGoals.textContent =
                active;
        }
    }


    function setupGoalEvents() {

        if (addGoalButton) {

            addGoalButton.addEventListener(
                "click",
                addGoal
            );
        }


        if (goalInput) {

            goalInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {
                        addGoal();
                    }
                }
            );
        }


        if (goalList) {

            goalList.addEventListener(
                "click",
                function (event) {

                    const goalId =
                        Number(
                            event.target.dataset.id
                        );

                    if (!goalId) {
                        return;
                    }

                    const goal =
                        goals.find(function (item) {
                            return item.id === goalId;
                        });

                    if (!goal) {
                        return;
                    }


                    if (
                        event.target.classList.contains(
                            "goal-plus"
                        )
                    ) {

                        goal.progress =
                            Math.min(
                                goal.progress + 10,
                                100
                            );

                        if (goal.progress === 100) {
                            goal.completed = true;
                            updateStreak();
                        }
                    }


                    if (
                        event.target.classList.contains(
                            "goal-minus"
                        )
                    ) {

                        goal.progress =
                            Math.max(
                                goal.progress - 10,
                                0
                            );

                        if (goal.progress < 100) {
                            goal.completed = false;
                        }
                    }


                    if (
                        event.target.classList.contains(
                            "goal-complete"
                        )
                    ) {

                        if (goal.completed) {

                            goal.completed = false;

                            if (goal.progress === 100) {
                                goal.progress = 90;
                            }

                            showToast(
                                "Goal reopened",
                                "warning"
                            );

                        } else {

        goal.completed = true;
        goal.progress = 100;

        updateStreak();

        showToast(
            "Goal completed!",
            "success"
        );
                        }
                    }


                    if (
                        event.target.classList.contains(
                            "goal-delete"
                        )
                    ) {

                        goals =
                            goals.filter(function (item) {
                                return item.id !== goalId;
                            });

                        showToast(
                            "Goal deleted",
                            "danger"
                        );
                    }


                    saveGoals();

                    renderGoals();

                    updateAnalytics();
                }
            );
        }
    }


    function updateAnalytics() {

        const score =
            calculateProductivityScore();

        const completedTaskTotal =
            tasks.filter(function (task) {
                return task.completed;
            }).length;


        if (analyticsScore) {
            analyticsScore.textContent =
                `${score}%`;
        }

        if (analyticsTotalTasks) {
            analyticsTotalTasks.textContent =
                tasks.length;
        }

        if (analyticsCompletedTasks) {
            analyticsCompletedTasks.textContent =
                completedTaskTotal;
        }

        if (analyticsFocusTime) {

            if (completedFocusMinutes >= 60) {

                const hours =
                    Math.floor(
                        completedFocusMinutes / 60
                    );

                const minutes =
                    completedFocusMinutes % 60;

                analyticsFocusTime.textContent =
                    `${hours}h ${minutes}m`;

            } else {

                analyticsFocusTime.textContent =
                    `${completedFocusMinutes}m`;
            }
        }

        renderAnalyticsBars();
    }


    function renderAnalyticsBars() {

        if (!analyticsBars) {
            return;
        }

        analyticsBars.innerHTML = "";

        const days = [];

        for (let i = 6; i >= 0; i--) {

            const date =
                new Date();

            date.setDate(
                date.getDate() - i
            );

            const key =
                date.toISOString()
                    .split("T")[0];

            const day =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                );

            days.push({
                key: key,
                day: day
            });
        }


        const values =
            days.map(function (item) {

                return weeklyActivity[item.key] || 0;

            });


        const maxValue =
            Math.max(
                ...values,
                1
            );


        days.forEach(function (item, index) {

            const wrapper =
                document.createElement("div");

            wrapper.classList.add(
                "analytics-bar-wrapper"
            );

            const bar =
                document.createElement("div");

            bar.classList.add(
                "analytics-bar"
            );

            const percentage =
                Math.max(
                    (values[index] / maxValue) * 100,
                    3
                );

            bar.style.height =
                `${percentage}%`;

            const label =
                document.createElement("span");

            label.classList.add(
                "analytics-day"
            );

            label.textContent =
                item.day;

            wrapper.appendChild(bar);
            wrapper.appendChild(label);

            analyticsBars.appendChild(wrapper);
        });
    }

    function renderDashboardChart() {

        const weeklyChart =
            document.querySelector("#weekly-chart");

        const chartLabels =
            document.querySelector("#chart-labels");

        if (!weeklyChart || !chartLabels) {
            return;
        }

        weeklyChart.innerHTML = "";
        chartLabels.innerHTML = "";

        const days = [];

        for (let i = 6; i >= 0; i--) {

            const date =
                new Date();

            date.setDate(
                date.getDate() - i
            );

            const key =
                date.toISOString()
                    .split("T")[0];

            const label =
                date.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "short"
                    }
                );

            days.push({
                key: key,
                label: label
            });
        }


        const values =
            days.map(function (day) {

                return weeklyActivity[day.key] || 0;

            });


        const maxValue =
            Math.max(
                ...values,
                1
            );


        days.forEach(function (day, index) {

            const bar =
                document.createElement("div");

            bar.classList.add(
            "chart-bar"
            );


            const height =
                Math.max(
                    (values[index] / maxValue) * 100,
                    8
                );


            bar.style.height =
                `${height}%`;


            weeklyChart.appendChild(bar);


            const label =
                document.createElement("span");

            label.textContent =
                day.label.charAt(0);

            chartLabels.appendChild(label);
        });
    }

    function addNote() {

        if (!noteTitle || !noteContent) {
            return;
        }

        const title =
            noteTitle.value.trim();

        const content =
            noteContent.value.trim();

        if (
            title === "" ||
            content === ""
        ) {
            return;
        }

        const newNote = {
            id: Date.now(),
            title: title,
            content: content,
            createdAt: new Date().toISOString()
        };

        notes.unshift(newNote);

        saveNotes();

        noteTitle.value = "";
        noteContent.value = "";

        renderNotes();

        updateStreak();

        showToast(
           "Note saved successfully"
        );

        noteTitle.focus();
    }


    function renderNotes() {

        if (!notesList) {
            return;
        }

        notesList.innerHTML = "";

        if (notes.length === 0) {

            const empty =
                document.createElement("div");

            empty.classList.add("empty-state");

            empty.innerHTML = `
                <div class="empty-icon">□</div>
                <h3>No notes yet</h3>
                <p>Capture your ideas before they disappear.</p>
            `;

            notesList.appendChild(empty);

            return;
        }


        notes.forEach(function (note) {

            const noteCard =
                document.createElement("div");

            noteCard.classList.add("note-card");

            const date =
                new Date(note.createdAt)
                    .toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        }
                    );

            noteCard.innerHTML = `
                <h3>
                    ${note.title}
                </h3>

                <p>
                    ${note.content}
                </p>

                <div class="note-card-footer">

                    <span class="note-date">
                        ${date}
                    </span>

                    <button
                        class="note-delete"
                        data-id="${note.id}"
                    >
                        Delete
                    </button>

                </div>
            `;

            notesList.appendChild(noteCard);
        });
    }


    function setupNoteEvents() {

        if (addNoteButton) {

            addNoteButton.addEventListener(
                "click",
                addNote
            );
        }


        if (notesList) {

            notesList.addEventListener(
                "click",
                function (event) {

                    if (
                        !event.target.classList.contains(
                            "note-delete"
                        )
                    ) {
                        return;
                    }

                    const noteId =
                        Number(
                            event.target.dataset.id
                        );

                    notes =
                        notes.filter(function (note) {

                            return note.id !== noteId;

                        });

                    saveNotes();

                    renderNotes();

                    showToast(
                        "Note deleted",
                        "danger"
                    );
                }
            );
        }
    }


    function showSection(sectionId) {

        pageSections.forEach(function (section) {

            section.classList.remove(
                "active-section"
            );
        });


        const targetSection =
            document.querySelector(
                `#${sectionId}`
            );


        if (targetSection) {

            targetSection.classList.add(
                "active-section"
            );
        }


        navItems.forEach(function (item) {

            item.classList.remove("active");

            if (
                item.dataset.section === sectionId
            ) {

                item.classList.add("active");
            }
        });


        if (sectionId === "analytics") {
            updateAnalytics();
        }
    }


    function setupNavigation() {

        navItems.forEach(function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const section =
                        item.dataset.section;

                    showSection(section);
                }
            );
        });


        const dashboardButtons =
            document.querySelectorAll(
                "[data-go-dashboard]"
            );


        dashboardButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        showSection(
                            "dashboard"
                        );
                    }
                );
            }
        );
    }


    function setupTheme() {

        const savedTheme =
            localStorage.getItem(
                "nexusTheme"
            );


        if (savedTheme === "light") {

            document.body.classList.add(
                "light-mode"
            );

            if (themeToggle) {
                themeToggle.textContent =
                    "Dark Mode";
            }
        }


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "light-mode"
                    );


                    const isLight =
                        document.body.classList.contains(
                            "light-mode"
                        );


                    localStorage.setItem(
                        "nexusTheme",
                        isLight
                            ? "light"
                            : "dark"
                    );


                    themeToggle.textContent =
                        isLight
                            ? "Dark Mode"
                            : "Light Mode";
                }
            );
        }
    }


    function clearAllData() {

        const confirmed =
            confirm(
                "Clear all NEXUS productivity data?"
            );

        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "nexusTasks"
        );

        localStorage.removeItem(
            "nexusGoals"
        );

        localStorage.removeItem(
            "nexusNotes"
        );

        localStorage.removeItem(
            "nexusFocusMinutes"
        );

        localStorage.removeItem(
            "nexusStreak"
        );

        localStorage.removeItem(
            "nexusWeeklyActivity"
        );


        tasks = [];
        goals = [];
        notes = [];

        completedFocusMinutes = 0;

        streakData = {
            streak: 0,
            lastActiveDate: null
        };

        weeklyActivity = {};


        renderTasks();
        renderGoals();
        renderNotes();

        updateFocusTime();
        updateAnalytics();

        if (streakCount) {
            streakCount.textContent = "0";
        }

        resetTimer();
        showToast(
            "All productivity data cleared",
            "danger"
        );
    }


    function setupSettings() {

        if (clearDataButton) {

            clearDataButton.addEventListener(
                "click",
                clearAllData
            );
        }
    }


    updateDateAndGreeting();

    setupNavigation();

    setupTaskEvents();

    setupTimerEvents();

    setupGoalEvents();

    setupNoteEvents();

    setupTheme();

    setupSettings();

    renderTasks();

    renderGoals();

    renderNotes();

    updateTimerDisplay();

    updateFocusTime();

    updateAnalytics();

    renderDashboardChart();


    if (streakCount) {

        streakCount.textContent =
            streakData.streak;
    }

});