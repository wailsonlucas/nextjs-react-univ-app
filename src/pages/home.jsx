import Link from 'next/link'
import s from "@/styles/profile.module.css"
//MUI
import ClearIcon from '@mui/icons-material/Clear';

export default function Home(){
	function handleLogout(){
		  localStorage.setItem('app-token', "")
		  router.push("/")
	}

	return(
		<div className={s.profile}>
			<header>
				Bienvenue a Accueil
				<ClearIcon onClick={handleLogout} />
			</header>
			<div className={s.link_container} >
		       <p>bienvenue, si vous souhaitez demander un document <Link href="/demande" >cliquez sur ce lien</Link></p>
			</div>
		</div>

	)
}

