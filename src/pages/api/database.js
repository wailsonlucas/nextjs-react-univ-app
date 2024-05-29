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

let pool = new Pool({
	connectionString: "postgres://default:zb95UDVIqGiZ@ep-tiny-silence-a4q1g7fk.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
})
// let pool = new Pool( environment === 'production' ? vercel_config : local_config)

module.exports = pool

