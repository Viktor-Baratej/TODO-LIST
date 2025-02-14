const toggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Перевіряємо, чи є збережена тема в localStorage
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  body.classList.add(currentTheme);
  // Змінюємо іконку відповідно до теми
  themeIcon.textContent = currentTheme === "dark-theme" ? "🌞" : "🌙";
}

// Перемикаємо тему при натисканні кнопки
toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme");
    themeIcon.textContent = "🌞"; // Сонце для світлої теми
  } else {
    localStorage.setItem("theme", "light-theme");
    themeIcon.textContent = "🌙"; // Місяць для темної теми
  }
});
