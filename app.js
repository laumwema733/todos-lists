// const id = `task-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// console.log(id);
// ////////////////////////////////////////////
/*
document.addEventListener("DOMContentLoaded", () => {
  function addTask(event) {
    event.preventDefault();
    const taskText = inputEl.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.innerHTML = `
       <input
           type="checkbox" class='checkbox'/>
          <span class="text">${taskText}</span>
          <div id="btn-container">
              <button  class='btn-edit' data-action ='edit' data-id=''>edit</button>
              <button data-id='' class ='delete'>delete</button>
          </div>

    `;
    const checkbox = li.querySelector(".checkbox");
    // removing items
    li.querySelector(".delete").addEventListener("click", () => {
      li.remove();
    });

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.querySelector(".btn-edit").classList.add("hidden");
      } else {
        li.querySelector(".btn-edit").classList.remove("hidden");
      }
    });

    // Editing btn

    const editBtn = li.querySelector(".btn-edit");

    editBtn.addEventListener("click", () => {
      if (!checkbox.checked) {
        inputEl.value = li.querySelector("span").textContent;
        li.remove();
      }
    });

    li.setAttribute("class", "text");
    // li.textContent = taskText;
    listItems.appendChild(li);
    inputEl.value = "";
  }
  addBtn.addEventListener("click", addTask);

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });
});
*/
