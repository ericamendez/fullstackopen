const sample = [3, 0, 2, 4.5, 0, 3, 1]

interface ExerciseValues { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises:number[]): ExerciseValues => {
    const periodLength = exercises.length
    const trainingDays = exercises.filter(day => day > 0).length
    const target = 2
    const success = trainingDays >= target
    const ratingDescription = "not too bad but could be better"
    const rating = 2
    const average = exercises.reduce((a, b) => a + b, 0) / periodLength
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises(sample))