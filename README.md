# NEXUS — Productivity Command Center

NEXUS is a modern, responsive productivity dashboard designed to bring essential productivity tools into a single command center.

The project is being developed using **HTML, CSS, and JavaScript**, with a focus on clean UI design, interactive components, responsive layouts, and practical front-end development.

---

## Overview

NEXUS aims to provide users with a centralized workspace for managing daily productivity.

The dashboard combines task management, focus sessions, productivity tracking, goals, notes, and analytics into a single interface.

The project is being developed incrementally to demonstrate the practical implementation of modern front-end development concepts using vanilla web technologies.

---

## Features

### Dashboard

* Personalized time-based greeting
* Current date display
* Productivity overview
* Daily progress indicator
* Focus time tracking
* Completed task counter
* Productivity streak
* Weekly productivity visualization

### Task Management

* Add new tasks
* Mark tasks as completed
* Delete tasks
* Dynamic task counter
* Persistent task storage using Local Storage

### Focus Sessions

* 25-minute Pomodoro timer
* Start, pause, resume, and reset functionality
* Completed focus-session tracking
* Persistent focus-time data using Local Storage

### User Interface

* Modern dark-themed interface
* Glassmorphism-inspired cards
* Purple accent design system
* Gradient-based visual elements
* Hover and transition effects
* Responsive layout
* Desktop, tablet, and mobile support

---

## Technology Stack

| Technology    | Purpose                                       |
| ------------- | --------------------------------------------- |
| HTML5         | Semantic structure and page layout            |
| CSS3          | Styling, responsive design, animations and UI |
| JavaScript    | Application logic and interactivity           |
| Local Storage | Client-side data persistence                  |
| Git           | Version control                               |
| GitHub        | Repository and project hosting                |

---

## Project Structure

```text
nexus-productivity-dashboard/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   └── icons/
│
└── README.md
```

---

## Current Development Status

The project is currently under active development.

### Development Progress

| Day   | Development Stage              | Status    |
| ----- | ------------------------------ | --------- |
| Day 0 | Git & Project Setup            | Completed |
| Day 1 | HTML Foundation                | Completed |
| Day 2 | CSS Foundation & UI Design     | Completed |
| Day 3 | JavaScript Fundamentals        | Completed |
| Day 4 | Advanced Interactive Features  | Planned   |
| Day 5 | Analytics & Data Visualization | Planned   |
| Day 6 | Responsive Optimization        | Planned   |
| Day 7 | Final Polish & Documentation   | Planned   |

---

## Development Log

### Day 0 — Git & Project Setup

* Created the GitHub repository
* Installed and configured Git
* Connected the local project with GitHub
* Cloned the repository locally
* Created the initial project structure
* Added project documentation

### Day 1 — HTML Foundation

* Created the main HTML document
* Implemented semantic page structure
* Created the NEXUS sidebar
* Added dashboard navigation
* Added top navigation bar
* Added user profile section
* Added welcome section
* Added productivity statistics
* Created productivity chart structure
* Added focus session section
* Added task management structure

### Day 2 — CSS Foundation & UI Design

* Implemented the complete dark-themed interface
* Created the NEXUS visual design system
* Styled the sidebar and navigation
* Implemented glassmorphism-inspired cards
* Added gradient visual elements
* Added hover states and transitions
* Styled productivity statistics
* Designed the productivity chart
* Styled the Pomodoro timer
* Added responsive layouts
* Added tablet and mobile breakpoints
* Improved spacing, typography, and visual hierarchy

### Day 3 — JavaScript Fundamentals

* Implemented dynamic date display
* Implemented time-based greetings
* Added interactive sidebar navigation
* Implemented task creation
* Implemented task completion
* Implemented task deletion
* Added dynamic task counters
* Added completed-task tracking
* Implemented Local Storage for tasks
* Implemented Pomodoro timer
* Added Start functionality
* Added Pause functionality
* Added Resume functionality
* Added Reset functionality
* Added completed focus-time tracking
* Implemented Local Storage for focus-time data

---

## Application Architecture

NEXUS currently follows a simple client-side architecture:

```text
User Interface
      │
      ▼
    HTML
      │
      ▼
    CSS
      │
      ▼
 JavaScript
      │
      ├── Task Management
      │
      ├── Pomodoro Timer
      │
      ├── Navigation
      │
      ├── Date & Greeting
      │
      └── Productivity Tracking
      │
      ▼
 Local Storage
```

The application currently runs entirely on the client side without requiring a backend server.

---

## Data Persistence

NEXUS uses the browser's **Local Storage API** to persist selected application data.

Currently stored data includes:

* User tasks
* Task completion status
* Completed focus-session minutes

This allows users to refresh or reopen the application without immediately losing their locally stored productivity data.

---

## Design Philosophy

NEXUS follows a minimal and futuristic interface designed around the concept of a personal **Productivity Operating System**.

The primary design principles include:

* Minimal visual clutter
* Clear information hierarchy
* Consistent spacing
* Responsive layouts
* Subtle animations
* Functional interactions
* Dark interface with focused accent colors
* Accessible and understandable navigation

---

## Future Improvements

The following features are planned for future development:

* Dynamic daily productivity calculation
* Automatic productivity streak calculation
* Goal management
* Advanced task filtering
* Task priorities
* Task categories
* Productivity analytics
* Interactive charts
* Weekly and monthly statistics
* Personal notes
* Dark/light theme switching
* Improved mobile navigation
* More advanced Pomodoro functionality
* Notifications and session alerts
* Enhanced Local Storage architecture
* Data export functionality
* Backend integration
* User authentication
* Cloud synchronization

---

## Learning Objectives

This project is also being developed as a practical learning project to strengthen understanding of:

* Semantic HTML
* CSS layouts
* Flexbox
* CSS Grid
* Responsive web design
* CSS transitions and animations
* DOM manipulation
* JavaScript events
* Arrays and objects
* Functions
* Local Storage
* Client-side application logic
* Git and GitHub workflows
* Project documentation

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nexus-productivity-dashboard.git
```

### 2. Navigate to the project directory

```bash
cd nexus-productivity-dashboard
```

### 3. Open the project

Open `index.html` directly in a browser, or use a development extension such as **Live Server** in Visual Studio Code.

No backend server or package installation is currently required.

---

## Usage

After opening the application, users can:

1. View the productivity dashboard
2. Check the current date and greeting
3. Add daily tasks
4. Mark tasks as completed
5. Delete tasks
6. Start a Pomodoro focus session
7. Pause or resume the timer
8. Reset the timer
9. Track completed focus time

Task and focus-session data are stored locally in the browser.

---

## Browser Compatibility

NEXUS is designed for modern browsers that support standard HTML5, CSS3, JavaScript, and Local Storage APIs.

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## Project Goals

The long-term goal of NEXUS is to evolve from a front-end dashboard into a complete personal productivity platform.

The planned evolution is:

```text
Static UI
   ↓
Interactive Dashboard
   ↓
Persistent Local Data
   ↓
Productivity Analytics
   ↓
Advanced Productivity System
   ↓
Full-Stack Productivity Platform
```

---

## Contribution

This project is currently maintained as an individual development project.

Suggestions, improvements, and constructive feedback are welcome.

If you would like to contribute:

1. Fork the repository
2. Create a new feature branch
3. Implement your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

## License

This project is currently intended for educational and portfolio purposes.

A formal open-source license may be added in a future release.

---

## Author

**Tanmay Pelapkar**

B.Tech Computer Science & Engineering Student

Areas of Interest:

* Web Development
* Software Development
* Artificial Intelligence & Machine Learning
* Data Science
* Computer Science

---

## Project Vision

NEXUS is being built with a simple philosophy:

> **Build. Learn. Improve. Repeat.**

The objective is not only to create a visually appealing dashboard, but to progressively transform it into a practical productivity system while applying real-world software development practices.
