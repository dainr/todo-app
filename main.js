let todoItems = [];
const form = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');

function displayTodo(todo) {
    localStorage.setItem('TODO', JSON.stringify(todoItems));

    const todoList = document.querySelector('.todo-list');
    const listItem = document.querySelector(`[data-key='${todo.id}']`);
    const isChecked = todo.checked ? 'done' : '';
    const node = document.createElement('li');

    if (todo.deleted) {
        listItem.remove();
        return;
    }

    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick"></label>
    <span>${todo.text}</span>
    <i class="fas fa-trash delete-todo"></i>
    `;

    if (listItem) {
        todoList.replaceChild(node, listItem);
    } else {
        todoList.append(node);
    }
};


function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };

    todoItems.push(todo);
    displayTodo(todo);
}


function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked;
    displayTodo(todoItems[index]);
}

//delete function
function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };

    todoItems = todoItems.filter(item => item.id !== Number(key));
    displayTodo(todo);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('.todo-input');
    const inputField = input.value.trim();

    if (inputField !== '') {
        addTodo(inputField);
        input.value = '';
        input.focus();
    }
});

// listen for click on list item to toggle done or not
todoList.addEventListener('click', (e) => {

    //toggle done or not
    if (e.target.classList.contains('tick')) {
        const itemKey = e.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    //delete
    if (e.target.classList.contains('delete-todo')) {
        const itemKey = e.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const storage = localStorage.getItem('TODO');

    if (storage) {
        todoItems = JSON.parse(storage);
        todoItems.forEach((todo) => {
            displayTodo(todo);
        });
    };
});