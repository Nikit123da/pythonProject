async function changeWindow() {
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
