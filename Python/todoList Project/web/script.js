function callPython() {
    let name = document.getElementById("name").value;
    
    eel.say_hello(name)(function(response) 
    {
        document.getElementById("output").innerText = response;
    }
);
}


async function changeWindow() {
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("passwordCheck").value;

    console.log("Passwords:", password, passwordCheck); // Check values

    let isMatch = await eel.checkPassword(password, passwordCheck)();
    console.log("Password Match:", isMatch); // Confirm result

    if (isMatch) {
        console.log("Sliding out sign-up card...");
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

