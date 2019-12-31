var transaction_list = []

function changeOrder(){
    transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")
    
    for(var i = 1; i < transaction_table.children.length; i++){
        var row = transaction_table.children[i]

        search_trans_date = row.getElementsByClassName("ccTransDate")[0].innerText
        search_post_date = row.getElementsByClassName("ccPostingDate")[0].innerText
        search_descr = row.getElementsByClassName("ccTransDescription")[0].innerText
        search_amt = row.getElementsByClassName("ccTransAmount")[0].innerText

        if (search_amt.includes("CR")){
            index = transaction_list.findIndex(x => x.trans_date === search_trans_date && x.post_date === search_post_date && x.descr === search_descr && search_amt.includes(x.credit) && x.debit === "")
        } else {
            index = transaction_list.findIndex(x => x.trans_date === search_trans_date && x.post_date === search_post_date && x.descr === search_descr && search_amt == x.debit && x.credit === "")
        }
        
        debit_amt = document.createElement("td")
        credit_amt = document.createElement("td")
        row_balance = credit_amt.cloneNode(true)
        
        debit_amt.innerText = transaction_list[index].debit
        credit_amt.innerText = transaction_list[index].credit
        row_balance.innerText = "$"+transaction_list[index].balance

        row.appendChild(debit_amt)
        row.appendChild(credit_amt)
        row.appendChild(row_balance)
    }
}

function sortChange() {
    setTimeout( () => {
        changeOrder()
    }, 500);
}
stmt = document.querySelector("#statementControl > tbody > tr > td.dijitReset.dijitStretch.dijitButtonContents > div.dijitReset.dijitInputField.dijitButtonText > span")
if (!stmt.innerText.includes("Recent Transactions")){
    exit
}
sortTransDate = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransDate.ptTableFirstColumnHeader > a")
sortTransDate.setAttribute("id", "sortTransDate")

sortPostDate = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccPostingDate > a")
sortPostDate.setAttribute("id","sortPostDate")

sortDesc = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransDescription > a")
sortDesc.setAttribute("id","sortDesc")

sortAmt = document.querySelector("#ccDetailsTransactionAccountAccess > thead > tr > th.ccTransAmount > a")
sortAmt.setAttribute("id","sortAmt")

summary_table = document.getElementsByClassName("summaryTable")[0]
current_balance = summary_table.getElementsByTagName("tr")[0].getElementsByClassName("info")[0].innerText.substring(1,)
current_balance = parseFloat(current_balance)

posted_table = document.querySelector("#ccDetailsTransactionAccountAccess")

var new_column = document.createElement("th")
new_column.innerText = "Debit"
posted_table.getElementsByTagName("tr")[0].appendChild(new_column)

new_column = document.createElement("th")
new_column.innerText = "Credit"
posted_table.getElementsByTagName("tr")[0].appendChild(new_column)

new_column = document.createElement("th")
new_column.innerText = "Balance"
posted_table.getElementsByTagName("tr")[0].appendChild(new_column)


transaction_table = document.querySelector("#ccDetailsTransactionAccountAccess > tbody")

var diff_amt = 0;
var next_diff_amt = 0;

for(var i = transaction_table.children.length-1; i > 0; i--){
    var row = transaction_table.children[i]
    var amt = row.getElementsByClassName("ccTransAmount")[0].innerText
    
    transaction_row = {trans_date:"",post_date:"",descr:"",amt:"",debit:"",credit:"",balance:""}
    
    transaction_row.trans_date = row.getElementsByClassName("ccTransDate")[0].innerText
    transaction_row.post_date = row.getElementsByClassName("ccPostingDate")[0].innerText
    transaction_row.descr = row.getElementsByClassName("ccTransDescription")[0].innerText
    transaction_row.amt = amt
    
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

    transaction_list.push(transaction_row)
}

changeOrder()

sortTransDate.addEventListener('click', sortChange);
sortPostDate.addEventListener('click', sortChange);
sortDesc.addEventListener('click', sortChange);
sortAmt.addEventListener('click', sortChange);

