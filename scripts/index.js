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

divTitle.append(title)
