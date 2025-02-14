document.addEventListener("DOMContentLoaded", loadTasks);

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Додаємо завдання
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = "";
    updateTaskNumbers(); // Оновлюємо нумерацію після додавання
  }
});

// Функція для створення завдання
function addTask(text) {
  const li = document.createElement("li");

  li.innerHTML = `
        <span></span> <!-- Тут буде номер та текст -->
        <div>
            <button class="complete tooltip" data-tooltip="Зроблено">✅</button>
            <button class="edit tooltip" data-tooltip="Редагувати">✏️</button>
            <button class="delete tooltip" data-tooltip="Видалити">❌</button>
        </div>
    `;

  taskList.appendChild(li);
  li.querySelector("span").textContent = text;

  saveTasks();
  updateTaskNumbers(); // Оновлюємо нумерацію після додавання
}

// Функція для оновлення номерів після змін
function updateTaskNumbers() {
  document.querySelectorAll("#task-list li").forEach((li, index) => {
    const text = li.querySelector("span").textContent.replace(/^\d+\.\s/, ""); // Видаляємо старий номер
    li.querySelector("span").textContent = `${index + 1}. ${text}`;
  });
}

// Видалення завдання та оновлення номерів
taskList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.closest("li").remove();
    updateTaskNumbers();
    saveTasks();
  } else if (e.target.classList.contains("complete")) {
    e.target.closest("li").classList.toggle("completed");
    saveTasks();
  } else if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const textSpan = li.querySelector("span");
    const newText = prompt(
      "Редагувати завдання:",
      textSpan.textContent.replace(/^\d+\.\s/, "")
    );
    if (newText) {
      textSpan.textContent = newText;
      updateTaskNumbers();
      saveTasks();
    }
  }
});

// Збереження списку в LocalStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent.replace(/^\d+\.\s/, ""), // Зберігаємо без номера
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Завантаження завдань з LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, completed }) => {
    addTask(text);
    if (completed) {
      document
        .querySelector("#task-list li:last-child")
        .classList.add("completed");
    }
  });
  updateTaskNumbers(); // Оновлюємо нумерацію після завантаження
}
