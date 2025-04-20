import express from 'express';
import {calculate} from './calculator';

const PORT = 3001;
const app = express();

app.get('/ping', (_req: any, res: any) => {
  res.send('pong');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculate(value1, value2, op);
  res.send({ result });
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});