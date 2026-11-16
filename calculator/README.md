# Calc — Browser Calculator

A clean, responsive calculator for everyday math. Built with **HTML, CSS and vanilla JavaScript**—no frameworks, packages or build tools.

**Live demo:** [Open Calc](https://inzohaib.github.io/github-stats/calculator/)

## Features

- Addition, subtraction, multiplication and division
- Percentage and positive/negative toggle
- Decimal input, clear-all and delete-last controls
- Live result preview as you type
- Calculation history for the current session
- Keyboard support: number keys, `+`, `-`, `*`, `/`, `%`, `Enter`, `Backspace` and `Escape`
- Responsive layout for desktop and mobile
- Accessible labels, visible focus states and reduced-motion support
- Safe arithmetic parser—no `eval()` and no third-party dependencies

## Run locally

Clone the repository and open the calculator folder with a local server:

```bash
git clone https://github.com/inzohaib/github-stats.git
cd github-stats
python3 -m http.server 8000
```

Then visit <http://localhost:8000/calculator/>.

You can also open `calculator/index.html` directly in a browser.

## Built with

- HTML for semantic structure
- CSS for the responsive interface
- Vanilla JavaScript for input, parsing, calculations and history

## Project structure

```text
calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```

## About the project

I made this as a small hands-on web project to practise building an interactive browser tool with the fundamentals of the web. The goal was to keep it fast, easy to use and dependency-free while adding thoughtful details like keyboard controls, live previews and accessible status updates.

## License

This project is shared under the repository's MIT license.
