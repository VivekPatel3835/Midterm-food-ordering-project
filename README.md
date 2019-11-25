# Easy Eats

## A Food Ordering service

A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, 
select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

This project was built using HTML, CSS, JS, jQuery, AJAX for front-end , and Node, Express and PostgreSQL for back-end.

## Getting Started

1. Clone this repository.
2. From the project's root directory, install dependencies using the `npm install` command.
3. Create a `.env` by using `.env.example` as a reference: run `cp .env.example .env` to create a copy of the example
4. You will be required to provide TWILIO credentials including a verified phone number. If you do not have a Twilio 
account, please create one and then update the credentials in the `.env` file. 
5. Next, please create a postgres database and adds its credentials to the .env file. A fast way to do this is to 
create a database on heroku by following the steps here: https://docs.appery.io/docs/apiexpress-databaseconnection-heroku-postgres 
5. Fix to binaries for sass by running: `npm rebuild node-sass`
6. Run the database schema migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
7. Seed the database with data: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
8. Run the server: `npm run local`
9. Visit `http://localhost:8080/`


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
