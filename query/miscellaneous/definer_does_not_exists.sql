-- This commonly occurs when exporting views/triggers/procedures from one database or server to another as the user that created that object no longer exists.
-- http://stackoverflow.com/a/19707173/1717821

/*
This commonly occurs when exporting views/triggers/procedures from one database or server to another as the user that created that object no longer exists.

You have two options:
1. Change the DEFINER

This is possibly easiest to do when initially importing your database objects, by removing any DEFINER statements from the dump.

Changing the definer later is a more little tricky:
How to change the definer for views

    Run this SQL to generate the necessary ALTER statements
*/
    SELECT CONCAT("ALTER DEFINER=`youruser`@`host` VIEW ", 
    table_name, " AS ", view_definition, ";") 
    FROM information_schema.views 
    WHERE table_schema='your-database-name';

/*
    Copy and run the ALTER statements

How to change the definer for stored procedures

Example:
*/

UPDATE `mysql`.`proc` p SET definer = 'user@%' WHERE definer='root@%'

/*
Be careful, because this will change all the definers for all databases.
2. Create the missing user

    If you've found following error while using MySQL database:

    The user specified as a definer ('someuser'@'%') does not exist`

    Then you can solve it by using following :
*/
    GRANT ALL ON *.* TO 'someuser'@'%' IDENTIFIED BY 'complex-password';
    FLUSH PRIVILEGES;
/*
From http://www.lynnnayko.com/2010/07/mysql-user-specified-as-definer-root.html

This worked like a charm - you only have to change someuser to the name of the missing user. On a local dev server, you might typically just use root.

Also consider whether you actually need to grant the user ALL permissions or whether they could do with less.
*/
-- última línea