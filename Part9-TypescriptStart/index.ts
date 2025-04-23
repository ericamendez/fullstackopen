import express from 'express';
import {calculate, Operation} from './calculator';

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/ping', (_req: any, res: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  res.send('pong');
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/calculate', (req: any, res:any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1)) ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return res.status(400).send({ error: '...'});
  }
  // assert the type
  const result = calculate(Number(value1), Number(value2), op as Operation);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  res.send({ result });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});