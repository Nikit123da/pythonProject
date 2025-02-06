function callPython() {
    let name = document.getElementById("name").value;
    
    eel.say_hello(name)(function(response) 
    {
        document.getElementById("output").innerText = response;
    }
);
}
