import eel 

import mysql.connector
from mysql.connector import connect


eel.init("C:\\Users\\97254\\Desktop\\Michlala\\Python\\todoList Project\\web")

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "Bnz635htru1",
    database = "pythonproject",
)


@eel.expose
def checkPassword(param1, param2):
    return param1 == param2

@eel.expose
def userExists(userName, userPassword):
    cursor = mydb.cursor()
    check_for_existing_user_in_query = """
        SELECT * FROM user
        WHERE userName = %s AND userPassword = %s
        """

    cursor.execute(check_for_existing_user_in_query, (userName,userPassword))

    return cursor.fetchone()
    
@eel.expose
def insertUsers(userName, userPassword):
    cursor = mydb.cursor()

    insert_user_query = """
    INSERT INTO user (userName, userPassword)
    VALUES
        (%s,%s)
    """ 

    if userExists(userName,userPassword):
        result = 'The user already exists'

    else:
        cursor.execute(insert_user_query, (userName, userPassword))
        mydb.commit()
        result = "User added successfully"
        
    return result

def getUserID(userName,userPassword):
    cursor = mydb.cursor(dictionary=True)
    getUserID_query = """
                    select iduser from user where userName = %s and userPassword = %s
                    """
    cursor.execute(getUserID_query ,(userName,userPassword))

    user_id = cursor.fetchone()
    cursor.close()

    if user_id is None:
        return None  

    return user_id["iduser"]
    


@eel.expose
def insertTasksIntoDatabase(userName, userPassword, userTask): 
    userID = getUserID(userName, userPassword)
    if userID != None:
        
        cursor = mydb.cursor()
        insert_tasks_query = """
                        INSERT INTO usertasks (idusertasks, tasks) VALUES (%s, %s)
                            """
        cursor.execute(insert_tasks_query, (userID, userTask))
        mydb.commit()
        cursor.close()
    else:
        print("user id is None")

    

if mydb.is_connected():
    print(f"Successfully connected to MySQL database {0}", format(mydb.database))
else:
    print("Connection failed")

eel.start("homePage.html", size=(1000, 1000),port=8000)