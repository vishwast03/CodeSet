const themeSwitch = document.querySelector('.theme-switch');

// changing theme on click
themeSwitch.addEventListener('click', () => {
    if (!themeSwitch.classList.contains('switch-dark')) {
        themeSwitch.classList.add('switch-dark');
    }
    else {
        themeSwitch.classList.remove('switch-dark');
    }
});

// open/close the code areas
const codingArea = document.querySelector('.coding-area');
const panelButtons = document.querySelectorAll('.btn');
const allCodeAreas = document.querySelectorAll('.area');
let openTabs = 2;

panelButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        const targetArea = Array.from(allCodeAreas).filter(area => {
            if (area.getAttribute('data-target') === target)
                return area;
        })[0];

        if (button.classList.contains('active-btn')) {
            button.classList.remove('active-btn');
            if (!targetArea.classList.contains('hide-area')) {
                targetArea.classList.add('hide-area');
                openTabs--;
                codingArea.style.gridTemplateColumns = `repeat(${openTabs}, 1fr)`;
            }
        }
        else {
            button.classList.add('active-btn');
            if (targetArea.classList.contains('hide-area')) {
                targetArea.classList.remove('hide-area');
                openTabs++;
                codingArea.style.gridTemplateColumns = `repeat(${openTabs}, 1fr)`;
            }
        }
    });
});

// run code
const runButton = document.querySelector('.run-btn');
const htmlTextarea = document.querySelector('#html-area textarea');
const cssTextarea = document.querySelector('#css-area textarea');
const jsTextarea = document.querySelector('#js-area textarea');
const iframeContainer = document.querySelector('.iframe-container');
const outputIframe = document.querySelector('.output-iframe');

const runCode = () => {
    const htmlCode = htmlTextarea.value;
    const cssCode = cssTextarea.value;
    const jsCode = jsTextarea.value;

    const finalCode = `
    <style> ${cssCode} </style>
    ${htmlCode}
    <script> ${jsCode} </script>
    `;

    outputIframe.src = `data:text/html;charset=utf-8,${encodeURI(finalCode)}`;
};

runButton.addEventListener('click', runCode);

// auto-run code
const autoRunCheckbox = document.querySelector('#auto-run');
let typingTimer;
let doneTypingInterval = 800;

autoRunCheckbox.addEventListener('click', () => {
    if (autoRunCheckbox.checked) {
        codingArea.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(runCode, doneTypingInterval);
        });
        codingArea.addEventListener('keydown', () => {
            clearTimeout(typingTimer);
        });
    }
});