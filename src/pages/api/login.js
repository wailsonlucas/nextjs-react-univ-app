import pool from './database'
var jwt = require('jsonwebtoken');

export default async function handler(req, res) {
    try {
        let {
        n_inscription,
        nom
      } = req.body 
      console.log(req.body)

      let qry = `SELECT * FROM home1_users WHERE nom='${nom}';`
      let result = await pool.query(qry)
      var token = jwt.sign({ nom: result.rows.at(0).nom }, 'my-secret-key');
      res.status(200).json({token, role: result.rows.at(0).role})
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