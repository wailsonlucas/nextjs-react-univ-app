import pool from './database'

export default async function handler(req, res){
	try {
		if(req.method == "DELETE") {
			let did = req.headers['x-did']
			console.log(did)
			let qry = `DELETE FROM home1_demands WHERE id=${did};`
			await pool.query(qry)
			res.status(200).end()
		}
	}catch(err){
		console.error(err)
		res.status(500).json('something went wrong')
	}
}