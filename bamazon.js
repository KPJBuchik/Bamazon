var fs = require("fs")
var inquirer = require("inquirer")
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    inquirer
        .prompt([{
            name: "confirm",
            type: "confirm",
            message: "View Inventory?",
            default: true
        }]).then(function (answer) {
            if (answer.confirm) {
                inventory();
            }
            else {
                console.log(":..::..::..::..:")
                console.log("Come Back Soon")
                console.log(":..::..::..::..:")
            }
        })
}

function inventory() {
    var query = connection.query("SELECT * FROM products", function (err, results) {
        console.table(results)
        purchase()
    })
}

function purchase() {
    inquirer
        .prompt([{
            name: "select",
            type: "input",
            message: "select the item you would ike to purchase by the item id",
            validate: function (id) {
                if (!isNaN(id) && id < 11) {
                    return true;
                }
                return false;


            }

        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
            validate: function (quant) {
                if (!isNaN(quant)) {
                    return true;
                }
                return false;
            }

        }
            //purchase function uhhhh
            //select by item id
            //update quantity 
        ]).then(function (response) {
            connection.query("SELECT * FROM products WHERE item_id=?", response.select, function (err, data) {
                if (err) throw err;
                var stock = data[0].stock_quantity
                var price = data[0].price
                var newStock = stock - response.quantity
                if (response.quantity < stock) {
                    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStock, response.select],
                        function (err, res) {
                            console.table(res);
                        });

                    console.log(newStock)

                }

                else {
                    console.log("purchase succesful")
                }


            })

        })
}

//update products 



