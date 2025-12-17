"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const inputValue = document.querySelector("#input-el");
  const addBtn = document.querySelector("#btn-add");
  const listItems = document.querySelector("#list-items");
  const progressBar = document.querySelector(".progress--bar");
  const taskDone = document.querySelector(".task--done");
  const allTask = document.querySelector(".all--task");

  // let tasks = [{ text: "cooking", isCompleted: false, id: 1 }];
  let tasks = [];
  loadFromLocalStorage();

  function saveLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // tracking tasks
  function tracker() {
    if (tasks.length === 0) {
      progressBar.classList.add("hidden");
      document.querySelector(".progress-result").classList.add("hidden");
    } else {
      progressBar.classList.remove("hidden");
      document.querySelector(".progress-result").classList.remove("hidden");
    }

    const taskCompleted = tasks.filter((ts) => ts.isCompleted === true).length;
    progressBar.style.width = `${(taskCompleted * 100) / tasks.length}%`;
    allTask.textContent = tasks.length;
    taskDone.textContent = +taskCompleted;

    taskCompleted > 0 && taskCompleted === tasks.length ? celebrate() : "";
  }
  // render task

  function renderTasks() {
    listItems.innerHTML = "";
    const sorted = tasks
      .slice()
      .sort((a, b) => Number(a.isCompleted - b.isCompleted));
    for (const task of sorted) {
      const li = createElement(task);
      listItems.appendChild(li);
    }
  }
  renderTasks();

  addBtn.addEventListener("click", addTask);

  function addTask(event) {
    event.preventDefault();
    const description = inputValue.value.trim();

    const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    if (!description) return;
    const task = { id, text: description, isCompleted: false };

    tasks = [...tasks, task];

    renderTasks();
    saveLocalStorage();
    tracker();

    inputValue.value = "";
    console.log(tasks);
  }

  function createElement(task) {
    const li = document.createElement("li");
    li.className = "item";

    li.innerHTML = `
   <input type='checkbox' class='checkbox' ${
     task.isCompleted ? "checked" : ""
   }/>
      <span class='text'>${task.text}</span>
      <div class ='btn-container'>
      <button class='btn-edit' ${task.isCompleted ? "disabled" : ""}>
       <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffe8cc"
            class="icon"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
            />
          </svg>
      </button>
      <button class='btn-delete'>
      <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffe8cc"
            class="icon"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clip-rule="evenodd"
            />
          </svg>
      </button>
      </div>
  `;

    //   remove task
    li.querySelector(".btn-delete").addEventListener("click", () => {
      removeTask(task.id);
      tracker();
      renderTasks();
    });

    //   Edit
    const editBtnEl = li.querySelector(".btn-edit");
    if (task.isCompleted) {
      editBtnEl.classList.add("hidden");
    } else {
      editBtnEl.classList.remove("hidden");
    }

    const editBtn = li.querySelector(".btn-edit");

    editBtn.addEventListener("click", () => {
      if (!task.isCompleted) {
        inputValue.value = task.text;
        removeTask(task.id);
        saveLocalStorage();
      }
    });

    //check task completed

    const checkbox = li.querySelector(".checkbox");

    checkbox.addEventListener("change", () => {
      task.isCompleted = checkbox.checked;
      // hide/show editing button
      renderTasks();
      tracker();
      if (checkbox.checked) {
        li.querySelector(".btn-edit").classList.add("hidden");
      } else {
        li.querySelector(".btn-edit").classList.remove("hidden");
      }
    });

    return li;
  }

  // delete task function

  function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveLocalStorage();
    renderTasks();
  }

  function loadFromLocalStorage() {
    const raw = localStorage.getItem("tasks");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        tasks = parsed;
        tracker();
      }
    } catch {
      tasks = [];
    }
  }

  // init

  inputValue.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });

  function celebrate() {
    const count = 200,
      defaults = {
        origin: { y: 0.7 },
      };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
});
