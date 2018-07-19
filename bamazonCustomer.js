var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: keys.connectionKeys.username,
    password: keys.connectionKeys.password,
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    getProducts();
    Start();
    });


function getProducts () {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item ID: " + product.itemID + " || Name of Product: " + product.productName + " || Price: " + product.price + " || Available in Stock: " + product.stockQuantity);
        };
    });
}

function Start() {
    return inquirer.prompt([{
        name: "product",
        type: "input",
        message: "What is the ID of the product you wish to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log("\nPlease enter a listed ID.");
                return false;
            }
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many of the product would you like to buy?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }else {
                console.log("\nPlease enter a valid quantity.");
                return false;
            }
        }
    }]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE id=?", [answer.product], function(err, res) {
            if (answer.quantity > res[0].stockQuantity) {
                console.log("there is not enough in stock to complete this order.");
            NewStart();
            } else {
                amountOwed = res[0].price * answer.selectQuantity;
                currentDep = res[0].departmentName;
                console.log("total = $" + amountOwed);

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stockQuantity: res[0].stockQuantity - answer.selectQuantity
                }, {
                    id: answer.product
                }], function (err, res) {});
                NewStart();
            }
        })
    }, function(err, res){})
};


function NewStart(){
    inquirer.prompt([{
        name: "newOrder",
        type: "confirm",
        message: "Would you like to place another order?"
    }]).then(function(answer){
        if(answer.newOrder){
            Start();
        } else { 
            console.log("Thank you for your order!");
            connection.end();
        }
    })
};



// function validateInput(value) {
// 	var integer = Number.isInteger(parseFloat(value));
// 	var sign = Math.sign(value);

// 	if (integer && (sign === 1)) {
// 		return true;
// 	} else {
// 		return 'Please enter a whole non-zero number.';
// 	}
// }

// function runSearch() {
//     inquirer.prompt([
//         {
//         name: "product",
//         type: "input",
//         message: "What is the ID of the product you wish to buy?",
//         validate: validateInput()
//         },
//         {
//         name: "quantity",
//         type: "input",
//         message: "How many items would you like to purchase?",
//         validate: validateInput(),
//         filter: Number
//         }
//     ]).then(function(input) {
//         var item = input.product;
//         var quantity = input.quantity; 
//     })




// function IDprompt() {
//     inquirer.prompt({
//         name: "product",
//         type: "input",
//         message: "What is the ID of the product you wish to buy?",
//         validate: validateInput()
//     }).then(function(answer) {
//         // var item = input.itemId;
//         var query = "SELECT * FROM products WHERE ?"

//         connection.query(query, {product_name: answer.itemId }, function (err, res) {
//             if (err) throw err;
//             console.log(res);
//             for (var i = 0; i < res.length; i++) {
//                 console.log("Product Name: " + res[i].productName + " || Department: " + res[i].departmentName + " || Price: " + res[i].price + " || Available in Stock: " + res[i].stockQuantity);
//             }
//             runSearch();
//         });
//     });
// }

// function QtyPrompt() {
//     inquirer.prompt({
//         name: "quantity",
//         type: "input",
//         message: "How many items would you like to purchase?",
//         validate: validateInput(),
//         filter: Number
//     }).then(function(answer) {
//         var quantity = input.quantity;
//         var query = "SELECT * FROM products WHERE ?";

//         connection.query(query, { item_qty: stock})
//     })
// }
    





