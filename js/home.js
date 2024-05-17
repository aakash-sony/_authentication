class TODOObject {
    constructor(status, curDate, todoList) {
        this.status = status;
        this.todoList = todoList;
        this.curDate = curDate;
    }
};

class TODO {
    constructor(unqID, title, description, priority) {
        this.unqID = unqID;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }
};

var initialTodoCount = 0;

function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    var dateString = day + '/' + month + '/' + year;
    return dateString;
}

function displayLastLoggedInDate() {
    var lastLoggedInDate = getCurrentDate();
    var lastLoggedInElement = document.getElementById('last-logged');
    lastLoggedInElement.textContent = 'Last Logged in: ' + lastLoggedInDate;
}

window.onload = function () {
    displayLastLoggedInDate();
    addTODO();
    displayTodosAsTiles();
};

function addTODO() {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var addBtn = document.getElementById("add-todo-btn");
    var submitBtn = document.getElementById("submitBtn");
    var addMoreBtn = document.getElementById("addMore");

    // Get the <span> element that closes the modal
    var close = document.getElementById("close");

    // When the user clicks the button, open the modal 
    addBtn.onclick = function () {
        modal.style.display = "block";
    }

    addMoreBtn.onclick = function () {
        var todoInputs = document.getElementById('todo-inputs');
        var inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');

        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Title';
        titleInput.tagName = "title";
        titleInput.name = 'title';
        titleInput.className = 'input-box';

        var descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Description';
        titleInput.tagName = "description";
        descriptionInput.name = 'description';
        descriptionInput.className = 'input-box';

        var prioritySelect = document.createElement('select');
        prioritySelect.tagName = "option";
        prioritySelect.style.backgroundColor = "#FFFFFF";
        prioritySelect.style.color = "#000000";
        var options = ['Critical', 'High', 'Medium', 'Low'];
        options.forEach(function (option) {
            var optionElement = document.createElement('option');
            optionElement.textContent = option;
            prioritySelect.appendChild(optionElement);
        });

        inputContainer.appendChild(titleInput);
        inputContainer.appendChild(descriptionInput);
        inputContainer.appendChild(prioritySelect);

        todoInputs.appendChild(inputContainer);
        var space = document.createElement('div');
        space.style.height = 2;
        space.style.backgroundColor = "#a52a2a";
        space.style.marginTop = 8;
        todoInputs.appendChild(space);
    }

    submitBtn.onclick = function () {

        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        var todoObj = new TODOObject("Not Started", getCurrentDate(), []);
        // Retrieve all input containers
        var inputContainers = document.querySelectorAll('.input-container');

        // Loop through each input container to get the values
        inputContainers.forEach(function (container) {
            var title = container.querySelector('input[name="title"]').value;
            var description = container.querySelector('input[name="description"]').value;
            var priority = container.querySelector('select').value;

            // Create a new object to store the todo data

            var todo = new TODO(generateUnqID(), title, description, priority)
            todoObj.todoList.push(todo);
        });

        // Add the new todo to the array
        todos.push(todoObj);

        // Store the updated todos array back to local storage
        localStorage.setItem('todos', JSON.stringify(todos));
        modal.style.display = "none";
    }

    // When the user clicks on <span> (x), close the modal
    close.onclick = function () {
        modal.style.display = "none";
        initialTodoCount = document.querySelectorAll('.input-container').length;

        var inputContainers = document.querySelectorAll('.input-container');
        inputContainers.forEach(function (container, index) {

            if (index != 0 && index < initialTodoCount) {
                container.remove();
            }
        });
        clearModal();
    }
}

function clearModal() {
    var inputContainer = document.querySelectorAll('.input-container')[0];

    // Get all direct children of the parent element
    var children = inputContainer.children;
    // Loop through each child element
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        // Check if the child element is an input or select element
        if (child.id === 'title' || child.id === 'desc' || child.id === 'select' || child.id === 'line') {
            // Clear the value of the input or select element
            if (child.id === 'select') {
                child.value = "Critical";
            } else if (child.id === 'line') {
                child.remove();
            }
            else {
                child.value = '';
            }
        }
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function generateUnqID() {
    return 'id_' + Date.now() + Math.floor(Math.random() * 1000);
}

function displayTodosAsTiles() {
    var todoContainer = document.getElementById('todo-container');
    todoContainer.innerHTML = ''; // Clear existing content

    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    for (var i = 0; i < todos.length; i++) {
        var todoObj = todos[i];

        // Create a tile for the todo object
        var todoTile = document.createElement('div');
        todoTile.classList.add('todo-tile');

        var titleElement = document.createElement('h3');
        titleElement.textContent = todoObj.curDate; // You may want to customize this

        // Create a container for todo items
        var todoItemsContainer = document.createElement('div');
        todoItemsContainer.classList.add('todo-items-container');

        // Loop through todo items of the current todo object
        for (var j = 0; j < todoObj.todoList.length; j++) {
            var todo = todoObj.todoList[j];

            // Create elements for each todo item
            var todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            var todoDetailsContainer = document.createElement('div');
            todoDetailsContainer.classList.add('todo-details-container');

            var todoTitle = document.createElement('p');
            todoTitle.textContent = 'Title: ' + todo.title;

            var todoDescription = document.createElement('p');
            todoDescription.textContent = 'Description: ' + todo.description;

            // Create a container for the priority
            var todoPriorityContainer = document.createElement('div');
            todoPriorityContainer.classList.add('todo-priority-container');

            var todoPriority = document.createElement('p');
            todoPriority.textContent = todo.priority;
            todoPriority.style.fontWeight = "bold";
            todoPriority.classList.add('todo-priority');

            // Append the title and description to the details container
            todoDetailsContainer.appendChild(todoTitle);
            todoDetailsContainer.appendChild(todoDescription);

            // Append the details container and priority container to the todo item
            todoItem.appendChild(todoDetailsContainer);
            todoItem.appendChild(todoPriorityContainer);

            // Append the priority to the priority container
            todoPriorityContainer.appendChild(todoPriority);

            // Append the todo item to the container for todo items
            todoItemsContainer.appendChild(todoItem);
        }

        // Append title and todo items container to the todo tile
        todoTile.appendChild(titleElement);
        todoTile.appendChild(todoItemsContainer);

        // Create a container for the icons
        var tileFooter = document.createElement('div');
        tileFooter.classList.add('tile-footer');

        var editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit', 'edit-icon');

        var deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

        // Append icons to the tile footer
        tileFooter.appendChild(editIcon);
        tileFooter.appendChild(deleteIcon);

        // Append tile footer to the todo tile
        todoTile.appendChild(tileFooter);

        // Append the todo tile to the main container
        todoContainer.appendChild(todoTile);
    }
}