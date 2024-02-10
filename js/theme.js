"use strict";
const themeBgContainer = document.querySelector(".theme__bg");
const html = document.querySelector("html");
const themes = {
    "theme-1": document.getElementById("theme-1"),
    "theme-2": document.getElementById("theme-2"),
    "theme-3": document.getElementById("theme-3"),
};
Object.values(themes).forEach((themeElement) => {
    themeElement.addEventListener("click", handleThemeToggle);
});
function handleThemeToggle(e) {
    const target = e.target;
    const id = target.id;
    if (!themeBgContainer)
        return;
    html === null || html === void 0 ? void 0 : html.setAttribute("data-theme", id);
    themeBgContainer.style.background = getThemeContainerColor(id);
    Object.keys(themes).forEach((themeId, index) => {
        themes[themeId].style.background =
            themeId == id ? getThemeColor(id) : "transparent";
    });
}
const getThemeContainerColor = (themeId) => {
    switch (themeId) {
        case "theme-1":
            return "hsl(223, 31%, 20%)";
        case "theme-2":
            return "hsl(0, 5%, 81%)";
        case "theme-3":
            return "hsl(268, 71%, 12%)";
        default:
            return "transparent";
    }
};
const getThemeColor = (themeId) => {
    switch (themeId) {
        case "theme-1":
            return "hsl(6, 63%, 50%)";
        case "theme-2":
            return "hsl(6, 63%, 50%)";
        case "theme-3":
            return "hsl(176, 100%, 44%)";
        default:
            return "transparent";
    }
};
