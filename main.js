import { CustomValidation } from "./CustomValidation.js";

const form = document.getElementById('form');

const email = document.getElementById('email');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const pw = document.getElementById('password');
const confPw = document.getElementById('confirm-password');
const checkbox = document.getElementById('check');

const submitBtn = document.getElementById('submit-btn');

const zipPatterns = {
    'Spain': /^[0-9]{5}$/g,
    'Poland': /^[0-9]{2}-[0-9]{3}$/g,
    'Austria': /^[0-9]{4}$/g,
}

// form.reset();

/* 
    Validity checks
*/

const emailValidityChecks = [
    {
        isInvalid: function(input) {
            const validEmail = input.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
            return !validEmail;
        },
        invalidityMessage: 'This is not a valid email address.',
        element: email,
    },
]

const passwordValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 8;
        },
        invalidityMessage: 'The password must be at least 8 characters long.',
        element: document.querySelector('#password-requirements li:nth-child(1)'),
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[0-9]/g);
        },
        invalidityMessage: 'The password must contain at least 1 number.',
        element: document.querySelector('#password-requirements li:nth-child(2)'),
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[a-z]/g);
        },
        invalidityMessage: 'The password must contain at least 1 lowercase letter.',
        element: document.querySelector('#password-requirements li:nth-child(3)'),
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[A-Z]/g);
        },
        invalidityMessage: 'The password must contain at least 1 uppercase letter.',
        element: document.querySelector('#password-requirements li:nth-child(4)'),
    },
    {
        isInvalid: function(input) {
			return !input.value.match(/[\!\@\#\$\%\^\&\*\\.]/g);
		},
		invalidityMessage: 'You need one of the required special characters',
		element: document.querySelector('#password-requirements li:nth-child(5)'),
    },
]

const zipValidityChecks = [
    {
        isInvalid: function(input) {
            return !input.value.match(zipPatterns[country.value]);
        },
        invalidityMessage: 'That is not a valid zip code for the selected country',
        element: zip,
    }
]

const confPwValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value !== pw.value;
        },
        invalidityMessage: "The passwords don't match",
        element: confPw,
    }
]


email.CustomValidation = new CustomValidation(email);
email.CustomValidation.validityChecks = emailValidityChecks;

zip.CustomValidation = new CustomValidation(zip);
zip.CustomValidation.validityChecks = zipValidityChecks;

pw.CustomValidation = new CustomValidation(pw);
pw.CustomValidation.validityChecks = passwordValidityChecks;

confPw.CustomValidation = new CustomValidation(confPw);
confPw.CustomValidation.validityChecks = confPwValidityChecks;


function validate() {
    email.CustomValidation.checkInput();
    zip.CustomValidation.checkInput();
    pw.CustomValidation.checkInput();
    confPw.CustomValidation.checkInput();
    // checkbox.CustomValidation.checkInput();
}

submitBtn.addEventListener('click', validate);
form.addEventListener('submit', validate);

