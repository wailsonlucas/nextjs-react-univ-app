import pool from './database'
import jwt from 'jsonwebtoken'

export default async function hendler(req, res){
	try {
		let authorization = req.headers['x-authorization']
		let decoded = jwt.verify(authorization, 'my-secret-key');
		// console.log(decoded)
		let qry = `SELECT * from home1_users WHERE nom='${decoded.nom}';`
		let result = await pool.query(qry)
		// console.log(result.rows.at(0))

		let dem_qry = `SELECT * FROM demands WHERE user_nom='${result.rows.at(0).nom}' `
		let dem_res = await pool.query(dem_qry)
		console.log(dem_res.rows)

		res.status(200).json(dem_res.rows)
	}catch(err){
		console.error(err)
		res.status(500).json("something went wrong")
	}
}