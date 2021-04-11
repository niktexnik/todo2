window.onload = function () {
  let todos = [];
  let form = document.forms.my;
  let total = document.getElementById("total");
  let startId = 1000;

  const setTodos = (newTodos) => {
    todos = newTodos
  }

  const createTodo = (text) => {
    const newTodo = {
      id: startId++,
      title: text,
      done: false,
      important: false
    }

    setTodos([...todos, newTodo]);
  }

  const completeTodo = (todoId) => {
    const todoIndex = todos.findIndex((el) => el.id === todoId);
    const newTodo = todos[todoIndex];
    const done = newTodo.done;
    newTodo.done = !done;
    setTodos([...todos.slice(0, todoIndex), newTodo, ...todos.slice(todoIndex + 1)]);
  };

  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((el) => el.id === id);
    setTodos([...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)]);
  }

  const handleComplete = (id) => {
    completeTodo(id)
    localStorage.setItem('todoing', JSON.stringify(todos));//localstorage
    renderTodoList(todos);
  }

  const handleDelete = (todoId) => {
    deleteTodo(todoId)
    localStorage.setItem('todoing', JSON.stringify(todos));//localstorage
    renderTodoList(todos);
  }

  const renderTodoList = (todosCollection) => {
    let todoList = document.getElementById("list");
    todoList.innerHTML = '';
    if (todosCollection.length === 0) {
      let emptyResultsSpan = document.createElement("span")
      emptyResultsSpan.textContent = 'Please add your first item...'
      todoList.appendChild(emptyResultsSpan)
    }
    todosCollection.map((todo) => {
      const title = todo.title;
      const todoId = todo.id;
      const doneClass = todo.done ? 'done' : ''
      const completeBtnClass = todo.done ? 'fa-check-circle' : 'fa-check-circle-o';

      let todoListItem = document.createElement("li");
      let deleteBtn = document.createElement("button");
      let copmleteBtn = document.createElement("button");

      deleteBtn.className = "btn btn-outline-danger btn-sm float-right fa fa-trash-o";
      deleteBtn.addEventListener("click", (event) => handleDelete(todoId))

      copmleteBtn.className = `btn btn-outline-success btn-sm float-right fa ${completeBtnClass}`
      copmleteBtn.addEventListener("click", (event) => handleComplete(todoId))

      todoListItem.className = `list-group-item ${doneClass}`;
      todoListItem.textContent = title;
      todoListItem.appendChild(copmleteBtn);
      todoListItem.appendChild(deleteBtn);

      todoList.appendChild(todoListItem);
    })

    total.innerHTML = todos.length;
  }

  let todosFromLocalStorage = [];
  try {todosFromLocalStorage = JSON.parse(localStorage.getItem('todoing'))} catch {}

  if (Array.isArray(todosFromLocalStorage) && todosFromLocalStorage.length > 0) {
    setTodos(todosFromLocalStorage);
  }

  renderTodoList(todos);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById('maininput');
    createTodo(input.value);
    input.value = '';
    localStorage.setItem('todoing', JSON.stringify(todos))
    renderTodoList(todos);
  })
}