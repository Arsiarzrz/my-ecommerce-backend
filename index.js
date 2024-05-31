const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

app.get('/'. async (req, res) => {
	try {
		const client = await pool.connect();
		const result = await client.query('SELECT NOW()');
		res.send(result.rows[0]);
		client.release();
	} 	catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
