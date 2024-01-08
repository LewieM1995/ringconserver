## Ringcon - Server
## Description 
This server is the backend component of the Ringcon app. It handles the logic for storing and retrieving data for the Next.js frontend application.

## Installation Instructions
Clone the Repository:

git clone https://github.com/LewieM1995/ringcon.git

cd ringcon

Install Dependencies:

npm install

Configure Environment Variables:

Create a .env file at the root and store any necessary API keys or authentication details for a database etc.

Format Example;

PORT=DEFAULTPORTFORSERVER

DB_HOST=DATABASEHOSTURL.COM
DB_USER=USERNAME
DB_PASSWORD=PASSWORD
DB_NAME=DATABASENAME
DB_PORT=PORTFORDB

Run the Server:

node index.js

## Note:
This applications requires node v20.x. Database inserts/querys for MySQL.
