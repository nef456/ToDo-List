const $ = selector => document.querySelector(selector);


const addItem = () => {
    const item = $("#taskInput").value.trim();
    if (item) {
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        listItem.innerHTML = `
            <input type="checkbox" class="complete">
            <span class="task-text">${item}</span>
            <button class="delete-button">Delete</button>
            <button class="edit-button">Edit</button>
        `;
        $("#taskList").appendChild(listItem);
        $("#taskInput").value = "";
    }
};

$("#taskList").addEventListener("click", e => {
    //Show me which event was clicked.
    console.log(e.target);
    //If the target event contains edit-button, then find the closest task-item and get the task-text element.
    if (e.target.classList.contains("edit-button")) {
        const listItem = e.target.closest(".task-item");
        const taskText = listItem.querySelector(".task-text");
        //Set the original text to a variable and replace the task-text with an input field containng the original text.
        const original = taskText.textContent;
        taskText.innerHTML = `<input type="text" value="${original}">`;
        //Focus the input field and add an event listener for when the user presses enter. Also create a save button and an event listener for when the user clicks it. If the user presses escape, revert to the original text.
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.className = "save-button";
        taskText.appendChild(saveButton);
        const input = taskText.querySelector("input");
        input.focus();
        input.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                taskText.textContent = input.value;
            } else if (e.key === "Escape") {
                taskText.textContent = original;
            } 
        });

        saveButton.addEventListener("click", () => {
            taskText.textContent = input.value;
            saveButton.remove();
        });
    }
    if (e.target.classList.contains("delete-button")) {
        const listItem = e.target.closest(".task-item");
        listItem.remove();
    }
});
   

$("#addTaskButton").addEventListener("click", addItem);
$("#taskInput").addEventListener("keydown", e => { if (e.key === "Enter") addItem(); });

