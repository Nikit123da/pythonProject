import eel 

eel.init("C:\\Users\\97254\\Desktop\\Michlala\\Python\\todoList Project\\web")

@eel.expose
def say_hello(name):
    print(f"Hello from Python, {name}!")
    return f"Hello, {name}! This is Python."

eel.start("mainWindow.html", size=(600, 400),port=8000)