
const keys = document.querySelectorAll(".key[data-key]");
const testedCount = document.getElementById("testedCount");
const resetButton = document.getElementById("resetButton");

let testedKeys = new Set();

document.addEventListener("keydown", function(event) {
    const keyElement = document.querySelector(
        `.key[data-key="${event.code}"]`
    );

    if (!keyElement) return;

    if (event.code === "Space") {
        event.preventDefault();
    }

    keyElement.classList.add("active");

    if (!testedKeys.has(event.code)) {
        testedKeys.add(event.code);
        testedCount.textContent = testedKeys.size;
    }
});

document.addEventListener("keyup", function(event) {
    const keyElement = document.querySelector(
        `.key[data-key="${event.code}"]`
    );

    if (keyElement) {
        keyElement.classList.remove("active");
    }
});

window.addEventListener("blur", function() {
    keys.forEach(key => key.classList.remove("active"));
});

const mouse = document.querySelector(".mouse");

const mouseStatus = {
    0: document.getElementById("leftStatus"),
    1: document.getElementById("middleStatus"),
    2: document.getElementById("rightStatus")
};

const scrollStatus = document.getElementById("scrollStatus");
const moveStatus = document.getElementById("moveStatus");

function setTested(element) {
    element.textContent = "Working ✓";
    element.classList.add("tested");
}

mouse.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

mouse.addEventListener("mousedown", function(event) {
    event.preventDefault();

    const status = mouseStatus[event.button];
    if (!status) return;

    setTested(status);

    const visual = mouse.querySelector(
        `[data-mouse="${event.button}"]`
    );

    if (visual) visual.classList.add("active");
});

document.addEventListener("mouseup", function(event) {
    const visual = mouse.querySelector(
        `[data-mouse="${event.button}"]`
    );

    if (visual) visual.classList.remove("active");
});

mouse.addEventListener("mousemove", function() {
    setTested(moveStatus);
});

mouse.addEventListener("wheel", function() {
    setTested(scrollStatus);
}, { passive: true });

resetButton.addEventListener("click", function() {
    testedKeys.clear();
    testedCount.textContent = "0";

    keys.forEach(key => key.classList.remove("active"));

    Object.values(mouseStatus).forEach(status => {
        status.textContent = "Not tested";
        status.classList.remove("tested");
    });

    scrollStatus.textContent = "Not tested";
    scrollStatus.classList.remove("tested");

    moveStatus.textContent = "Not tested";
    moveStatus.classList.remove("tested");
});
