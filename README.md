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
## Features
- User Login
- User Register
- User Logout
- Add Transaction
- View Transaction
- Delete Transaction


## ScreenShots
| <img  src="/public/Screenshots/1.png"/> | <img  src="/public/Screenshots/3.png"/> |
| ------------- | ------------- |
| <img  src="/public/Screenshots/2.png"/> | <img  src="/public/Screenshots/4.png"/> |
| ------------- | ------------- |
## Installation
```
git clone https://github.com/Tapiwa-1/instagram-clone.git

cd instagram-clone

composer update

npm install && npm run dev

cp .env.example .env

php artisan key:generate
```
