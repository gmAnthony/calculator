// Set constants for quicker referencing
const storedNumber = document.getElementById('storedNum');
const currNumber = document.getElementById('currNum');
const operators = document.getElementsByClassName('operators');
const plusminus = document.getElementById('plus-minus')
const numbers = document.getElementsByClassName('nums');
const decimal = document.getElementById('decimal');
const clear = document.getElementById("clear");
const del = document.getElementById("delete");
// Gets the stored numbers in history
function getStoredNum() {
    return storedNumber.innerText;
}
// Stores the number in history
function storeNum(num) {
    if (num.length > 40) {
        storedNumber.innerText = num.slice(0,39)
    } else {
        storedNumber.innerText = num;  
    }
}
// Get the number on the display
function getCurrNum() {
    return currNumber.innerHTML;
}
// Updates the display
function setCurrNum(num) {
    if (num == "") {
        currNumber.innerText = num;
    } else if (num > 999999999999999) {
        currNumber.innerText = 999999999999999;
    } else {
        currNumber.innerText = num;
    }
}
// Make sure the number is a Number
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    let n = Number(num);
    return n
}
// Add functionality to AC button
clear.addEventListener('click', (e) => {
    if (e.target.value == "AC") {
        storeNum("");
        setCurrNum("");
    }
})
// Add functionality to DEL button
del.addEventListener('click', (e) => {
    if (e.target.value == "DEL") {
        let output = getCurrNum().toString();
        if (output) {
            output = output.substr(0, output.length - 1);
            setCurrNum(output);
        }
    }
})
// Add functionality to . button
decimal.addEventListener('click', (e) => {
    let output = getCurrNum();
    if (output == "") {
        setCurrNum("0.")
    } else if (output.indexOf(e.target.value) == -1) {
        output = output + "."
        setCurrNum(output)
    } else {
        return;
    };
});
// Add functionality to +/- button
plusminus.addEventListener('click', (e) => {
    let output = getCurrNum();
    if (output[0] == "-") {
        setCurrNum(output.slice(1,))
    } else if (output != "") {
        setCurrNum("-" + output)
    }
})
// Add functionality to operator buttons
for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', (e) => {
        let output = getCurrNum();
        let history = getStoredNum();
        if (output == "" && history != "") {
            if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
            }
        }
        if (output != "" || history != "") {
            output = output == "" ? output : Number(output)
            history = history + output;
            if (e.target.value == "=") {
                let result = eval(history);
                setCurrNum(result);
                storeNum("");
            } else {
                history = history + e.target.value
                storeNum(history);
                setCurrNum("");
            }
        }
    });
}
// Add functionality to number buttons
for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let output = getCurrNum(e.target.value);
        if (output != NaN) {
            output = output + e.target.value;
            setCurrNum(output);
        }
    });
}
// Add keyboard functionality
document.body.addEventListener('keyup', (e) => {
    let ops = [47, 42, 45, 43, 69]
    if (e.key >= 0 && e.key <= 9) { // digits
        num = Number(e.key);
        let output = getCurrNum(num)
        if (output != NaN) {
            output = output + num.toString();
            setCurrNum(output)
        }
    } else if (e.key.charCodeAt(0) == '66') { // backspace
        let output = getCurrNum().toString();
        if (output) {
            output = output.substr(0, output.length - 1);
            setCurrNum(output);
        }
    } else if (e.key.charCodeAt(0) == '46') { // enter
        let output = getCurrNum();
        if (output == "") {
            setCurrNum("0.")
        } else if (output.indexOf(e.target.value) == -1) {
            output = output + "."
            setCurrNum(output)
    } else {
        return;
    };  
    } else if (ops.indexOf(e.key.charCodeAt(0)) != -1) { // operators
        let output = getCurrNum();
        let history = getStoredNum();
        if (output == "" && history != "") {
            if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
            }
        }
        if (output != "" || history != "") {
            output = output == "" ? output : Number(output);
            history = history + output;
            if (e.key.charCodeAt(0) == "69") {
                let result = eval(history);
                setCurrNum(result);
                storeNum("");
            } else {
                history = history + e.key
                storeNum(history);
                setCurrNum("");
            }
        }
    } else {
        return;
    }
})