var tasks = [];

function addTask() {
    var taskInput = document.getElementById("input-task");
    var taskName = taskInput.value;

    if (taskName) {
        var newTask = {
            name: taskName,
            completed: false,
            createdAt: new Date()
        };

        tasks.push(newTask);

        taskInput.value = "";

        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    var pendingTasks = document.getElementById("pending-tasks");
    var completedTasks = document.getElementById("completed-tasks");

    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach(function(task, index) {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerText = task.name;
        li.appendChild(span);

        var buttonComplete = document.createElement("button");
        // buttonComplete.innerText = "Complete";
        buttonComplete.classList.add("fa-check")
        buttonComplete.classList.add("fa-solid")
        buttonComplete.classList.add("completedBtn")
        
        buttonComplete.addEventListener("click", function() {
            tasks[index].completed = true;
            saveTasks();
            renderTasks();
        });
        li.appendChild(buttonComplete);

        var buttonEdit = document.createElement("button");
        buttonEdit.classList.add("fa-pen-to-square")
        buttonEdit.classList.add("fa-solid")
        buttonEdit.classList.add("editBtn")
        buttonEdit.addEventListener("click", function() {
            var input = document.createElement("input");
            input.type = "text";
            input.value = task.name;
            input.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    tasks[index].name = input.value;
                    saveTasks();
                    renderTasks();
                }
            });
            var buttonSave = document.createElement("button");
            // buttonSave.innerText = "Save";
            buttonSave.classList.add("fa-solid")
            buttonSave.classList.add("fa-floppy-disk")
            buttonSave.classList.add("saveBtn")
            buttonSave.addEventListener("click", function() {
                tasks[index].name = input.value;
                saveTasks();
                renderTasks();
            });
            li.replaceChild(input, span);
            li.replaceChild(buttonSave, buttonEdit);
        });
        li.appendChild(buttonEdit);

        var buttonDelete = document.createElement("button");
        buttonDelete.classList.add("fa-trash")
        buttonDelete.classList.add("fa-solid")
        buttonDelete.classList.add("deleteBtn")
        buttonDelete.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        li.appendChild(buttonDelete);

        if (task.completed) {
            li.classList.add("completed");
            completedTasks.appendChild(li);
        } else {
            pendingTasks.appendChild(li);
        }
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasks();
