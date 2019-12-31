var balance_list_asc = []
var balance_list_desc = []
var testList_1 = []
var testList_2 = []
var transaction_list = []
function changeOrder(list,tl){
    transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")
    for(var i = 1,j=0; i < transaction_table.children.length; i++,j++){
        var row = transaction_table.children[i]
        console.log(transaction_list[j])
        var new_col = document.createElement("td")
        new_col.innerText = "pay"
        console.log(balance_list_asc[j].debit)
        row.appendChild(balance_list_asc[j].debit)
        row.appendChild(list[j].credit)
        row.appendChild(list[j].balance)
    }
}
function myFunction() {
    console.log("welcome to my function")
    setTimeout( () => {
        console.log(transaction_date)
        if (transaction_date.classList.contains("sortedDesc") == true){
            console.log("changing from sortedDesc to sortedAsc")
            console.log(balance_list_desc)
            console.log(testList_2)
            changeOrder(balance_list_desc,testList_2)
        } else {
            console.log("changing from sortedAsc to sortedDesc")
            console.log(balance_list_asc)
            console.log(testList_1)
            changeOrder(balance_list_asc,testList_1)
        }
    }, 1000);
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

var balance_elem = document.createElement("td")
// balance_elem.innerText = "294"

var diff_amt = 0;
var next_diff_amt = 0;

for(var i = transaction_table.children.length-1; i > 0; i--){
    var row = transaction_table.children[i]
    
    debit_amt = document.createElement("td")
    credit_amt = document.createElement("td")
    row_balance = balance_elem.cloneNode(true)
    // console.log(row)
    var amt = row.getElementsByClassName("ccTransAmount")[0].innerText
    // console.log("amt is " + amt)
    
    // var diff_amt = 4.5
    transaction_row = {debit:"",credit:"",balance:""}
    if (amt.includes("CR")) {
        debit_amt.innerText = ""
        credit_amt.innerText = amt.substring(0,amt.length-3)
        transaction_row.credit = credit_amt.innerText
        next_diff_amt = parseFloat(credit_amt.innerText.substring(1,))
    } else {
        debit_amt.innerText = amt
        transaction_row.debit = amt
        credit_amt.innerText = ""
        next_diff_amt = parseFloat(amt.substring(1,)) * (-1)
    }
  
    current_balance = current_balance + diff_amt
    row_balance.innerText = current_balance
    
    diff_amt = next_diff_amt

    thisRow = {debit: debit_amt, credit: credit_amt, balance: row_balance}
    balance_list_desc.push(thisRow)
    transaction_list.push(transaction_row)
    testList_1.push(amt)
    testList_2.push(amt)
}
balance_list_asc = balance_list_desc.slice().reverse()


// balance_list_desc.unshift({debit: 0.0, credit: 0.0, balance: 0.0})
// changeOrder(balance_list_asc,testList_1)
myFunction()
console.log(balance_list_asc)

sortedAnchor.addEventListener('click', myFunction);
