window.onload = function () {
  let todos = [];
  let form = document.forms.my;
  let input = document.getElementById("maininput");
  let total = document.getElementById("total");
  let startId = 1;

  const handleComplete = (id) => {
    const todoIndex = todos.findIndex((el) => el.id === id);
    const newTodo = todos[todoIndex];
    const done = newTodo.done;
    newTodo.done = !done;
    todos = [...todos.slice(0, todoIndex), newTodo, ...todos.slice(todoIndex + 1)];
    renderTodoList(todos);
  }

  const renderTodoList = (todosCollection) => {
    let todoList = document.getElementById("list");
    todoList.innerHTML = '';

    todosCollection.map((todo) => {
      const title = todo.title;
      const todoId = todo.id;
      const doneClass = todo.done ? 'done' : ''
      const completeBtnClass = todo.done ? 'fa-check-circle' : 'fa-check-circle-o';

      let todoListItem = document.createElement("li");
      let deleteBtn = document.createElement("button");
      let copmleteBtn = document.createElement("button");

      deleteBtn.className = "btn btn-outline-danger btn-sm float-right fa fa-trash-o";
      deleteBtn.addEventListener("click", (event) => {
        const todoIndex = todos.findIndex((el) => el.id === todoId);
        todos = [...todos.slice(0, todoIndex), ...todos.slice(todoIndex + 1)]
        renderTodoList(todos);
      })

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

  renderTodoList(todos);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let str = input.value;
    input.value = '';

    createTodo(str)
  })

  function createTodo(text) {
    todos.push({
      id: startId++,
      title: text,
      done: false,
      important: false
    })

    renderTodoList(todos);
  }
}