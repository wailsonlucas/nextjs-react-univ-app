import { useRouter } from 'next/router'
import s from "@/styles/profile.module.css"
import Tabs from '@mui/material/Tabs';
import { useState, useEffect } from 'react'
//MUI
import Tab from '@mui/material/Tab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Profile(){
	let router = useRouter()
	let [tabState, setTabState] = useState(false)
	let [docsList, setDocsList] = useState([])
	let [userDemends, setUserDemands] = useState([])
	let [loading, setLoading] = useState(true)
	let [alert, setAlert] = useState({
		state:false,
		message:null,
		severit:null
	})

	useEffect(() => {
		getUserData()
	}, [])

	async function getUserData(){
		let token = localStorage.getItem('app-token')
		try {
			let req = await fetch('/api/get-data', {
				method: 'POST',
				headers: {
					'content-type':'application/json',
					'x-authorization':token
				},
			})
			let res = await req.json()
			setLoading(false)
			setUserDemands(res)
		}catch(err){
			console.error(err)
		}
	}

	function handleTabsChange(){
		setTabState(!tabState)
	}

	function handleCheckBoxChange(check) {
		let exist = docsList.find(c => c === check)
		if(exist) {
			let filtred = docsList.filter(c => c !== check)
			setDocsList(filtred)
		} else {
			setDocsList(prev => [...prev, check])
		}
	}

	async function handleAddDoc(){
		let token = localStorage.getItem('app-token')
		try {
			if(docsList.length == 0) return setAlert({
				state:true,
				message: "veuillez choisir un document",
				severit:"error"
			})
			let req = await fetch('/api/add-doc', {
				method: 'POST',
				headers: {
					'content-type':'application/json',
					'x-authorization': token
				},
				body: JSON.stringify(docsList)
			})
			if(req.ok) router.reload()
		} catch(err){
			console.error(err)
		}
	}

	async function handleDeleteDemande(did){
		try {
			let req = await fetch('/api/delete-demande', {
				method: "DELETE",
				headers: {
					'content-type':'application/json',
					'x-did':did
				}				
			})
			if(req.ok) router.reload()
		}catch(err){
			console.error(err)
		}
	}

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
				Votre profile
			</header>
			<div className={s.content}>
				<Tabs aria-label="basic tabs example">
		          <Tab sx={tabState&&{backgroundColor:'#DC5F00',color:'#fff'}} onClick={handleTabsChange} label="demander un document" />
		          <Tab sx={!tabState&&{backgroundColor:'#DC5F00',color:'#fff'}} onClick={handleTabsChange} label="toutes vos demandes" />
		        </Tabs>
		        {
		        	tabState?
		        	<div>
		        		<div className={s.demande_date}>
			        		<p>Date de demande :</p>
			        		<LocalizationProvider dateAdapter={AdapterDayjs}>
			        			<DatePicker />
			        		</LocalizationProvider>
		        		</div>
		        		<p className={s.doc}>
		        			<Checkbox onClick={() => handleCheckBoxChange('Relevez de note')} />
		        			<p>Relevez de note</p>
		        		</p>
		        		<p className={s.doc}>
		        			<Checkbox onClick={() => handleCheckBoxChange('Diplome')} />
		        			<p>Diplome</p>
		        		</p>
		        		<p className={s.doc}>
		        			<Checkbox onClick={() => handleCheckBoxChange('Attestation')} />
		        			<p>Attestation</p>
		        		</p>
		        		<p className={s.doc}>
		        			<Checkbox onClick={() => handleCheckBoxChange('Fiche de transfer')} />
		        			<p>Fiche de transfer</p>
		        		</p>
		        		<button className={s.submit} onClick={handleAddDoc}>Validez</button>
		        	</div>
		        	:
		        	<div>
		        		{
							userDemends&&userDemends.map((dem, index) => {
								let jsDate = new Date(dem.created_at);

								const date = new Date(dem.created_at);

								const day = date.getDate().toString().padStart(2, "0");
								const month = (date.getMonth() + 1).toString().padStart(2, "0");
								const year = date.getFullYear().toString();

								const formattedDate = `${day}-${month}-${year}`;

								return <div key={index} className={s.demand_element}>
									<div>
										<p className={s.dem_num}>{index}</p>
										<p className={s.dem_title}>{dem.title}</p>
										<p className={s.dem_date}>{formattedDate}</p>
										<p className={s.dem_status}>{dem.status}</p>
									</div>
									<DeleteIcon onClick={() => handleDeleteDemande(dem.id)} sx={{color:'#FF0000', cursor:'pointer'}} />
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

