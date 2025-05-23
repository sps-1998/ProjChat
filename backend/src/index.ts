import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import authRouter, { requireAuth } from './routes/auth';

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true                // if you plan to send cookies/auth
}));

app.use(express.json());

// Public auth endpoints
app.use('/auth', authRouter);

// Example protected route
app.use('/boards', requireAuth);


const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
