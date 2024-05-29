import pool from './database'

export default async function handler(req, res){
	if(req.method=="POST") {
		try {
			let { etat, eid } = req.body
			let uqry = `UPDATE home1_demands set status = '${etat}' WHERE id=${eid};`
			await pool.query(uqry)
			res.status(200).end()
		}catch(err){
			console.error(err)
			res.status(200).json('something went wrong')
		}		
	}
}