// Define a Calculator class to handle calculator operations and state.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); // Initialize the calculator by clearing its state.
    }

    clear() {
        this.currentOperand = ''; // Initialize the current operand to an empty string.
        this.previousOperand = ''; // Initialize the previous operand to an empty string.
        this.operation = undefined; // Initialize the operation to undefined (no operation selected).
    }

    delete() {
        // Remove the last character from the current operand.
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        // Function to append a number or decimal point to the current operand.
        if (number === '.' && this.currentOperand.includes('.')) return; // Ensure only one decimal point.
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        // Function to choose a mathematical operation.
        if (this.currentOperand === '') return; // Exit if there's no current operand.
        if (this.previousOperand !== '') {
            this.compute(); // If there's a previous operand, compute the result.
        }
        this.operation = operation; // Set the chosen operation.
        this.previousOperand = this.currentOperand; // Store current operand in previous operand.
        this.currentOperand = ''; // Reset the current operand for the next input.
    }

    compute() {
        // Function to compute the result of the calculation.
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return; // Exit if operands are not valid numbers.

        // Perform the appropriate mathematical operation based on the chosen operator.
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation; // Store the result in the current operand.
        this.operation = undefined; // Reset the operation.
        this.previousOperand = ''; // Clear the previous operand.
    }

    getDisplayNumber(number) {
        // Format a number for display with thousands separators and optional decimal part.
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        // Update the display with the current and previous operands and the selected operation.
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Get references to various HTML elements by their data attributes.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// Create an instance of the Calculator class, passing in the display elements.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add event listeners to number buttons for input and updating the display.
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listeners to operation buttons for choosing an operation and updating the display.
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Add an event listener to the equals button for calculating the result and updating the display.
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add an event listener to the all-clear button for clearing the calculator and the display.
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Add an event listener to the delete button for removing the last input character.
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
