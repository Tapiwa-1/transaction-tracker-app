## Transact Tracker Application
<p>An application to demonstrate my abilty to develop A mobile Application and merge it to allow communication with backend Service</p>
<img  src="/Screenshots/1.png"/> 

## Tech Stack
- React Native ( Frontend)
- Laravel ( Backend)
- Database (SQLite Database)

## Authentication and Authorization

<p>After a successful user login, a Bearer token is issued to the user, allowing access to protected routes within the application. This token is used for authentication and authorization in subsequent API requests. </p>

### How Authentication Works:

1. User Login


- The user submits valid credentials (email and password).
- The server verifies the credentials and, if valid, generates a JWT (JSON Web Token).

2. Token Issuance:

- The JWT is signed using a secret key and returned to the client.
- The token is stored securely (e.g., AsyncStorage, SecureStore, or an HTTP-only cookie).

3. Accessing Protected Routes:

- The token is included in the Authorization header of requests:

```
Authorization: Bearer <TOKEN>
```

- The server validates the token before granting access to protected resources.

## Database Transaction

<p>A database transaction is a sequence of operations performed as a single unit of work. It ensures data consistency and follows the ACID properties:
</p>


🔹 ACID Properties
- Atomicity: The transaction is all or nothing (either all changes are committed, or none).
- Consistency: Ensures that the database moves from one valid state to another.
- Isolation: Transactions do not interfere with each other.
- Durability: Once a transaction is committed, it remains permanent, even in case of a system crash

```
 $transaction = DB::transaction(function () use ($request) {
    return Transaction::create($request->all());
  });
```
## API documentation
I have Documentation all the API using postman <a href="https://documenter.getpostman.com/view/21190718/2sAYX9o1aF">Click Here</a>

<img  src="/Screenshots/8.png"/> 

## Features
- User Login
- User Register
- User Logout
- Add Transaction
- View Transaction
- Delete Transaction


## ScreenShots
| <img  src="/Screenshots/1.png"/> | <img  src="/Screenshots/3.png"/> |
| <img  src="/Screenshots/2.png"/> | <img  src="/Screenshots/4.png"/> |
| <img  src="/Screenshots/5.png"/> | <img  src="/Screenshots/6.png"/> |
| <img  src="/Screenshots/7.png"/> 

## Challenges
<p>The application was developed within a very short timeframe—just three days. This required me to think quickly and select the most suitable programming languages, frameworks, and tools to meet the project’s requirements efficiently.</p>

<p>As a backend developer with limited experience in mobile development, I had to learn React Native in just four hours to build the frontend. While I was able to grasp the fundamentals and quickly put together a working UI, integrating the frontend with the backend presented significant challenges.</p>

<p>One of the main difficulties I encountered was enabling seamless communication between the React Native frontend and the backend API. Issues such as handling authentication, managing state, and properly structuring API requests required additional debugging and adjustments</p>

<p>Additionally, I faced challenges with navigation in React Native, especially when implementing dynamic routes and managing screen transitions. Ensuring smooth navigation while maintaining state persistence between screens took extra effort and research.</p>

<p>Despite these challenges, I successfully managed to get the application running with full backend integration. While there were some minor setbacks, I am overall satisfied with the milestone achieved within the given timeframe. The experience also enhanced my ability to quickly learn new technologies and adapt to fast-paced development environments</p>

## Installation
```
git clone https://github.com/Tapiwa-1/transaction-tracker-app.git

cd transaction-tracker-app

cd backend

composer install

cp example.env  .env

cd frontend

yarn  && yarn android

```

## Tooling
- PHP 8
- NodeJS
- Android Studio
- Postman
- VSCode
- Powerfull Machine


## 🚨 Warning! 🚨
<p>Please do not shake your machine while running the program... unless you want to introduce randomized feature updates and spontaneous error messages. 🤣</p>

<p>Thank you for your cooperation! 😆</p>