eel.expose(insertTasksIntoDatabase);

function toLogin()
{
    window.location.href = "loginPage.html";
}

function toSignUp()
{
    window.location.href = "signUpPage.html";
}

async function changeFromSingUpWindow() {
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("passwordCheck").value;
    let isMatch = await eel.checkPassword(password, passwordCheck)();

    if (isMatch) {
        let executionMessage = await addUsers();  

        if (executionMessage === "User added successfully") {
            setTimeout(() => {
                document.getElementById("signUpCard").classList.add("slide-out");

                window.addEventListener("DOMContentLoaded", () => {
                    let loginCard = document.getElementById("loginCard");
                    if (loginCard) {
                        loginCard.classList.add("slide-in");
                    }
                });

                window.location.href = "loginPage.html";
            }, 2000);
        }
    } else {
        console.log("Passwords do not match.");
    }
}

async function addUsers() {
    let password = document.getElementById("password").value;
    let userName = document.getElementById("userName").value;

    try {
        let executionMessage = await eel.insertUsers(userName, password)(); 

        if (executionMessage === "The user already exists") {
            userCreationNitification("The user already exists");
        } else {
            userCreationNitification("User added successfully");
        }

        return executionMessage;  
    } catch (error) {
        console.error("Error communicating with the backend:", error);
        userCreationNitification("An error occurred. Please try again.");
        return "An error occurred";  
    }
}

async function userCreationNitification(messege)    
{
    let toast = document.getElementById("toast");
    toast.textContent  = messege;

    console.log(toast.textContent);
    toast.classList.add("popUp");

    setTimeout(() => {
        toast.classList.add("popDown");

    }, 2000);
    
    setTimeout(() => {
        toast.classList.remove("popDown");
        toast.classList.remove("popUp");
    },2500);
    
    console.log("text:",toast.textContent);
}  

function showWelcomeMessage(username) {
    const message = document.getElementById("welcomeMessage");
    message.textContent = `Welcome back, ${username}!`;
    message.classList.add("welcome-animate");
}

async function enterHomePage()
{ 
    let password = document.getElementById("password").value;
    let userName = document.getElementById("userName").value;

    if(await eel.userExists(userName,password))
    {
        showWelcomeMessage(userName);

        setTimeout(() => {
            window.location.href = "homePage.html";
        },2000);

    }
}

function inputTask()
{
    let popup = document.getElementById("popUpWindow");
    let addBtn = document.getElementById("addButton");
    let close = document.getElementById("close");

    addBtn.onclick = function()
    {
        popup.style.display = "flex";
    }

    close.onclick = function()
    {
        popup.style.display = "none";
    }
}       

async function addTask() {
    let scrollBar = document.getElementById("scroll_window");
    let popup = document.getElementById("popUpWindow");
    let taskInput = document.getElementById("taskText");

    let taskText = taskInput.value.trim(); // Get text from textarea

    if (taskText === "") {
        alert("Please enter a task!"); // Prevent empty tasks
        return;
    }

    console.log("Task added:", taskText);
    let newTask = createTaskWindow(taskText);
    newTask.classList.add("taskWindow");
    scrollBar.appendChild(newTask);

    
    // Hide popup
    popup.style.display = "none";
    
    await eel.insertTasksIntoDatabase("admin", 111111, taskInput.value);
    
    // Clear the input field
    taskInput.value = "";
}

function createTaskWindow(taskText) {
    let newTask = document.createElement("div");
    let text = document.createElement("p");
    let checkbox = document.createElement("input");

    text.innerText = taskText;
    checkbox.type = "checkbox";

    newTask.appendChild(checkbox);
    newTask.appendChild(text);

    return newTask;
}

function deleteTask()
{
        // Get the scroll bar container
        let scrollBar = document.getElementById("scroll_window");

        // Select all checkboxes within the scroll window
        let checkboxes = scrollBar.querySelectorAll("input[type='checkbox']");
    
        checkboxes.forEach(checkbox => {
            // If the checkbox is checked, remove its parent div
            if (checkbox.checked) {
                scrollBar.removeChild(checkbox.parentElement);
            }
        });
}

setInterval(() => 
{
    deleteTask();
},100);