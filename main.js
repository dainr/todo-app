function todo() {
    const getTodo = document.getElementById('todo');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', function() {
        console.log(getTodo.value);

        //add todo
        const todoList = document.getElementById('todo-list');
        const todoItem = document.createElement('li');
        const removeBtn= document.createElement('button');
        removeBtn.innerText = "Delete";
        removeBtn.id = 'remove';
        todoItem.className = "todo-item";

        todoItem.innerText = getTodo.value;

        todoItem.appendChild(removeBtn);
        todoList.appendChild(todoItem);


        // Remove todo
        removeBtn.addEventListener('click', () => {
            todoItem.remove();
        });

    });
   
}



todo();

    
    