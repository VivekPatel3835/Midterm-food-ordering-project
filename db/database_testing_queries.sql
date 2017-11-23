/* testing */


/* basic insert queries*/

/* users table */
/*correct insert */
insert into users (name, email, password)
  values('vivek', 'john@doe.com', 'sdfsasdsd');

/*incorrect insert - wrong data type */
insert into users (name, email, password)
  values('vivek', 'john@doe.com', sdfsasdsd);

/*incorrect insert - no values entered for some columns*/
insert into users (name, email)
  values('vivek', 'john@doe.com');


/* restaurants table */
/*correct insert */
-- insert into restaurants (address, phone_number, name, food_type)
--   values('441 rankin', 'john@doe.com', 'sdfsasdsd', 'italian');

-- /*incorrect insert - wrong data type */
-- insert into restaurants (address, phone_number, name, food_type)
--   values('vivek', 'john@doe.com', sdfsasdsd, 'french');

-- /*incorrect insert - no values entered for some columns*/
-- insert into restaurants (address, phone_number, name, food_type)
--   values('vivek', 'john@doe.com');

/* return entire table */

select * from users;
