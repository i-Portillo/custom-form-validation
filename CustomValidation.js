export function CustomValidation(input) {
    this.invalidities = [];
    this.validityChecks = [];

    this.inputNode = input;

    this.registerListener();
}

CustomValidation.prototype = {

    addInvalidity: function(message) {
        this.invalidities.push(message);
    },

    getInvalidities: function() {
        return this.invalidities.join('\n');
    },

    checkValidity: function(input) {
        for ( var i = 0; i < this.validityChecks.length; i++ ) {
            const isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }
            const requirementElement = this.validityChecks[i].element;
            
            if (requirementElement) {
                if (isInvalid) {
                    requirementElement.classList.add('invalid');
                    requirementElement.classList.remove('valid');
                } else {
                    requirementElement.classList.add('valid');
                    requirementElement.classList.remove('invalid');
                }
            }
        }
    },
    checkInput: function() {

        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if ( this.inputNode.CustomValidation.invalidities.length === 0 &&
        this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            var message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() {

        const CustomValidation = this;

        this.inputNode.addEventListener('keyup', function() {
            CustomValidation.checkInput();
        });
    }
}
