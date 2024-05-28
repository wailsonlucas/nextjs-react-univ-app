import s from "@/styles/profile.module.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react'

export default function Profile(){
	let [tabState, setTabState] = useState(true)
	return(
		<div className={s.profile}>
			<header>
				Votre profile
			</header>
			<div>
				<p>Tout les demand</p>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
		          <Tab label="Item One" {...a11yProps(0)} />
		          <Tab label="Item Two" {...a11yProps(1)} />
		          <Tab label="Item Three" {...a11yProps(2)} />
		        </Tabs>
		        {
		        	tabState?
		        	<div>
		        		add demand
		        	</div>
		        	:
		        	<div>
		        		all demands
		        	</div>
		        }
			</div>
		</div>
	)
}