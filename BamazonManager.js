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
            if (response.options === "View Products for Sale") {
                viewProducts();
            }
            if (response.options === "View Low Inventory") {
                viewInventory();
            }
            if (response.options === "Add to Inventory") {
                addInventory();
            }
            if (response.options === "Add New Product") {
                addProduct();
            }

        })
}


function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.table(results);
        goBack();
    });
};


function viewInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 10) {
                console.table("Product: " + results[i].product_name)
                console.table("Stock: " + results[i].stock_quantity)
            }
        }
    })

}

//finish these
function addInventory() {
    inquirer
        .prompt([{
            name: "select",
            type: "input",
            message: "Select the inventory you would like to update by the item id "
        },
        {
            name: "quantity",
            type: "input",
            message: "How much stock would you like to add to the inventory"
        }
        ])
        .then(function (response) {
            connection.query("SELECT * FROM products WHERE item_id=?", response.select, function (err, data) {
                if (err) throw err;
                var stock = data[0].stock_quantity
                var newStock = (parseInt(stock + parseInt(response.quantity)))

                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStock, response.select],
                function (err, res) {
                });

                goBack()

            
            })
        })



}
//finish these
function addProduct() {
    inquirer
    .prompt([{
        name:"name",
        type:"input",
        message:"what item would you like to add?",
    },
    {
        name:"department",
    type:"input",
    message:"what department?",
},
    {name:"price",
    type:"input",
    message:"what is the price of each unit?"

    },
    {name:"stock",
    type:"input",
    message:"how many in stock"

    }

    ])

.then(function(response){
    connection.query("INSERT INTO products SET ?",{
        product_name:response.name,
        department_name:response.department,
        price:response.price,
        stock_quantity:response.price
    }),
    function (err){
        if (err) throw err;
    }
    console.log("product list updated")
    
})

  //  connection.query("INSERT INTO products SET ?",{
    //    item_id:
   // }

   // INSERT INTO products (product_name, department_name, price, stock_quantity)
    //VALUES ("xbox", "video games", 300, 10);

}



function goBack() {

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



