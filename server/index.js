import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debug CORS configuration
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('CHAT_URI:', process.env.CHAT_URI);

// Connect to MongoDB with better error handling
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is not set! Server will run without database.');
} else {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      // Don't exit the process, just log the error
    });
}
// CORS configuration - allow all origins for now to fix the issue
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle CORS preflight requests
app.options('*', cors());

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date().toISOString() });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Load responses with error handling
let responses;
try {
  responses = JSON.parse(fs.readFileSync('./responses.json', 'utf-8'));
  console.log('Responses loaded successfully');
} catch (error) {
  console.error('Error loading responses.json:', error);
  responses = { intents: [] }; // Fallback empty responses
}

// Chat API
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message?.toLowerCase() || '';

  // First, try to find exact matches or more specific patterns
  for (const intent of responses.intents) {
    for (const pattern of intent.patterns) {
      const patternLower = pattern.toLowerCase();
      // Check for exact match or if the pattern is contained in user message
      if (userMessage === patternLower || userMessage.includes(patternLower)) {
        // For location-specific queries, check if there's a more specific match
        if (userMessage.includes('auditorium') && intent.tag === 'location_auditorium') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        if (userMessage.includes('library') && intent.tag === 'location_library') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        if (userMessage.includes('sports') && intent.tag === 'location_sports_complex') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        if (userMessage.includes('mba') && intent.tag === 'location_mba_block') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        if (userMessage.includes('academic') && intent.tag === 'location_academic_branch') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        if (userMessage.includes('it department') && intent.tag === 'location_it_department') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        // For general location queries, prioritize specific location intents
        if (userMessage.includes('location') && intent.tag.startsWith('location_')) {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        // For general address queries, use the general address intent
        if (userMessage.includes('address') && intent.tag === 'address') {
          return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
        }
        // For other cases, return the first match
        return res.json({ response: intent.responses[Math.floor(Math.random() * intent.responses.length)] });
      }
    }
  }

  // Default response
  const defaultResponses = [
    "I'm not sure I understand. Could you rephrase that?",
    "Interesting! Tell me more.",
    "I'm still learning. Ask me something else!"
  ];
  return res.json({ response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] });
});

// Serve React app in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 