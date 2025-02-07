import eel 

eel.init("C:\\Users\\97254\\Desktop\\Michlala\\Python\\todoList Project\\web")

@eel.expose
#TODO: MAKE THE checkPassword func work again.
#TODO: make the log in card fly from the kright to the middle.
def checkPassword(param1, param2):
    if param1 == param2:
        return True
    return False

eel.start("signUpPage.html", size=(1000, 1000),port=8000)