import pool from './database'
import jwt from 'jsonwebtoken'

export default async function handler(req, res){
	try {
		let authorization = req.headers['x-authorization']
		let decoded = jwt.verify(authorization, 'my-secret-key');
		// console.log(decoded)

		let dem_qry = `SELECT * FROM home1_demands;`
		let dem_res = await pool.query(dem_qry)
		let dem_data = dem_res.rows

		// let data_promise = dem_res.rows.map( (entry) => {
		// 	let user_qry = `SELECT * FROM home1_users WHERE nom='${entry.user_nom}';`
		// 	return  pool.query(user_qry)
		// })

		// let data_res = await Promise.all(data_promise)

		// // console.log(data_res[0].rows)
		// let users_data = data_res[0].rows

		// let h = dem_data.map(entry => {
		// 	return users_data.map(usr => {
		// 		if(entry.user_nom === usr.nom) return {
		// 			entry,
		// 			usr
		// 		}
		// 	})
		// })

		// console.log(h)
		res.status(200).json(dem_data)


	}catch(err){
		console.error(err)
		res.status(200).json('something went wrong')
	}
	
}