import s from "@/styles/profile.module.css"
import Tabs from '@mui/material/Tabs';
import { useState } from 'react'
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

export default function Profile(){
	let [tabState, setTabState] = useState(true)
	let [docsList, setDocsList] = useState([])
	let [alert, setAlert] = useState({
		state:false,
		message:null,
		severit:null
	})

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
		try {
			if(docsList.length == 0) return setAlert({
				state:true,
				message: "veuillez choisir un document",
				severit:"error"
			})
			let req = await fetch('/api/add-doc', {
				method: 'POST',
				headers: {
					'content-type':'application/json'
				},
				body: JSON.stringify(docsList)
			})
		} catch(err){
			console.error(err)
		}
	}


	return(
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
		        		<p>toutes vos demandes</p>
		        	</div>
		        }
			</div>
		</div>
		</>
	)
}

