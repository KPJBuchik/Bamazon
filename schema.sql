CREATE database bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
 price INTEGER (30) NOT NULL,
 stock_quantity INTEGER (30),
PRIMARY KEY (item_id)
 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("xbox", "video games", 300, 10);
32
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bluetooth speaker", "audio", 100, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gummi bears", "grocery", 5, 45);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gibson Firebird", "musical instruments", 1000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("baseball glove", "sports", 45, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Sambas", "shoes", 75, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "tech", 1200, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Goldfinch", "books", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation", "video games", 300, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fender Bassman", "musical instruments", 1400, 5)

