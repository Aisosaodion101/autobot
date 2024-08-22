const express = require('express');
const rateLimit = require('express-rate-limit');
const http = require('http');
const cron = require('cron');

const db = require('./models');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:8080',
      methods: ["GET", "POST"]
    }
  });

const port = process.env.PORT || 3000;
const cors = require('cors');
// Configure CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', apiLimiter);

// Socket.io to broadcast Autobots count every hour
io.on('connection', (socket) => {
  console.log('A user connected');

  const broadcastAutobotCount = async () => {
    const count = await db.Autobot.count();
    socket.emit('autobotCount', { count });
  };

  // Broadcast initially when a user connects
  broadcastAutobotCount();

  // Set up a cron job to broadcast every hour
  const job = new cron.CronJob('0 * * * *', broadcastAutobotCount);
  job.start();

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.get('/api/autobots', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const autobots = await db.Autobot.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
  res.json({
    data: autobots.rows,
    total: autobots.count,
    page: parseInt(page),
    totalPages: Math.ceil(autobots.count / limit)
  });
});

app.get('/api/autobots/:id/posts', async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const posts = await db.Post.findAndCountAll({
    where: { autobotId: id },
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
  res.json({
    data: posts.rows,
    total: posts.count,
    page: parseInt(page),
    totalPages: Math.ceil(posts.count / limit)
  });
});

app.get('/api/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const comments = await db.Comment.findAndCountAll({
    where: { postId: id },
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
  res.json({
    data: comments.rows,
    total: comments.count,
    page: parseInt(page),
    totalPages: Math.ceil(comments.count / limit)
  });
});

require('./cron-job');

db.sequelize.sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
