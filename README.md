# Pinature ![image](https://i.imgur.com/xgKPjc0.jpeg)


Pinature is a full stack application clone, inspired by [Pinterest](https://www.pinterest.com/). Pinature allows users to create "pins" or more commonly known as posts, and "boards", which are a collection of saved pins so that users can organize their ideas in a folder and build full sets of inspirations.


# Wiki Links

[FEATURE LIST] (https://github.com/MatthewLi154/pinature-capstone-project/wiki/Features-List)

Details of specific feature functionality of the application

[DATABASE SCHEMA] (https://github.com/MatthewLi154/pinature-capstone-project/wiki/Database-Schema-and-Backend-Routes)

Overview of the database schema of the application.

[User Stories] (https://github.com/MatthewLi154/pinature-capstone-project/wiki/User-Stories)

Details of expected output for each feature as a user.

## Built With

Frameworks, Platforms and Libraries

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)


Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

HOSTING:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


# Getting Started

## Instructions on how to run this website locally
-Git Clone Repo

-In the root directory, run the following installs:
```
pipenv install pytest
pipenv install pycodestyle
pipenv install pylint
pipenv install rope
pipenv install flask
pipenv install flask-sqlalchemy
pipenv install alembic
pipenv install flask-migrate
pipenv install python-dotenv
pipenv install sqlalchemy
pipenv install wtforms
pipenv install flask-wtf
pipenv install flask-socketio
pipenv install eventlet==0.30.2
pipenv install boto3
```

-In the "react-app" directory, run the following installs:
```
npm install
npm install socket.io-client
```
-Create a .env file in the root of your backend directory to replicate the env.example file. 

-In the root directory, after completing all the installs, run the following commands:
```
pipenv shell
flask run
```

-In the "react-app" directory, after completing all the installs, run the following command: 
```
npm start
```

-The website will not function unless BOTH root-directory(backend) and react-app(frontend) are both running at the same time. 

## Landing Page

Landing page for a non-signed in user. 

![image](https://i.imgur.com/KnAMZZJ.jpeg)

Landing page for a signed-in user. Once signed-in, you are able to browse through all the users in the database. 

![image](https://i.imgur.com/xgKPjc0.jpeg)

When logged in, you can create a pin by uploading a photo and entering text in the required input fields.

![image](https://i.imgur.com/zXFuORV.png)

To create a board, click on the drop down menu to access the create board modal.

![image](https://i.imgur.com/70L8lB1.png)

When a board is created, it can start saving pins that the user wishes to organize. Pins can be saved to multiple boards if the user so wishes.

![image](https://i.imgur.com/Irdjxf7.png)

Users can see all the pins they've saved to a board by navigating to their profile page

![image](https://i.imgur.com/V8veFwN.png)

Users can also delete a pin or pins that they've saved if they feel like it doesn't fit the theme of the board anymore

![image](https://i.imgur.com/pe9R58j.png)
