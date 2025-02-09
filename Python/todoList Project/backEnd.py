import eel 

import mysql.connector
from mysql.connector import connect


eel.init("C:\\Users\\97254\\Desktop\\Michlala\\Python\\todoList Project\\web")

@eel.expose

def checkPassword(param1, param2):
    if param1 == param2:
        return True
    return False


mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "Bnz635htru1",
    database = "pythonproject",
)

@eel.expose
def insertUsers(userName, userPassword):
    cursor = mydb.cursor()

    insert_user_query = """
    INSERT INTO user (userName, userPassword)
    VALUES
        (%s,%s)
    """ 

    check_for_existing_user_in_query = """
    SELECT * FROM user
    WHERE userName = %s AND userPassword = %s
    """

    cursor.execute(check_for_existing_user_in_query, (userName,userPassword))

    existing_user = cursor.fetchone()

    if existing_user:
        result = 'The user already exists'

    else:
        cursor.execute(insert_user_query, (userName, userPassword))
        mydb.commit()
        result = "User added successfully"
        
    return result



if mydb.is_connected():
    print(f"Successfully connected to MySQL database {0}", format(mydb.database))
else:
    print("Connection failed")

eel.start("signUpPage.html", size=(1000, 1000),port=8000)