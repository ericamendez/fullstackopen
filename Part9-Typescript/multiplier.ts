/**
 * Types with TypeScript
 */
type Operation = 'multiply' | 'add' | 'subtract' | 'divide';

type Result = string | number;

const multiply = (a:number, b:number, op:Operation):Result => { // :number | string or :string
    switch (op) {
        case 'multiply':
            return `${a} * ${b} = ${a * b}`;
        case 'add':
            return `${a} + ${b} = ${a + b}`;
        case 'subtract':
            return `${a} - ${b} = ${a - b}`;
        case 'divide':
            if (b === 0) {
                throw new Error('Division by zero is not allowed');
            }
            return `${a} / ${b} = ${a / b}`;
        default:
            throw new Error('Invalid operation');
    }
}


try {
    console.log(multiply(2, 0, "divide"));
}
catch (error:unknown) {
    console.error(error);
}

/**
 * 
 */
