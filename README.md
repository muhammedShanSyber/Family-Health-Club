## Setting up the Environment

### Softwares to install on the system ( Linux , Windows )

Install [@VSCode](https://code.visualstudio.com/), Web browser ( firefox , chrome ), [@MongoDB](https://www.mongodb.com/try/download/community) and [@MongoDB Compass](https://www.mongodb.com/try/download/compass)

Install npm , npx and NodeJS

Make sure MongoDB is running in ```localhost:27017```
and make sure MongoDB is connected to MongoDB Compass. 

## Setting up the React Web Application

Download or clone the Github project. Unzip and move to the project directory (Family-Health-Club) or move to the project directory if you cloned it. 

Open the terminal / Command Prompt and type : ```npm install ```

Above Command will install all the dependencies need for the web application inorder to run. After all the dependencies are installed , type : ``` npm run dev ```

The server will running on port 3002 and frontend will be running on ```http://localhost:5173```

Database and Collections will be created automatically once the web application started. Open your browser and goto url : ```http://localhost:5173```

Doctor and Patient password is encrypted using bcrypt. 

## Setting up the Admin Account

You can also use [@mongosh](https://www.mongodb.com/docs/mongodb-shell/) command line tool instead of Mongodb Compass.
Launch MongoDB Compass / mongosh and check the database named : ```thefamilyhub```
and select the collection name called admins add data : 

```
{
  "username": "<your_admin_username>",
  "password": "<your_admin_password>"
}
```

Enter the username and password of the Admin account you want in <your_admin_username> and <your_admin_password>

Restart the Web application(including the server) after saving the data in the MongoDB Compass.