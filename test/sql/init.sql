CREATE DATABASE IF NOT EXISTS shelton_restaurants_local;
USE shelton_restaurants_local;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS menu_items;

CREATE TABLE restaurants (
   id_restaurant int unsigned NOT NULL AUTO_INCREMENT,
   name VARCHAR(250) NOT NULL,
   address VARCHAR(250) NOT NULL,
   PRIMARY KEY (id_restaurant)
);

CREATE TABLE menu_items (
   id_menu_item int unsigned NOT NULL AUTO_INCREMENT,
   name VARCHAR(250) NOT NULL,
   description VARCHAR(500) NOT NULL,
   price float(6, 2) NOT NULL,
   category int unsigned NOT NULL,
   id_restaurant int unsigned NOT NULL,
   PRIMARY KEY (id_menu_item),
   FOREIGN KEY (id_restaurant) REFERENCES reastaurant (id_restaurant)
);

INSERT INTO restaurants
VALUES
   (1, 'Restaurant 131', '7 Riverside Driver'),
   (2, 'Spotted Horse', '800 Bridgeport Avenue'),
   (3, 'Steak House', '30 How Avenue');

INSERT INTO menu_items
VALUES
   (1, 'Chicken Wrap', 'A wrap of chicken and other things', 10.99, 1, 1 ),
   (2, 'Ribeye', 'A ribeye steak', 24.99, 1, 3 ),
   (3, 'Wedge Salad', 'Iceberg lettuce salad', 10.99, 2, 1),
   (4, 'Mussels', 'A pot of mussels', 16.00, 3, 1 ),
   (5, 'Nashville Hot Chicken Sandwich', 'Spicy, crispy, and oh so good', 14.99, 1, 2 ),
   (6, 'Tuna Melt', 'Tunafish on toasted bread with melted cheese', 14.99, 1, 2 );