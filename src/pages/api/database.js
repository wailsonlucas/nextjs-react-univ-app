const { Pool } = require('pg')

// const pool= new Pool({user: 'postgres',host: 'localhost',database: 'db',password: 'aaa',port: 5432});
// const pool = new Pool({connectionString: process.env.POSTGRES_URL});

let local_config = {
	user: 'postgres',
	host: 'localhost',
	database: 'home1',
	password: 'aaa',
	port: 5432
}

let vercel_config = {
	connectionString: process.env.POSTGRES_URL
}

let environment = process.env.ENVIRONMENT

let pool = new Pool( environment === 'production' ? vercel_config : local_config)

module.exports = pool
