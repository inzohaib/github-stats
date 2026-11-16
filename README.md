# GitHub Stats & Calc

A collection of small, dependency-free web projects built with HTML, CSS and vanilla JavaScript.

## Projects

### DevScope — GitHub Profile Analytics

Explore a GitHub profile with repository stats, language distribution, top repositories, a commit activity heatmap and searchable repository table.

**[Open DevScope](https://inzohaib.github.io/github-stats/)**

### Calc — Browser Calculator

A responsive everyday calculator with live previews, keyboard support, percentages and a recent-calculations panel.

**[Open Calc](https://inzohaib.github.io/github-stats/calculator/)** · [Calculator README](calculator/README.md)

## Calculator features

- Addition, subtraction, multiplication and division
- Percentage and positive/negative toggle
- Decimal input, clear-all and delete-last controls
- Live result preview and recent calculation history
- Keyboard shortcuts for fast input
- Responsive layout, accessible controls and reduced-motion support
- Safe arithmetic parser with no `eval()` or third-party dependencies

## Tech stack

- **HTML5** — semantic structure
- **CSS3** — responsive layouts and visual design
- **Vanilla JavaScript** — application logic and interactions
- **GitHub Pages** — static hosting and deployment

No package manager, framework or build step is required.

## Run locally

```bash
git clone https://github.com/inzohaib/github-stats.git
cd github-stats
python3 -m http.server 8000
```

Open <http://localhost:8000> for DevScope or <http://localhost:8000/calculator/> for Calc.

## Project structure

```text
.
├── calculator/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── css/
├── js/
├── index.html
└── README.md
```

## About

I built these projects to learn by making useful things with the fundamentals of web development. I enjoy experimenting with ideas, keeping the code lightweight, and improving the details that make small tools feel good to use.

## Deployment

The repository includes a GitHub Actions workflow that publishes the site to GitHub Pages whenever changes are pushed to `main`.

## License

MIT — see [LICENSE](LICENSE) if included in this repository.
