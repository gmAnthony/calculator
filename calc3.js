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
        storedNumber.innerText = num.slice(0,39);
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
        return;
    } else if (Array.isArray(num)) {
        let n = Number(num[0]);
        return n;
    } else {
        let n = Number(num);
        return n; 
    }
}
// Add functionality to AC button
clear.addEventListener('click', (e) => {
    if (e.target.value == "AC") {
        storeNum("");
        setCurrNum("");
    }
});
// Add functionality to DEL button
del.addEventListener('click', (e) => {
    if (e.target.value == "DEL") {
        let output = getCurrNum().toString();
        if (output) {
            output = output.substr(0, output.length - 1);
            setCurrNum(output);
        }
    }
});
// Add functionality to . button
decimal.addEventListener('click', (e) => {
    let output = getCurrNum();
    if (output == "") {
        setCurrNum("0.");
    } else if (output.indexOf(e.target.value) == -1) {
        output = output + ".";
        setCurrNum(output);
    } else {
        return;
    }
});
// Add functionality to +/- button
plusminus.addEventListener('click', (e) => {
    let output = getCurrNum();
    if (output[0] == "-") {
        setCurrNum(output.slice(1,));
    } else if (output !== "") {
        setCurrNum("-" + output);
    }
});
// Add functionality to operator buttons
for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', (e) => {
        let output = getCurrNum();
        let history = getStoredNum();
        if (output == "" && history !== "") {
            if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
            }
        }
        if (output !== "" || history !== "") {
            output = output == "" ? output : Number(output);
            history = history + output;
            if (e.target.value == "=") {
                let result = operate(history);
                setCurrNum(result);
                storeNum("");
            } else {
                history = history + e.target.value;
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
        if (output !== NaN) {
            output = output + e.target.value;
            setCurrNum(output);
        }
    });
}
// Add keyboard functionality
document.body.addEventListener('keyup', (e) => {
    let ops = [47, 42, 45, 43, 69];
    if (e.key >= 0 && e.key <= 9) { // digits
        num = Number(e.key);
        let output = getCurrNum(num);
        if (output !== NaN) {
            output = output + num.toString();
            setCurrNum(output);
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
            setCurrNum("0.");
        } else if (output.indexOf(e.target.value) == -1) {
            output = output + ".";
            setCurrNum(output);
    } else {
        return;
    }  
    } else if (ops.indexOf(e.key.charCodeAt(0)) !== -1) { // operators
        let output = getCurrNum();
        let history = getStoredNum();
        if (output == "" && history !== "") {
            if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
            }
        }
        if (output !== "" || history !== "") {
            output = output == "" ? output : Number(output);
            history = history + output;
            if (e.key.charCodeAt(0) == "69") {
                let result = operate(history);
                setCurrNum(result);
                storeNum("");
            } else {
                history = history + e.key;
                storeNum(history);
                setCurrNum("");
            }
        }
    } else {
        return;
    }
});

function add(a, b) {
    return getFormattedNumber(a) + getFormattedNumber(b);
}

function subtract(a, b) {
    return getFormattedNumber(a) - getFormattedNumber(b);
}

function multiply(a, b) {
    return getFormattedNumber(a) * getFormattedNumber(b);
}

function divide(a, b) {
    return getFormattedNumber(a) / getFormattedNumber(b);
}

function operate(eq) {
    let copy = eq;
    let exp = eq.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    let nums = copy.split(/[^0-9\.]+/);
    let operators = exp.split("#").filter(function(n){return n});
    let result = [];
    for (i=0; i < nums.length; i++) {
        result.push(nums[i]);
        if (i < operators.length) {
            result.push(operators[i]);
        }
    }
    // deal with negatives
    if (result[1] == "-") {
        result.shift();
        result.splice(0,2,result[0] + result[1])
    }
    for (x = 0; x < operators.length; x++) {
        if (operators[x].length > 1) {
            let ix = result.indexOf(operators[x]);
            console.log(result[ix].split(""))
            let negOp = result[ix].split("");
            result.splice(ix, 1, negOp[0])
            result.splice(ix + 1, 1, negOp[1] + result[ix + 1])
            console.log(result);
        }
    }
    while (result.length > 1) {
        if (result.includes('*')) {
            let ix = result.indexOf('*');
            let before = ix - 1;
            let after = ix + 1;
            let product = multiply(result[before], result[after]);
            result.splice(before, after - before + 1, product);
        } else if (result.includes('/')) {
            let ix = result.indexOf('/');
            let before = ix - 1;
            let after = ix + 1;
            let product = divide(result[before], result[after]);
            result.splice(before, after - before + 1, product);
        }  else if (result.includes('-')) {
            let ix = result.indexOf('-');
            let before = ix - 1;
            let after = ix + 1;
            let product = subtract(result[before], result[after]);
            result.splice(before, after - before + 1, product);
        } else if (result.includes('+')) {
            let ix = result.indexOf('+');
            let before = ix - 1;
            let after = ix + 1;
            let product = add(result[before], result[after]);
            result.splice(before, after - before + 1, product);
        }
    }
    return result;
}
