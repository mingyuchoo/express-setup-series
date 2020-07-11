import express, { Request, Response, NextFunction } from 'express';

const app = express();
const host = '0.0.0.0';
const port = 3000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello, World!');
});

app.listen(port, host, () => {
  console.log(`Example app listening at ${host}:${port}`);
});
