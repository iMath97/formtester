// vars
let errors = {
    typeCustomer: "",
    firstname: {empty: true, containsNumbers: false},
    lastname: {empty: true},
    mail: {empty: true},
    phonecountry: "",
    phonenumber: "",
    street: {empty: true},
    housenumber: {empty: true},
    postalcode: {empty: true},
    city: {empty: true},
    deliverydate: "",
    pickupdate: "",
    note: "",
    hasError: false
};
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
            
            if(isEmpty(data.firstname)){
                errors.firstname.empty = true;
            } else {
                errors.firstname.empty = false;
            }
            if(containsNumber(data.firstname)){
                errors.firstname.containsNumbers = true;
            } else {
                errors.firstname.containsNumbers = false;
            }
            break;
    
        default:
            break;
    }
});

// update the errors
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
    console.log('called');
    // firstname
    if(errors.firstname.empty){
        createErrorLog("Voornaam kan niet leeg zijn", focussedElement);
    }
    if(errors.firstname.containsNumbers){
        createErrorLog("Voornaam kan geen nummers bevatten", focussedElement);
    }
}

function createErrorLog(text, id){
    let paragraph = document.createElement("p");
    paragraph.classList.add(id);
    paragraph.innerText = text;

    errorParagraph.appendChild(paragraph);
    console.log(paragraph);
}

function updateHasError(){
    if(errors.firstname.empty || errors.firstname.containsNumbers || errors.lastname.empty || errors.mail.empty || errors.street.empty || errors.housenumber.empty || errors.postalcode.empty || errors.city.empty){
        errors.hasError = true;
    } else {
        errors.hasError = false;
    }
}

// validation functions
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