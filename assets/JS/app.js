document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    // Charger les tâches depuis le localStorage
    function loadTasks() {
        const tasks = localStorage.getItem('tasks');
        const taskArray = tasks ? JSON.parse(tasks) : [];

        taskArray.forEach(function(task) {
            addTaskToDOM(task);
        });
    }

    // Sauvegarder les tâches dans le localStorage
    function saveTasksToLocalStorage(tasks) {
        const tasksString = JSON.stringify(tasks);
        localStorage.setItem('tasks', tasksString);
    }

    // Ajouter une tâche au DOM
    function addTaskToDOM(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'note-task fade-in';
        taskDiv.setAttribute('data-id', task.id);

        const closeIcon = document.createElement('div');
        closeIcon.className = 'close-icon';
        closeIcon.title = 'Close';
        closeIcon.innerHTML = '<i class="bi bi-x-circle"></i>';
        taskDiv.appendChild(closeIcon);

        const textDiv = document.createElement('div');
        textDiv.className = 'text-task';
        textDiv.innerHTML = `<p>${task.text}</p>`;
        taskDiv.appendChild(textDiv);

        const dateDiv = document.createElement('div');
        dateDiv.className = 'date-container';
        dateDiv.textContent = task.date;
        taskDiv.appendChild(dateDiv);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'hour-container';
        timeDiv.textContent = task.time;
        taskDiv.appendChild(timeDiv);

        // Gestionnaire pour supprimer la tâche
        closeIcon.addEventListener('click', function() {
            removeTask(task.id);
        });

        // Ajouter l'élément au conteneur
        taskList.appendChild(taskDiv);

        // Supprimer l'animation après un certain temps
        setTimeout(function() {
            taskDiv.classList.remove('fade-in');
        }, 500);
    }

    // Gestionnaire de soumission du formulaire
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskDescription = document.getElementById('taskDescription').value;
        const endDateTime = document.getElementById('endDateTime').value;

        if (taskDescription === '' || endDateTime === '') {
            alert('Veuillez remplir tous les champs');
            return;
        }

        const [date, time] = endDateTime.split('T');

        const task = {
            id: Date.now(),
            text: taskDescription,
            date: date,
            time: time
        };

        addTaskToDOM(task);

        let tasks = localStorage.getItem('tasks');
        tasks = tasks ? JSON.parse(tasks) : [];
        tasks.push(task);
        saveTasksToLocalStorage(tasks);

        taskForm.reset();
    });

    // Supprimer une tâche
    function removeTask(taskId) {
        const taskDiv = document.querySelector(`.note-task[data-id='${taskId}']`);
        if (taskDiv) {
            taskDiv.remove();
        }

        let tasks = localStorage.getItem('tasks');
        tasks = tasks ? JSON.parse(tasks) : [];
        tasks = tasks.filter(function(task) {
            return task.id !== parseInt(taskId);
        });
        saveTasksToLocalStorage(tasks);
    }

    // Charger les tâches au démarrage
    loadTasks();
});
