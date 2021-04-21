// Put your application javascript here

function changeOrderMemo() {
    if (document.getElementById("order-memo-check").checked) {
        document.getElementById("order-memo").style.display = "block";
    } else {
        document.getElementById("order-memo").style.display = "none";
    }
}

