// vars
let errors = {
    firstname: {containsNumbers: false},
    lastname: {containsNumbers: false},
    mail: {isValidMail: true},
    phonenumber: {isNumeric: false},
    postalcode: {isNumeric: false, isMaxLength: true},
    hasError: false,
    empty: false,
    privacyChecked: true
};
let errorcodes = [];
let focussedElement;
let data = {typeCustomer: "Particulier", firstname: "", lastname: "", mail: "", phonenumber: "", street: "", housenumber: "", postalcode: "", city: "", deliverydate: "", pickupdate: "", note: ""};
let formActivated = false;

// dom elements
let form = document.querySelector('form');

let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let mail = document.querySelector('#mail');
let phonenumber = document.querySelector('#phonenumber');
let street = document.querySelector('#street');
let housenumber = document.querySelector('#housenumber');
let postalcode = document.querySelector('#postalcode');
let city = document.querySelector('#city');
let deliverydate = document.querySelector('#delivery');
let pickupdate = document.querySelector('#pickup');
let note = document.querySelector('#note');
let sendBTN = document.querySelector('#send');

// privacy check
let privacyCheck = document.querySelector('#privacy');

// error display
let errorParagraph = document.querySelector('.errors');

// get the customer type from the form
function getTypeCustomer(type){
    data.typeCustomer = type;
}

// assign and validate on form change
form.addEventListener('change', () => {
    data.firstname = firstname.value;
    data.lastname = lastname.value;
    data.mail = mail.value;
    data.phonenumber = phonenumber.value;
    data.street = street.value;
    data.housenumber = housenumber.value;
    data.postalcode = postalcode.value;
    data.city = city.value;
    data.deliverydate = deliverydate.value;
    data.pickupdate = pickupdate.value;
    data.note = note.value;
    
    // update errors and display them
    validateUserInput();
    updateErrors();
    getValuesForm();
});

form.addEventListener('input', () => {
    formActivated = true;
});

// update the errors
updateErrors();
function updateErrors(){
    checkForErrors();
    updateHasError();
    if(errors.hasError == true && formActivated){
        errorParagraph.style.display = 'block';
    } else {
        errorParagraph.style.display = 'none';
    }
}

function updateHasError(){
    if(errors.firstname.containsNumbers || errors.lastname.containsNumbers || errors.mail.isValidMail == false || errors.phonenumber.isNumeric || errors.postalcode.isNumeric || errors.postalcode.isMaxLength == false || errors.empty || errors.privacyChecked == false){
        errors.hasError = true;
    } else {
        errors.hasError = false;
    }
}

// check for errors and create error logs if needed
function checkForErrors(){
    // firstname
    if(errors.firstname.containsNumbers){
        createErrorLog("Voornaam kan geen nummers bevatten", "firstname", "numbers");
    }
    // lastname
    if(errors.lastname.containsNumbers){
        createErrorLog("Achternaam kan geen nummers bevatten", "lastname", "numbers");
    }
    // mail
    if(errors.mail.isValidMail == false){
        createErrorLog("Ongeldig mail adres", "mail", "notvalid");
    }
    // phonenumber
    if(errors.phonenumber.isNumeric){
        createErrorLog("Telefoonnummer mag enkel uit cijfers bestaan", "phonenumber", "numeric");
    }
    // postalcode
    if(errors.postalcode.isNumeric){
        createErrorLog("Postcode mag enkel uit cijfers bestaan", "postalcode", "numeric");
    }
    if(errors.postalcode.isMaxLength == false){
        createErrorLog("Postcode moet 4 cijfers zijn", "postalcodelong", "numeric");
    }
}

// create the error logs and place on dom
function createErrorLog(text, id, type){
    let log = id + "error" + type;
    let paragraph;
    let logExists = false;

    if(errorcodes.length > 0){
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == log){
                console.log('errorlog exists');
                logExists = true;
            }
        }
        if(logExists == false){
            paragraph = document.createElement("p");
            paragraph.classList.add(log);
            paragraph.innerText = text;

            errorParagraph.appendChild(paragraph);
            errorcodes.push(log);
        }
    } else {   
        paragraph = document.createElement("p");
        paragraph.classList.add(log);
        paragraph.innerText = text;

        errorParagraph.appendChild(paragraph);
        errorcodes.push(log);
    }
}

// validate input
function validateUserInput(){
    console.log(errorcodes);
    // firstname
    if(containsNumber(data.firstname)){
        errors.firstname.containsNumbers = true;
    } else {
        errors.firstname.containsNumbers = false;
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "firstnameerrornumbers"){
                errorcodes[i] = "";
                errorParagraph.removeChild(document.querySelector('.firstnameerrornumbers'));
            }
        }
    }
    
    // lastname
    if(containsNumber(data.lastname)){
        errors.lastname.containsNumbers = true;
    } else {
        errors.lastname.containsNumbers = false;
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "lastnameerrornumbers"){
                errorcodes[i] = "";
                errorParagraph.removeChild(document.querySelector('.lastnameerrornumbers'));
            }
        }
    }
    
    // mail
    if(isEmpty(data.postalcode) == false){
        if(isValidMail(data.mail) == false){
            errors.mail.isValidMail = false;
        } else {
            errors.phonecountry.isNumeric = true;
            for(let i = 0; i<errorcodes.length; i++){
                if(errorcodes[i] == "mailerrornotvalid"){
                    errorcodes[i] = "";
                    errorParagraph.removeChild(document.querySelector('.mailerrornotvalid'));
                }
            }
        }
    }
    
    // phonenumber
    if(isNumeric(data.phonenumber)){
        errors.phonenumber.isNumeric = true;
    } else {
        errors.phonenumber.isNumeric = false;
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "phonenumbererrornumeric"){
                errorcodes[i] = "";
                errorParagraph.removeChild(document.querySelector('.phonenumbererrornumeric'));
            }
        }
    }

    // postalcode
    if(isNumeric(data.postalcode)){
        errors.postalcode.isNumeric = true;
    } else {
        errors.postalcode.isNumeric = false;
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "postalcodeerrornumeric"){
                errorcodes[i] = "";
                errorParagraph.removeChild(document.querySelector('.postalcodeerrornumeric'));
            }
        }
    }

    if(isEmpty(data.postalcode) == false){   
        if(isLength(4 ,data.postalcode) == false){
            errors.postalcode.isMaxLength = false;
        } else {
            errors.postalcode.isMaxLength = true;
            for(let i = 0; i<errorcodes.length; i++){
                if(errorcodes[i] == "postalcodelongerrornumeric"){
                    errorcodes[i] = "";
                    errorParagraph.removeChild(document.querySelector('.postalcodelongerrornumeric'));
                }
            }
        }
    }
}

// send button
sendBTN.addEventListener('click', (e) => {
    e.preventDefault();
    getValuesForm();
    formActivated = true;
    let emptyFields = checkEmptyFields();
    let errorExists = false;
    console.log("empty: " + emptyFields);
    if(emptyFields){
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "sendbtnerrorempty"){
                errorExists = true;
            }
        }
        console.log("errors: " + errorExists);
        if(errorExists){
            console.log("log exists");
        } else {
            console.log("log created");
            createErrorLog("Niet alle verplichte velden zijn ingevuld", "sendbtn", "empty");
        }
        errors.empty = true;
        updateErrors();
    } else {
        for(let i = 0; i<errorcodes.length; i++){
            if(errorcodes[i] == "sendbtnerrorempty"){
                errorcodes[i] = "";
                errorParagraph.removeChild(document.querySelector('.sendbtnerrorempty'));
            }
        }
        errors.empty = false;
        updateErrors();
        // privacy checkbox
        if(privacyCheck.checked){
            // remove error log if exists
            for(let i = 0; i<errorcodes.length; i++){
                if(errorcodes[i] == "privacyerrorunchecked"){
                    errorcodes[i] = "";
                    errorParagraph.removeChild(document.querySelector('.privacyerrorunchecked'));
                }
            }
            errors.privacyChecked = true;
            updateErrors();
            // if no errors, send the data
            if(errors.hasError == false){
                alert('all fields aproved');
            }
        } else {
            // create error log when doesnt exist yet
            let privacyError = false;
            for(let i = 0; i<errorcodes.length; i++){
                if(errorcodes[i] == "privacyerrorunchecked"){
                    privacyError = true;
                }
            }

            errors.privacyChecked = false;

            if(privacyError == false){
                createErrorLog("Lees en accepteer het privacybeleid", "privacy", "unchecked")
            }

            updateErrors();
        }
    }
});


// validation functions
function checkEmptyFields(){
    if(isEmpty(data.firstname) || isEmpty(data.lastname) || isEmpty(data.mail) || isEmpty(data.street) || isEmpty(data.housenumber) || isEmpty(data.postalcode) || isEmpty(data.city)){
        return true;
    } else {
        return false;
    }
}

function isEmpty(value){
    if(value.length == 0){
        return true;
    } else {
        return false;
    }
}

function containsNumber(value){
    let regex = /[0-9]/g;
    let result = value.match(regex);
    if(result != null){
        return true;
    } else {
        return false;
    }
}

function isNumeric(value){
    let regex = /[a-z]/i;
    let result = value.match(regex);
    if(result != null){
        return true;
    } else {
        return false;
    }
}

function isNumericArray(arr){
    let regex = /[a-z]/i;
    let isNumber = true;
    let result;

    for(let i = 1; i<arr.length; i++){
        result = arr[i].match(regex);
        if(result != null){
            isNumber = false;
        }
    }

    return isNumber
}

function maxLength(max, value){
    if(value.length > max){
        return false;
    } else {
        return true;
    }
}

function isLength(length, value){
    if(value.length == length){
        return true;
    } else {
        return false;
    }
}

function startsWith(key, value){
    let parts = value.split("");
    if(parts[0] == key){
        return true;
    } else {
        return false;
    }
}

function containsCharacter(char, value){
    let parts = value.split();
    let hasChar = false;
    for(let i = 0; i<parts.length; i++){
        if(parts[i] == char){
            hasChar = true;
        }
    }

    return hasChar;
}

function isValidMail(mail){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let result = mail.match(mailformat);
    console.log(result);
    if(result != null){
        return true;
    } else {
        return false;
    }
}

// request all values
function getValuesForm(){
    console.log("type costumer: " + data.typeCustomer);
    console.log("firstname: " + data.firstname);
    console.log("lastname: " + data.lastname);
    console.log("mail: " + data.mail);
    console.log("phonenumber: " + data.phonenumber);
    console.log("street: " + data.street);
    console.log("housenumber: " + data.housenumber);
    console.log("postal: " + data.postalcode);
    console.log("city: " + data.city);
    console.log("delivery: " + data.deliverydate);
    console.log("pickup: " + data.pickupdate);
    console.log("note: " + data.note);
}