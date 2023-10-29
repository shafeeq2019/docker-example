const express = require('express')
const cors = require('cors')
const { Pool, Client } = require('pg');

const app = express()
app.use(cors())

const dbConfig = {
  user: 'postgres',
  host: 'docker-example-app-db-1',
  database: 'postgres',
  password: '123456',
  port: 5432, // Standard-PostgreSQL-Port
};

const pool = new Pool(dbConfig);

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to the database', err);
  }
  console.log('Successfully connected to the database');
  if (client) client.release();
});


async function performQuery(sqlObj) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(sqlObj);
    return result;
  } catch (err) {
    LOGGER.error('Error executing query:', err);
  } finally {
    if (client) client.release();
  }
}

app.get('/', async (req, res) => {
  const data = await performQuery({
    text: 'SELECT * FROM blogs;'
  });
  const blogs = data.rows;
  res.send(blogs)
})

app.listen(4000, () => {
  console.log('listening for requests on port 4000')
})