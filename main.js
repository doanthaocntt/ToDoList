window.addEventListener("load", function(e){
  const formToDo = document.querySelector("#new-task-form");
  const tasks = document.querySelector("#tasks");
  const btnDelete = document.querySelector(".delete");
  let todos = JSON.parse(localStorage.getItem("todoList")) || [];
  function reactTask(title){
    const template = `
    <div class="task">
        <div class="content">
          <input type="text" class="text" value="${title}" readonly/>
        </div>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
    </div>
    `;
    tasks.insertAdjacentHTML("beforeend", template);
  };
  function reactAlertSuccess(e){
    const template = `<div class="sweet-alert">
    <i class="fa fa-check sweet-icon"></i>
    <p class="sweet-text">Save Successful</p>
    </div>`;
    document.body.insertAdjacentHTML("beforeend", template);
  }
  if (Array.isArray(todos) && todos.length > 0){
    [...todos].forEach((item) => reactTask(item));
  }
  formToDo.addEventListener("submit", function(e){
    e.preventDefault();
    const task = this.elements["todo"].value;
    reactTask(task);
    todos.push(task);
    localStorage && localStorage.setItem("todoList", JSON.stringify(todos));
    this.elements["todo"].value = "";
    reactAlertSuccess();
  });
  tasks.addEventListener("click", function(e){
    if (e.target.matches(".delete")){
      const todo = e.target.parentNode.parentNode;
      todo.parentNode.removeChild(todo);
      const todoText = e.target.previousElementSibling.textContent;
      const index = todos.findIndex((item) => item === todoText);
      todos.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todos));
    }
  })
})