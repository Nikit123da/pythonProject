import eel 

import mysql.connector


eel.init("C:\\Users\\97254\\Desktop\\Michlala\\Python\\todoList Project\\web")

@eel.expose

def checkPassword(param1, param2):
    return param1 == param2

eel.start("signUpPage.html", size=(1000, 1000),port=8000)