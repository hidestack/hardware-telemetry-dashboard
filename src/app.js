import express from 'express';
import cors from 'cors';
import hardwareRoutes from './routes/hardwareRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/hardwares', hardwareRoutes);

export default app;
