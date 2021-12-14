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

divTitle.append(title)

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

  main.append(buttonShowAll, buttonShowCompleted, input)
  return main
}
