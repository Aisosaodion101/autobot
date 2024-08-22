const axios = require('axios');
const cron = require('cron');
const db = require('./models');

const fetchUsersAndPosts = async () => {
  try {
    // Fetch 500 users from jsonplaceholder
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data.slice(0, 500); // Limit to 500 users

    for (const user of users) {

        // Check if Autobot already exists
        const existingAutobot = await db.Autobot.findOne({ where: { email: user.email } });
        if (existingAutobot) {
          console.log(`Autobot with email ${user.email} already exists. Skipping...`);
          continue;
        }
      // Create Autobot record
      const autobot = await db.Autobot.create({
        name: user.name,
        email: user.email
      });

      // Fetch posts for each user
      const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const posts = postsResponse.data.slice(0, 10); // Limit to 10 posts per user

      for (const post of posts) {
        // Ensure each post title is unique
        const uniqueTitle = `${post.title} - ${Date.now()}`;

        // Create Post record
        const createdPost=await db.Post.create({
          autobotId: autobot.id,
          title: uniqueTitle,
          body: post.body
        });

         // Fetch comments for the post
         const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
         const comments = commentsResponse.data;
 
         for (const comment of comments) {
           // Create the Comment record in the database
           await db.Comment.create({
             postId: createdPost.id,
             name: comment.name,
             email: comment.email,
             body: comment.body,
           });
         }
      }
    }

    console.log('Successfully fetched and stored users and posts.');
  } catch (error) {
    console.error('Error fetching users and posts:', error);
  }
};

// Schedule the job to run every hour
//const job = new cron.CronJob('0 * * * *', fetchUsersAndPosts);
//job.start();


// Schedule the job to run 5mins
const job = new cron.CronJob('*/5 * * * *', fetchUsersAndPosts);
job.start();