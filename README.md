# Easy Eats

## A Food Ordering service

Tweeter is a simple, single-page Twitter clone.

This project was built using HTML, CSS, JS, jQuery, AJAX for front-end , and Node, Express and MongoDB for back-end.

## Getting Started

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
  - You will be required to also provide TWILIO credentials including a verified phone number
4. Update the .env file with your correct local information
5. Install dependencies: `npm install`
6. Fix to binaries for sass: `npm rebuild node-sass`
7. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
8. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
9. Run the server: `npm run local`
10. Visit `http://localhost:8080/`


## Dependencies

- Express
- Node 5.10.x or above
- body-parser
- bcrypt
- cookie-session
- twilio
- knex
- knex logger
- method-override
- morgan
- node-sass-middleware
- ejs
- dotenv
- pg
- stripe
- 

## Screenshots

!["Screen shot for Home page"](https://github.com/VivekPatel3835/Midterm-food-ordering-project/blob/master/screen_shots/home.png)
!["Screenshot for Menu page"](https://github.com/VivekPatel3835/Midterm-food-ordering-project/blob/master/screen_shots/menu-page.png)
!["Screenshot for Checkout page"](https://github.com/VivekPatel3835/Midterm-food-ordering-project/blob/master/screen_shots/checkout.png)
!["Screenshot for Cart items page"](https://github.com/VivekPatel3835/Midterm-food-ordering-project/blob/master/screen_shots/cart_items.png)
!["Screenshot for Menu page"](https://github.com/VivekPatel3835/Midterm-food-ordering-project/blob/master/screen_shots/menu-page2.png)
