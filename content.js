function changeOrder(list){
    transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")
    console.log(transaction_table.children)
    for(var i = 1,j=0; i < transaction_table.children.length; i++,j++){
        var row = transaction_table.children[i]
        console.log(row)
        console.log(list[j])
        row.appendChild(list[j].debit)
        row.appendChild(list[j].credit)
        row.appendChild(list[j].balance)
    }
}

transaction_date = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransDate.ptTableFirstColumnHeader > a")
transaction_date.setAttribute("id", "sortedAnchor")

console.log("hello from the bmo page")
summary_table = document.getElementsByClassName("summaryTable")[0]
current_balance = summary_table.getElementsByTagName("tr")[0].getElementsByClassName("info")[0].innerText.substring(1,)
current_balance = parseFloat(current_balance)
console.log("current balance is " + current_balance)


posted_table = document.querySelector("#ccDetailsTransactionAccountAccess")
// balance_header = posted_table.getElementsByTagName("th")[0].cloneNode(true)
// balance_header.innerText = "Balance"
var new_col = document.createElement("th")
new_col.innerText = "debit"
posted_table.getElementsByTagName("tr")[0].appendChild(new_col)

var new_col = document.createElement("th")
new_col.innerText = "credit"
posted_table.getElementsByTagName("tr")[0].appendChild(new_col)

var new_col = document.createElement("th")
new_col.innerText = "Balance"
posted_table.getElementsByTagName("tr")[0].appendChild(new_col)


transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")
// console.log(transaction_date.children)
// transaction_list_asc = transaction_table.children
// transaction_list_dsc = transaction_list_asc.reverse()

var balance_elem = document.createElement("td")
// balance_elem.innerText = "294"

var diff_amt = 0;
var next_diff_amt = 0;
var balance_list_asc = [];
var balance_list_desc = []
for(var i = transaction_table.children.length-1; i > 0; i--){
    var row = transaction_table.children[i]
    
    var debit_amt = document.createElement("td")
    var credit_amt = document.createElement("td")
    var row_balance = balance_elem.cloneNode(true)
    // console.log(row)
    var amt = row.getElementsByClassName("ccTransAmount")[0].innerText
    // console.log("amt is " + amt)
    
    // var diff_amt = 4.5
    
    if (amt.includes("CR")) {
        debit_amt.innerText = ""
        credit_amt.innerText = amt.substring(0,amt.length-3)
        next_diff_amt = parseFloat(credit_amt.innerText.substring(1,))
    } else {
        debit_amt.innerText = amt
        credit_amt.innerText = ""
        next_diff_amt = parseFloat(amt.substring(1,)) * (-1)
    }
    // console.log("going to do " + diff_amt)
    // console.log("current balance is " + current_balance)
    // console.log("add is " + diff_amt)
    // console.log("total: " + current_balance + diff_amt)
    current_balance = current_balance + diff_amt
    row_balance.innerText = current_balance
    // row.appendChild(debit_amt)
    // row.appendChild(credit_amt)
    // row.appendChild(row_balance)
    diff_amt = next_diff_amt

    var thisRow = {debit: debit_amt, credit: credit_amt, balance: row_balance}
    balance_list_desc.push(thisRow)
}
// balance_list.pop()
var balance_list_asc = balance_list_desc.slice().reverse()
// balance_list_desc.unshift({debit: 0.0, credit: 0.0, balance: 0.0})
changeOrder(balance_list_asc)
// console.log(balance_list_asc)
// console.log(balance_list_desc)

// Options for the observer (which mutations to observe)
var config = { attributes: true};

// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
            alert("mutation has finished")
            
            if (transaction_date.hasAttribute("sortedDesc")){
                // alert("changing from sortedAsc to sortedDesc")
                changeOrder(balance_list_desc)
            } else {
                // alert("changing from sortedDesc to sortedAsc")
                changeOrder(balance_list_asc)
            }
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(transaction_date, config);
// function myFunction() {
//     if (transaction_date.hasAttribute("sortedDesc")){
//         alert("changing from sortedDesc to sortedAsc")
//         changeOrder(balance_list_desc)
//     } else {
//         alert("changing from sortedAsc to sortedDesc")
//         changeOrder(balance_list)
//     }
// }
// sortedAnchor.addEventListener('click', myFunction, false);

// balance_list = balance_list.reverse()
// console.log(transaction_table.children.length+"------------------------- " + balance_list.length)
// console.log(balance_list)
// var index=0
// for(var j = 1; j < balance_list.length; j++){
//     var row = transaction_table.children[j]
//     console.log(j)
//     // var debit_amt = document.createElement("td")
//     // var credit_amt = document.createElement("td")
//     // var row_balance = balance_elem.cloneNode(true)
//     // console.log(balance_list[j])
//     debit_amt = balance_list[index].debit
//     credit_amt = balance_list[index].credit
//     row_balance = balance_list[index].balance
    
//     row.appendChild(debit_amt)
//     row.appendChild(credit_amt)
//     row.appendChild(row_balance)
//     index = index + 1
// }
// console.log("end")
