const themeBgContainer = document.querySelector<HTMLDivElement>(".theme__bg");

const html = document.querySelector<HTMLElement>("html");

const themes: { [key: string]: HTMLDivElement } = {
  "theme-1": document.getElementById("theme-1") as HTMLDivElement,
  "theme-2": document.getElementById("theme-2") as HTMLDivElement,
  "theme-3": document.getElementById("theme-3") as HTMLDivElement,
};

Object.values(themes).forEach((themeElement: HTMLDivElement) => {
  themeElement.addEventListener("click", handleThemeToggle);
});

function handleThemeToggle(e: MouseEvent) {
  const target = e.target as HTMLSpanElement;
  const id = target.id;
  if (!themeBgContainer) return;
  html?.setAttribute("data-theme", id);
  themeBgContainer.style.background = getThemeContainerColor(id);
  Object.keys(themes).forEach((themeId, index) => {
    themes[themeId].style.background =
      themeId == id ? getThemeColor(id) : "transparent";
  });
}

const getThemeContainerColor = (themeId: string): string => {
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

const getThemeColor = (themeId: string): string => {
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
