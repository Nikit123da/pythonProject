function callPython() {
    let name = document.getElementById("name").value;
    
    eel.say_hello(name)(function(response) 
    {
        document.getElementById("output").innerText = response;
    }
);
}

async function checkPassword() { //async funcs are great because they wait for a spesific outside function to finish before they return an answear
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("passwordCheck").value;

    
    let isMatch = await eel.checkPassword(password, passwordCheck)();

    if (isMatch) {
        document.getElementById("signUpContainer").classList.add("slide-out");

        setTimeout(() => {
            window.location.href = "loginPage.html";
        }, 500);

        setTimeout(() => {
            document.getElementById("loginContainer").classList.add("slide-in");
        }, 1000); 



        
    } else {
        console.log("Passwords do not match");
    }
}