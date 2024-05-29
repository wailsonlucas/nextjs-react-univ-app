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

      // console.log(req.body)
      let qry = `INSERT INTO users(n_inscription, 
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