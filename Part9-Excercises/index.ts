import express from 'express';
import calculatebmi from './bmiCalculator';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

interface BmiRequestParams {
    weight: string;
    height: string;
}

app.get('/bmi', (req: express.Request<BmiRequestParams>, res: express.Response) => {
    const {weight, height} = req.query;
    console.log(weight, height);

    let bmi = calculatebmi(Number(weight), Number(height))
    res.send(bmi);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});