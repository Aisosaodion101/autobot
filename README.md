# Autobot Management Platform

## Overview

This project is a full-stack application that allows users to manage Autobots, their posts, and comments. It consists of a backend Node.js API and a frontend Vue.js application.

### Features

- **Backend**: Node.js with Express, Sequelize ORM for MySQL, Axios for API calls, and Cron for scheduling background tasks.
- **Frontend**: Vue.js with Vue Router and Axios, integrated with Socket.io for real-time updates.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 14.x or above.
- **npm**: Version 6.x or above.
- **MySQL**: Version 5.7 or above.

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aisosaodion101/autobot.git
cd autobot/Autobot
2. Install Dependencies

npm install

 Configure Environment Variables
Create a .env file in the root of the project and configure your environment variables:
.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=autobot_db
DB_PORT=3306

4. Set Up the Database
Make sure your MySQL server is running, then create the database:
CREATE DATABASE autobot_db;

5. Run the Backend Server
npm run dev

Frontend Setup
1. Navigate to the Frontend Directory
cd ../autobot-frontend

2. Install Dependencies
npm install

3. Run the Frontend Server
npm run serve






