// vars
let errors = {
    typeCustomer: "",
    firstname: {containsNumbers: false},
    lastname: {},
    mail: {},
    phonecountry: "",
    phonenumber: "",
    street: {},
    housenumber: {},
    postalcode: {},
    city: {},
    deliverydate: "",
    pickupdate: "",
    note: "",
    hasError: false
};
let errorcodes = [];
let focussedElement;
let data = {
    typeCustomer: "",
    firstname: "",
    lastname: "",
    mail: "",
    phonecountry: "",
    phonenumber: "",
    street: "",
    housenumber: "",
    postalcode: "",
    city: "",
    deliverydate: "",
    pickupdate: "",
    note: ""
};
let formActivated = false;

// dom elements
let form = document.querySelector('form');

let typeCustomer;
let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let mail = document.querySelector('#mail');
let phonecountry = document.querySelector('#phonecountry');
let phonenumber = document.querySelector('#phonenumber');
let street = document.querySelector('#street');
let housenumber = document.querySelector('#housenumber');
let postalcode = document.querySelector('#postalcode');
let city = document.querySelector('#city');
let deliverydate = document.querySelector('#delivery');
let pickupdate = document.querySelector('#pickup');
let note = document.querySelector('#note');
let sendBTN = document.querySelector('#send');

// error display
let errorParagraph = document.querySelector('.errors');

// get the customer type from the form
function getTypeCustomer(type){
    typeCustomer = type;
}

// validate on form change
form.addEventListener('change', () => {

    // update errors and display them
    updateErrors();
});

form.addEventListener('input', () => {
    formActivated = true;
    focussedElement = this.document.activeElement.id;
    console.log('current element: ' + focussedElement);

    switch (focussedElement) {
        case 'firstname':
            data.firstname = this.document.activeElement.value;
            
            if(containsNumber(data.firstname)){
                errors.firstname.containsNumbers = true;
            } else {
                errors.firstname.containsNumbers = false;
                for(let i = 0; i<errorcodes.length; i++){
                    if(errorcodes[i] == "firstnameerrornumbers"){
                        let errorlog = errorParagraph.removeChild('.firstnameerrornumbers');
                    }
                }
            }
            break;
    
        default:
            break;
    }
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

function checkForErrors(){
    // firstname
    if(errors.firstname.containsNumbers){
        createErrorLog("Voornaam kan geen nummers bevatten", focussedElement, "numbers");
    }
}

function createErrorLog(text, id, type){
    let log = id + "error" + type
    let paragraph = document.createElement("p");
    paragraph.classList.add(log);
    paragraph.innerText = text;

    errorParagraph.appendChild(paragraph);
    errorcodes.push(log);
}

function updateHasError(){
    if(errors.firstname.containsNumbers){
        errors.hasError = true;
    } else {
        errors.hasError = false;
    }
}

// send button
sendBTN.addEventListener('click', () => {
    let emptyFields = checkEmptyFields();
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
