let pool = require('./database')

export default function handler(req, res) {
	let docs_list = req.body
	console.log(docs_list)
	res.status(200).end()
}


