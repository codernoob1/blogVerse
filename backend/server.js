import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dbConnection } from './database/db.js';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';
import ProfileRoute from './routes/ProfileRoute.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Fix for `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  //  // Vite's default dev server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent/received
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
dbConnection();

// WebSockets for Real-time Likes
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('likePost', (postId) => {
    try {
      io.emit('updateLikes', postId);
    } catch (error) {
      console.error('Error in likePost event:', error);
      socket.emit('error', 'Failed to update likes');
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoute);
console.log('initailizing')
app.use('/api/posts', postRoute(io)); 
console.log('initailizing end')
app.use('/api/users', ProfileRoute);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
