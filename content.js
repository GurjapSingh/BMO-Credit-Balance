var balance_list_asc = []
var balance_list_desc = []
var testList_1 = []
var testList_2 = []
var transaction_list = []

function changeOrder(list,tl){
    transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")
    for(var i = 1; i < transaction_table.children.length; i++){
        var row = transaction_table.children[i]

        search_trans_date = row.getElementsByClassName("ccTransDate")[0].innerText
        search_post_date = row.getElementsByClassName("ccPostingDate")[0].innerText
        search_descr = row.getElementsByClassName("ccTransDescription")[0].innerText
        search_amt = row.getElementsByClassName("ccTransAmount")[0].innerText

        if (search_amt.includes("CR")){
            console.log("credit "+search_amt)
            index = list.findIndex(x => x.trans_date === search_trans_date && x.post_date === search_post_date && x.descr === search_descr && search_amt.includes(x.credit) && x.debit === "")
        } else {
            console.log("debit "+search_amt)
            index = list.findIndex(x => x.trans_date === search_trans_date && x.post_date === search_post_date && x.descr === search_descr && search_amt == x.debit && x.credit === "")

        }
        
        console.log("index is " + index)
        debit_amt = document.createElement("td")
        credit_amt = document.createElement("td")
        row_balance = credit_amt.cloneNode(true)
        
        debit_amt.innerText = list[index].debit
        credit_amt.innerText = list[index].credit
        row_balance.innerText = "$"+list[index].balance

        // console.log(transaction_list[j])
        // var new_col = document.createElement("td")
        // new_col.innerText = "pay"
        // console.log(balance_list_asc[j].debit)

        row.appendChild(debit_amt)
        row.appendChild(credit_amt)
        row.appendChild(row_balance)
    }
}
function sortChange() {
    console.log("welcome to my function")
    setTimeout( () => {
        // console.log(transaction_date)
        // if (transaction_date.classList.contains("sortedDesc") == true){
        //     console.log("changing from sortedDesc to sortedAsc")
        //     console.log(balance_list_desc)
        //     console.log(testList_2)
        //     changeOrder(balance_list_desc,testList_2)
        // } else {
        //     console.log("changing from sortedAsc to sortedDesc")
        //     console.log(balance_list_asc)
        //     console.log(testList_1)
        //     changeOrder(balance_list_asc,testList_1)
        // }
        changeOrder(balance_list_asc,testList_1)
    }, 500);
}
sortTransDate = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransDate.ptTableFirstColumnHeader > a")
sortTransDate.setAttribute("id", "sortTransDate")
sortPostDate = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccPostingDate > a")
sortPostDate.setAttribute("id","sortPostDate")
sortDesc = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransDescription > a")
sortDesc.setAttribute("id","sortDesc")
sortAmt = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransAmount > a")
sortAmt.setAttribute("id","sortAmt")

console.log("hello from the bmo page")
summary_table = document.getElementsByClassName("summaryTable")[0]
current_balance = summary_table.getElementsByTagName("tr")[0].getElementsByClassName("info")[0].innerText.substring(1,)
current_balance = parseFloat(current_balance)
console.log("current balance is " + current_balance)


posted_table = document.querySelector("#ccDetailsTransactionAccountAccess")
// balance_header = posted_table.getElementsByTagName("th")[0].cloneNode(true)
// balance_header.innerText = "Balance"
var new_col = document.createElement("th")
new_col.innerText = "Debit"
posted_table.getElementsByTagName("tr")[0].appendChild(new_col)

var new_col = document.createElement("th")
new_col.innerText = "Credit"
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
    var amt = row.getElementsByClassName("ccTransAmount")[0].innerText
    
    transaction_row = {trans_date:"",post_date:"",descr:"",amt:"",debit:"",credit:"",balance:""}
    
    // console.log(row)
    transaction_row.trans_date = row.getElementsByClassName("ccTransDate")[0].innerText
    transaction_row.post_date = row.getElementsByClassName("ccPostingDate")[0].innerText
    transaction_row.descr = row.getElementsByClassName("ccTransDescription")[0].innerText
    transaction_row.amt = amt

    // console.log("amt is " + amt)
    
    // var diff_amt = 4.5
    if (amt.includes("CR")) {
        transaction_row.credit = amt.substring(0,amt.length-3)
        next_diff_amt = parseFloat(transaction_row.credit.substring(1,))
    } else {
        transaction_row.debit = amt
        next_diff_amt = parseFloat(amt.substring(1,)) * (-1)
    }
  
    current_balance = current_balance + diff_amt
    transaction_row.balance = current_balance.toFixed(2)
    
    diff_amt = next_diff_amt

    // thisRow = {debit: debit_amt, credit: credit_amt, balance: row_balance}
    balance_list_desc.push(transaction_row)
    transaction_list.push(transaction_row)
    testList_1.push(amt)
    testList_2.push(amt)
}
balance_list_asc = balance_list_desc.slice().reverse()


// balance_list_desc.unshift({debit: 0.0, credit: 0.0, balance: 0.0})
// changeOrder(balance_list_asc,testList_1)
sortChange()
console.log(balance_list_asc)

sortTransDate.addEventListener('click', sortChange);
sortPostDate.addEventListener('click', sortChange);
sortDesc.addEventListener('click', sortChange);
sortAmt.addEventListener('click', sortChange);

