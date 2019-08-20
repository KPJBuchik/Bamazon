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
            name: "options",
            type: "list",
            message: "what you wanna do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }])
        .then(function (response) {
            if (response.options==="View Products for Sale") {
                viewProducts()
            }
            if (response.options==="View Low Inventory") {
                viewInventory()
            }

        })
}


function viewProducts(){
        connection.query("SELECT * FROM products", function (err, results) {
            console.table(results)
            goBack()
        })
    }
    

function viewInventory(){
    connection.query("SELECT * FROM products", function (err, results) {
        for (var i = 0; i < results.length; i++) {
        if(results[i].stock_quantity<10){
        console.table("Product: " +results[i].product_name)
        console.table("Stock: "+results[i].stock_quantity,)
        goBack()

        }
        }
    })
}









function goBack(){

    inquirer
        .prompt([{
            name: "goBack",
            type: "confirm",
            message: "go back?",
            default: true
        }]).then(function (answer) {
            if (answer) {
                start()
            }


        })
}


