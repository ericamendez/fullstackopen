const parseArgs = (args: Array<string>): {weight: number, height: number} => {
    if(args.length > 4) {
        throw new Error('Too many arguments');
    }
    if(args.length < 4) {
        throw new Error('Too few arguments');
    }
    if(isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        weight: Number(args[2]),
        height: Number(args[3])
    };
}

// const {weight, height} = parseArgs(process.argv)

const calculatebmi = (w: number, h:number): string => {
    const bmi = (w/(h*h)) * 703
    console.log(bmi)
    if(bmi < 16) {
        return 'Underweight (Severe thinness)'
    } else if(bmi < 17) {
        return 'Underweight (Moderate thinness)'
    } else if(bmi < 18.5) {
        return 'Underweight (Mild thinness)'
    } else if(bmi < 25) {
        return 'Normal range'
    } else if(bmi < 30) {
        return 'Overweight (Pre-obesity)'
    } else if(bmi < 35) {
        return 'Obese (Class I)'
    } else if(bmi < 40) {
        return 'Obese (Class II)'
    } else {
        return 'Obese (Class III)'
    }

}

// console.log(calculatebmi(weight, height))
export {parseArgs, calculatebmi}
export default calculatebmi
