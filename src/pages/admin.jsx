import { useRouter } from 'next/router'
import s from "@/styles/profile.module.css"
import c from "@/styles/admin.module.css"
import Tabs from '@mui/material/Tabs';
import { useState, useEffect } from 'react'
//MUI
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Profile(){
	let router = useRouter()
	let [loading, setLoading] = useState(true)
	let [allDemandes, setAllDemandes] = useState(true)
	let [alert, setAlert] = useState({
		state:false,
		message:null,
		severit:null
	})

	useEffect(() => {
		getAllDeamands()
	}, [])

	async function getAllDeamands(){
		let token = localStorage.getItem('app-token')
		console.log(token)
		try {
			let req = await fetch('/api/get-all-demandes', {
				method: 'POST',
				headers: {
					'content-type':'application/json',
					'x-authorization':token
				}
			})
			let res = await req.json()
			setLoading(false)
			setAllDemandes(res)
		}catch(err){
			console.error(err)
		}
	}

	// console.log(allDemandes&&allDemandes.at(0))


	return(
		<>
		{loading?
		<div className={s.loading}>
			<CircularProgress />
			<p>Se il vous plaît, attendez</p>
		</div>
		:
		<>
			{alert.state&&<Alert onClick={() => setAlert({
				state:false,
				message:null,
				severity:null
			})} icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error" variant="filled">
			  {alert.message}
			</Alert>}
		<div className={s.profile}>
			<header>
				Admin Page
			</header>
			<div className={s.content}>
				{
					loading?
					<div className={s.loading}>
						<CircularProgress />
						<p>Se il vous plaît, attendez</p>
					</div>
					:
					<div>
						<p>Touts les demandes</p>
						{
							allDemandes&&allDemandes.map((entry, index) => {
								const date = new Date(entry.doc_date);
								const day = date.getDate().toString().padStart(2, "0");
								const month = (date.getMonth() + 1).toString().padStart(2, "0");
								const year = date.getFullYear().toString();

								const formattedDate = `${day}-${month}-${year}`;
								return <div className={s.demand_element} key={index}>
									<p>{index}</p>
									<p>{entry.title}</p>
									<p>{formattedDate}</p>
									<div>
										<CheckIcon style={{color:'green'}} />
										<CloseIcon style={{color:'red'}} />
									</div>
								</div>
							})
						}

					</div>
				}		       
			</div>
		</div>
		</>
	}
	</>
	)
}

