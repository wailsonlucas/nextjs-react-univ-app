let pool = require('./database')
let jwt = require('jsonwebtoken')

export default async function handler(req, res) {
	try {
		let {docs_list, doc_date} = req.body

		let authorization = req.headers['x-authorization']
		// console.log(authorization)
		let decoded = jwt.verify(authorization, 'my-secret-key');
		let qry = `SELECT * from home1_users WHERE nom='${decoded.nom}';`
		let result = await pool.query(qry)


		let insert_qry = `INSERT INTO demands(
			user_nom,
			title,
			doc_date
			) 
			VALUES(
			'${result.rows.at(0).nom}',
			'demo-title',
			'${doc_date}'
		) RETURNING *;`
		
		let res_qry = await pool.query(insert_qry) 

		res.status(200).end()

	}catch(err){
		console.error(err)
		res.status(500).json('something went wrong')
	}
	
}
