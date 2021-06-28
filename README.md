# So Pekocko APIs

The following Application Progamming Interface (API) was created to allow a given user to create an account and login the web application.

This application allows users to create **sauces** and share them with other logged users. The users can **like** or **dislike** a sauce.

![alt text](https://github.com/AaronMillOro/AaronMillanOropeza_6_18062021/blob/master/so_peckocko_demo.gif)

## Frontend
The frontend side was provided and the original source code can be found [here](https://github.com/OpenClassrooms-Student-Center/dwj-projet6).

As indicated in the original repository, you need to install the specific versions of **NodeJS**, **Angular CLI** and **node-sass**. This adapted **[JSON file](https://github.com/AaronMillOro/AaronMillanOropeza_6_18062021/blob/master/frontend/package.json)** can be useful to install the required dependencies.

To work with different versions of NodeJS, I used the package [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) (for Node Version Manager). In this fashion, the frontend side can be run by typing:

```
nvm use 12.14.1
ng serve
```

Then, open in the web browser the :  **localhost:4200**

## Backend

The API was build using **NodeJS**, **Express** and **MongoDB**. Before running the server side of the app you need to install the required [NPM dependencies](https://github.com/AaronMillOro/AaronMillanOropeza_6_18062021/blob/master/backend/package.json).

In addition to that, in the folder **backend/** you need to create a file named '**.env**'. In that file you need to adapt the environment variables  (by replacing the values inside <>) :

```
PORT = <port>
MONGODB_URI = 'mongodb+srv://<user>:<password>@cluster0.ogklv.mongodb.net/<database_name>?retryWrites=true&w=majority'
TOKEN_KEY = '<YOUR_SECRET_KEY>'
```


Then type in a terminal:

```
npm start
```

### API feautures

The implemented routes are:

| Verb   | Parameter            | Request body                                            | Response                         | Function                                                                                                                                                                                                                                                         |
|--------|----------------------|---------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | /api/auth/signup     | email: string,  password: string                        | message: string                  | Creates an user account  in the MongoDB with the  encrypted password                                                                                                                                                                                             |
| POST   | /api/auth/login      | email: string,  password: string                        | userId: string token: string     | Verifies the correct password  and provides an authentication token required to use the app                                                                                                                                                                      |
| GET    | /api/sauces          | NA                                                      | Array with sauces                | Obtains the list of all  the sauces from the DB                                                                                                                                                                                                                  |
| GET    | /api/sauces/:id      | NA                                                      | The details of an specific sauce | Obtains the information of a single sauce with its DB identifier                                                                                                                                                                                                 |
| POST   | /api/sauces          | sauce: string image: file                               | message: string                  | Registers the information of a  new sauce and sets the number of likes and dislikes initially to zero. The list of user id's that likes and dislikes the sauce is  set to an empty array.                                                                        |
| PUT    | /api/sauces/:id      | sauce: string,  image: file  OR  JSON sauce information | message: string                  | Modifies the content of a selected sauce. The content can be the different fields or enven the sauce image.                                                                                                                                                      |
| DELETE | /api/sauces/:id      | NA                                                      | message: string                  | Deletes a sauce from the DB.                                                                                                                                                                                                                                     |
| POST   | /api/sauces/:id/like | like: number userId: string                             | message: string                  | Sets the preference of a sauce. The possible number values are: i) **'1'** for like, ii) **'0'** for no preference, and iii) **'-1'** for dislike.   The userId is stored an   specific field of the sauce model. This field can be one of the following  arrays: usersLiked or usersDisliked.  |


### Security feautures

Security measures were implemented in the conception of the API. These include:

 * The stored passwords  are encrypted
 * The generation of passwords is secured with a password validator
 * The potential errors can be captured and monitored
 * The MongoDB Atlas was setup with the possibilities to edit, modify and delete the content of the sauces table.
 * Authentification was implemented with a temporary token and all the routes require the authentication of this token.
 * When signing up, the email is unique for each user, a mongoose plug-in was adapted.
 * No cache is allowed in the app
 * Security was re-inforced with the 'helmet' package

Enjoy!

:shipit:
