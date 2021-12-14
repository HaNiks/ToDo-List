const root = document.querySelector("#root")

let todos = []
let complited = []
let completedTasks = 0

const divTitle = createElement(
  "div",
  "d-flex justify-content-center pb-2 border-bottom border-danger border-2 text-danger",
  "",
  ""
)

const title = createElement("h2", "", "ToDo LIST", "")
const header = createHeader()
const main = createMain()
const todoList = createTodoList(todos)
header.addEventListener("click", (event) => onHeaderClick(event))
main.addEventListener("click", (event) => onMainClick(event))

divTitle.append(title)
root.append(
  divTitle,
  header,
  main,
  `All: ${todos.length}`,
  ` Completed: ${completedTasks}`,
  todoList
)

// HANDLERS
const onHeaderClick = (event) => {
  switch (event.target.id) {
    case "buttonAdd":
      if (event.target.previousElementSibling.value !== "") {
        const todo = {
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          text: event.target.previousElementSibling.value,
          isCompleted: false,
          date: new Date().toLocaleDateString(),
        }
        event.target.previousElementSibling.value = ""
        todos.push(todo)
        renderTodos(todos)
        break
      } else {
        document.getElementById("field").focus()
        break
      }
    case "buttonDelete":
      todos.length = 0
      completedTasks = 0
      renderTodos(todos)
      break

    case "buttonDeleteLast":
      const lastElement = todos.pop()
      if (lastElement.isCompleted === true) {
        completedTasks--
      }
      renderTodos(todos)
      break
  }
}

const onMainClick = (event) => {
  switch (event.target.id) {
    case "showCompleted":
      onComplitedClick(todos)
      renderTodos(complited)
      break

    case "showAll":
      createTodoList(todos)
      renderTodos(todos)
      break
  }
}

const onComplitedClick = (todo) => {
  const arr = todo.filter((event) => event.isCompleted === true)
  complited = arr
  return complited
}
// ELEMENT--------------------------------------------
function createElement(tag, className, text = "", id = "") {
  const element = document.createElement(tag)
  element.className = className
  element.textContent = text
  element.id = id
  return element
}

//  HEARER--------------------------------------------
function createHeader() {
  const header = createElement("header", "d-flex align-items-center gap-2")
  const input = createElement("input", "form-control flex-grow-1", "", "field")
  const buttonAdd = createElement("button", "btn btn-outline-danger", "Add", "buttonAdd")
  const buttonDelete = createElement("button", "btn btn-danger", "Delete All", "buttonDelete")
  const buttonDeleteLast = createElement(
    "button",
    "btn btn-danger",
    "Delete Last",
    "buttonDeleteLast"
  )
  header.append(buttonDelete, buttonDeleteLast, input, buttonAdd)
  return header
}

// MAIN---------------------------------------------------
function createMain() {
  const buttonShowAll = createElement("button", "btn btn-outline-danger", "Show All", "showAll")
  const buttonShowCompleted = createElement(
    "button",
    "btn btn-outline-danger",
    "Show Completed",
    "showCompleted"
  )
  const main = createElement(
    "div",
    "d-flex align-items-center justify-content-around gap-3",
    "",
    ""
  )
  const input = createElement("input", "form-control flex-grow-1 w-50", "", "search")
  input.addEventListener("change", (e) => {
    const arr = todos.filter((value) => value.text === e.target.value)
    renderTodos(arr)
    e.target.value = ""
    return arr
  })
  main.append(buttonShowAll, buttonShowCompleted, input)
  return main
}

// create ToDo List---------------------------------------------------
function createTodoList(todos) {
  const list = createElement("div", "d-flex flex-column gap-2")
  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo)
    list.append(todoItem)
  })
  return list
}

// ELEMENT TODO-------------------------------------
function createTodoItem(todo) {
  const classInputOn =
    "d-flex align-items-center gap-1 border border-danger py-2 px-4 rounded-3 bg-danger text-white text-break"
  const classInputOff =
    "d-flex align-items-center gap-1 border border-danger py-2 px-4 rounded-3 text-break"
  let todoItem
  if (todo.isCompleted) {
    todoItem = createElement("div", classInputOn, "", todo.id)
  } else {
    todoItem = createElement("div", classInputOff, "", todo.id)
  }
  const input = createElement("input", "", "", "")
  input.type = "checkbox"
  input.checked = todo.isCompleted
  const text = createElement("span", "flex-grow-1 px-2", todo.text)
  const buttonDelete = createElement("butoon", "btn btn-close", "", "")
  buttonDelete.id = todo.id
  const date = createElement("span", "badge bg-secondary mx-2", todo.date)
  todoItem.addEventListener("input", () => {
    if (input.checked) {
      todo.isCompleted = true
      completedTasks++
      todoItem.className = classInputOn
      renderTodos(todos)
    } else {
      todo.isCompleted = false
      completedTasks--
      todoItem.className = classInputOff
      renderTodos(todos)
    }
  })
  buttonDelete.addEventListener("click", () => {
    const arr = todos.filter((event) => event.id !== todo.id)
    if (todo.isCompleted === true) {
      completedTasks--
      todos = arr
      renderTodos(todos)
      return todos
    } else {
      todos = arr
      renderTodos(todos)
      return arr
    }
  })

  todoItem.append(input, text, date, buttonDelete)
  return todoItem
}

function renderTodos(arr) {
  const todoList = createTodoList(arr)
  root.innerHTML = ""
  root.append(
    divTitle,
    header,
    main,
    `All: ${todos.length}`,
    ` Completed: ${completedTasks}`,
    todoList
  )
}
