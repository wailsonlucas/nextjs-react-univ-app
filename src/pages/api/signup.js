import pool from './database'

export default async function handler(req, res) {
    try {
        let {
        n_inscription,
        nom,
        prenom ,
        date_n_time_birth ,
        national_id,
        date_publication,
        a_propos,
        adresse,
        specialite
      } = req.body 

      let check_qry = `SELECT * FROM home1_users WHERE nom='${nom}';`
      let check_result = await pool.query(check_qry)
      if(check_result.rowCount > 0) return res.status(400).json('user already exist')


      // console.log(req.body)
      let qry = `INSERT INTO home1_users(n_inscription, 
        nom, 
        prenom, 
        date_n_time_birth, 
        national_id, 
        date_publication, 
        a_propos, 
        adresse, 
        specialite)
      VALUES('${n_inscription}','${nom}','${prenom}','${date_n_time_birth}','${national_id}','${date_publication}','${a_propos}','${adresse}','${specialite}')RETURNING *;`

      let result = await pool.query(qry)
      // console.log(result.rows)
      res.status(200).end()

    }catch(err){
        console.error(err)
    }
}







// 775533
// yassine
// hamza
// 01/01/1998
// informatic
// 0000778
// /10/4/2024
// accune props
// Algeria