let secretKey = "1ZE10bXXDh";
let toEncrypt, toDecrypt = false;
let data, crypt;

function checkData(toEncrypt, toDecrypt) {
    if(toEncrypt){
        data = document.getElementById("encrypt").value.toString().trim();
    } else if (toDecrypt) {
        data = document.getElementById("decrypt").value.toString().trim();
    }
    const result = document.getElementById('result');
    const child = result.querySelector('h6');
    if (data == null || data == "" || typeof data === 'undefined') {
        child.innerHTML = "Field must not be empty.";
        result.querySelector("small").innerHTML = "";
        result.style.color = "red";
        result.style.display = "block";
        return;
    } else {
        child.innerHTML = "Result: ";
        result.style.color = "black";
        getData(toEncrypt, toDecrypt);
        emptyData();
    }
}

function getData(toEncrypt, toDecrypt) {
    const myArray = data.split('\n').filter(Boolean); // If empty line is needed remove filter
    const newArray = [];
    for(i=0; i<myArray.length; i++){
        if(toEncrypt){
            crypt = encrypt(myArray, i);
        } else if (toDecrypt){
            crypt = decrypt(myArray, i);
        }
        newArray.push(crypt + '<br/>');
    }
    addData(newArray);
}

function encrypt(myArray, i) {
    const encryptedData = CryptoJS.AES.encrypt(myArray[i], secretKey);
    return encryptedData.toString();
}

function decrypt(myArray, i) {
    const decryptedData = CryptoJS.AES.decrypt(myArray[i], secretKey);
    return decryptedData.toString(CryptoJS.enc.Utf8);
}

function emptyData() {
    document.getElementById("encrypt").value = "";
    document.getElementById("decrypt").value = "";
}

function addData(data) {
    document.getElementById("data").innerHTML = "";
    document.getElementById("data").innerHTML = data.join('\r');
    document.getElementById('result').style.display = 'block';
}