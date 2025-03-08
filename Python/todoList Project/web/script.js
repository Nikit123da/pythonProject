
function toLogin()  //works
{
    window.location.href = "loginPage.html";
}

function toSignUp()//works
{
    window.location.href = "signUpPage.html";
}

async function addUsers() {//works, I think
    let password = document.getElementById("password").value;
    let userName = document.getElementById("userName").value;

    try {

        let executionMessage = await eel.insertUsers(userName, password)();

        userCreationNitification(executionMessage);

        return executionMessage;  

    } catch (error) {
        console.error("Error communicating with the backend:", error);
        userCreationNitification("An error occurred. Please try again.");
        return "An error occurred";  
    }
}
//two issues to adress
//1: the matching of passwords when creating a new user ✅
//2: the existance of the user that someone tries to create✅
async function changeFromSingUpWindow() {//works
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("passwordCheck").value;
    let isMatch;

    if(password.trim() !== "" && passwordCheck.trim() !== "" && userName.trim() !== "")
    {
        isMatch = await eel.checkPassword(password, passwordCheck)(); 
        console.log("there is password and checkpassword");
    }

    else
    {
        userCreationNitification("Fill all of the fields please")
    }

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

async function userCreationNitification(messege)  //works  
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

function showWelcomeMessage(username) { //works
    const message = document.getElementById("welcomeMessage");
    message.textContent = `Welcome back, ${username}!`;
    message.classList.add("welcome-animate");
}

async function enterHomePage() //works
{
    let loginUsername = document.getElementById("loginuserName").value;
    let loginPassword = document.getElementById("loginpassword").value;

    localStorage.setItem("loginUserName",loginUsername);
    localStorage.setItem("loginUserPassword",loginPassword);

    let userExists = await eel.userExists(loginUsername,loginPassword)();

    console.log(userExists);

    if(userExists == true)
    {
        showWelcomeMessage(loginUsername);

        setTimeout(() => {
            window.location.href = "homePage.html";
        },2000);
    }

    else
    {
        userCreationNitification("User doesn't exist");
    }
}

function inputTask() //works
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

async function addTask() { //works
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

    let logPass = localStorage.getItem("loginUserPassword");
    let logName = localStorage.getItem("loginUserName");
    localStorage.setItem("task",taskInput.value);
    
    await eel.insertTasksIntoDatabase(logName, logPass, taskInput.value); //passes null values  
    
    // Clear the input field
    taskInput.value = "";
}

function createTaskWindow(taskText) { //works
    let newTask = document.createElement("div");
    let text = document.createElement("p");
    let checkbox = document.createElement("input");

    text.innerText = taskText;
    checkbox.type = "checkbox";

    newTask.appendChild(checkbox);
    newTask.appendChild(text);

    return newTask;
}

document.addEventListener("DOMContentLoaded", function () {
    let scrollBar = document.getElementById("scroll_window");

    if (!scrollBar) {
        console.error("scroll_window not found!");
        return;
    }

    // Event delegation: listens for changes on checkboxes inside scroll_window
    scrollBar.addEventListener("change", function (event) {
        if (event.target.matches("input[type='checkbox']") && event.target.checked) {
            console.log("Checkbox checked, deleting task...");

            let parentDiv = event.target.parentElement;
            if (parentDiv) 
            {
                parentDiv.remove(); // Remove the task
                d();
            }
        }
    });
});

async function d() {
    await eel.deleteFromDatabase(localStorage.getItem("loginUserName"),
                                localStorage.getItem("loginUserPassword"),
                                localStorage.getItem("task"));
}