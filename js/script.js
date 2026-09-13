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