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
            name: "iteminput",
            type: "input",
            message: "select the item you would ike to purchase by the item id",

        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",

        }
        ]).then(function (response) {
            var inputArray = connection.query("SELECT * FROM products WHERE item_id=?", response.input, function (err, data) {
                if (response.input > data.quantity) {
                    console.log("sorry we are sold out")

                }

                else {
                    console.log("purchase succesful")
                }


            })

        })
}




