async function changeWindow() {
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("passwordCheck").value;

    console.log("Passwords:", password, passwordCheck);

    let isMatch = await eel.checkPassword(password, passwordCheck)();
    console.log("Password Match:", isMatch);

    if (isMatch) {
        console.log("Sliding out sign-up card...");
        addUsers();
        document.getElementById("signUpCard").classList.add("slide-out");


            console.log("Sliding in login card...");
            window.addEventListener("DOMContentLoaded", () => {
                const loginCard = document.getElementById("loginCard");
                if (loginCard) {
                    loginCard.classList.add("slide-in");
                }
            });
            console.log("Redirecting to login page...");
            window.location.href = "loginPage.html";

    } else {
        console.log("Passwords do not match.");
    }
}

async function addUsers()
{
    let password = document.getElementById("password").value;
    let userName = document.getElementById("userName").value

    await eel.insertUsers(userName,password);
}

