// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contacts.js';
import projectRoutes from './routes/projects.js';
import qualificationRoutes from './routes/qualifications.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS: allow your deployed frontend origin ---
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(
  cors({
    origin: allowedOrigin,          
    credentials: true,             
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
  })
);

app.use(express.json());

// --- DB ---
await connectDB();

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);

// --- Health & root ---
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.get('/', (req, res) => res.json({ message: 'Welcome to My Portfolio application.' }));

// --- Not found (optional) ---
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
