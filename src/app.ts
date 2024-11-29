import { Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import { studentRoutes } from './app/module/student/student.route';
const app = express();

app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1/students', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
