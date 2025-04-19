/**
 * Types with TypeScript
 */
type Operation = 'multiply' | 'add' | 'subtract' | 'divide' | string;

type Result = string | number;

const multiply = (a:number, b:number, op:Operation):Result => { // :number | string or :string    
    //make sure the arguments are numbers
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Arguments must be numbers');
    }
    //make sure the operation is valid
    if (typeof op !== 'string') {
        throw new Error('Operation must be a string');
    }
    //make sure the operation is valid
    if (op !== 'multiply' && op !== 'add' && op !== 'subtract' && op !== 'divide') {
        throw new Error('Operation must be one of the following: multiply, add, subtract, divide');
    }

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

const parseArgs = (args: string[]): { operator: string, value2: number ,value3: number} => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    const operator = args[2];
    const value2 = Number(args[3]);
    const value3 = Number(args[4]);
    return { operator, value2, value3 };
}

const { operator, value2, value3 } = parseArgs(process.argv);

console.log(`Operator: ${operator}`);
console.log(`Value 2: ${value2}`);  
console.log(`Value 3: ${value3}`);


// const op: Operation = process.argv[2] as Operation;
// const a: number = Number(process.argv[3])
// const b: number = Number(process.argv[4])

try {
    console.log(multiply(value2, value3, operator));
}
catch (error:unknown) {
    console.error(error);
}

/**
 * 
 */

// console.log(process.argv)