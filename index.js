const addMessage = document.querySelector('.message')
const addButton = document.querySelector('.add')
const toDo = document.querySelector('.todo')

let toDoList = []

const addBtnHandler = () => {
  if(!addMessage.value) return alert('а ну-ка введи задачу!')
  let newToDo = {
    todo: addMessage.value,
    checked: false,
    important: false
  }

  toDoList.push(newToDo)
  displayMessages()
  localStorage.setItem('toDo', JSON.stringify(toDoList))
  addMessage.value = ''
}

addButton.addEventListener('click', addBtnHandler)

const displayMessages = () => {
  let displayMessage = ''
  if (toDoList.length === 0) toDo.innerHTML = ''
  toDoList.forEach((elem, index) => {
    displayMessage += `
    <li>
      <input type ='checkbox' id ='item_${index}' ${elem.checked ? 'checked' : ''}>
      <label for ='item_${index}' class="${elem.important ? 'important' : ''}">${elem.todo}</label>
    </li>
    `
    toDo.innerHTML = displayMessage
  })
}

if (localStorage.getItem('toDo')) {
  toDoList = JSON.parse(localStorage.getItem('toDo'))
  displayMessages()
}

const toDoChange = e => {
  let idInput = e.target.getAttribute('id')
  let forLabel = toDo.querySelector('[for =' + idInput + ']')
  let valueLabel = forLabel.textContent

  toDoList.forEach((elem) => {
    if (elem.todo === valueLabel) {
      elem.checked = !elem.checked
      localStorage.setItem('toDo', JSON.stringify(toDoList))
    }
  })
};

toDo.addEventListener('change', toDoChange);
toDo.addEventListener('contextmenu', e => {
  e.preventDefault()
  toDoList.forEach((elem, index) => {
    if (elem.todo === e.target.textContent) {
      if (e.ctrlKey || e.metaKey) {
        toDoList.splice(index, 1)
      } else {
        elem.important = !elem.important
      }
      displayMessages()
      localStorage.setItem('toDo', JSON.stringify(toDoList))
    }
  })
});