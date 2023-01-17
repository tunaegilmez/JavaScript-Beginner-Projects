// Elements
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-todos");

eventListener();

function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearBtn.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function filterTodos(e) {
  //   console.log(e.target.value);
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}

function deleteTodo(e) {
  //   console.log(e.target);
  if (e.target.className === "fa fa-remove") {
    // console.log("Deleted");
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

    showAlert("success", "ToDo başarıyla silindi.");
  }
}

function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  let controller;
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    if (todo.toLowerCase() === newTodo.toLowerCase()) {
      controller = 0;
    } else {
      controller = 1;
    }
  });

  if (newTodo === "") {
    showAlert("danger", "Lütfen bir todo girin!");
  } else {
    if (controller) {
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert("success", `Yeni ToDo ${newTodo}`);
    } else {
      showAlert("danger", "Aynı ToDo'dan bir tane olmalı.");
    }
  }

  e.preventDefault();
}

function getTodosFromStorage() {
  // Storagedan todoları alma.
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));

  //   console.log(getTodosFromStorage());
  //   console.log(newTodo);
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  todoList.appendChild(listItem);

  todoInput.value = "";
}
function showAlert(type, msg) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = msg;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500);
}
