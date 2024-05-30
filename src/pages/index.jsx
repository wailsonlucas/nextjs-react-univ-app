import { useRouter } from 'next/router'
import s from "@/styles/Home.module.css";
import { useState } from 'react'
import Image from 'next/image'
//MUI
import Alert from '@mui/material/Alert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';


export default function Home() {
  let router = useRouter()
  let [loginUI, setLoginUI] = useState(true)
  let [login, setLogin] = useState({
    nom:null,
    n_inscription:null
  })
  let [signup, setSignup] = useState({
    n_inscription: null,
    nom: null,
    prenom: null ,
    date_n_time_birth:null ,
    national_id: null,
    date_publication: null,
    a_propos: null,
    adresse: null,
    specialite: null,
  })
  let [alert, setAlert] = useState({
    state:false,
    message:null,
    severity:null
  })

  async function handleSignup(){
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
      } = signup

      if(!n_inscription ||
        !nom ||
        !prenom||
        !date_n_time_birth ||
        !national_id ||
        !date_publication ||
        !a_propos ||
        !adresse ||
        !specialite) return setAlert({
          state:true,
          message:"veuillez remplir tous les champs",
          severity:"error"
        })

        let req = await fetch('/api/signup', {
          method: "POST",
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(signup)
        })
        
        if(req.ok) {
          setSignup({
           n_inscription: null,
            nom: null,
            prenom: null,
            date_n_time_birth:null,
            national_id: null,
            date_publication: null,
            a_propos: null,
            adresse: null,
            specialite: null
        })
          setLoginUI(true)
        }

    }catch(err){
      console.error(err)
      setAlert({
        state: true,
        severity: 'error',
        message: 'cet utilisateur existe déjà'
      })
    }
  }

  async function handleLogin(){
    try {
      let {
        n_inscription,
        nom
      } = login

      if(!n_inscription ||
        !nom 
        ) return setAlert({
          state:true,
          message:"veuillez remplir tous les champs",
          severity:"error"
        })

        let req = await fetch('/api/login', {
          method: "POST",
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify(login)
        })
        setSignup({
           n_inscription: null,
            nom: null
        })
        let res = await req.json()
        localStorage.setItem('app-token', res.token)

        if(res.role === 'user') {
          router.push('/demande')
        } else {
          router.push('/admin')
        }

    }catch(err){
      console.error(err)
    }
  }

  return (
    <>
      {alert.state&&<Alert onClick={() => setAlert({
        state:false,
        message:null,
        severity:null
      })} icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error" variant="filled">
        {alert.message}
      </Alert>}
    <div className={s.container}>
      <Image 
        src="/index.jpg"
        alt="image"
        layout="fill"
        objecFit="cover"
      />
      <div className={s.hero}>
        <p className={s.welcom}>Bienvenue à Acceil</p>

        {/*<div className={s.accounts_types}>
          <div>
            <p>Compte utilisateur normal:</p>
            <p>nome: user</p>
            <p>n_inscription: 66443388</p>
          </div>
           <div>
            <p>Compte administrateur:</p>
            <p>nome: admin</p>
            <p>n_inscription: 99885566</p>
          </div>
        </div>*/}

         <div className={s.inputs_container}>
            {
              loginUI?
              <div>
                <input name="nom" value={login.nom} onChange={(e) => setLogin(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Entrer votre nom"/>
                <input name="n_inscription" value={login.n_inscription} onChange={(e) => setLogin(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Entrer le mot de pass"/>
                <button onClick={handleLogin}>se connecter</button>
                <p onClick={() => setLoginUI(false)} className={s.suggest}>si vous ne avez pas de compte, créez-en un maintenant</p>
              </div>
              :
              <div>
                <input name="n_inscription" value={signup.n_inscription} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Entrer votre n_inscription"/>
                <input name="nom" value={signup.nom} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Entrer votre Nom"/>
                <input name="prenom" value={signup.prenom} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Entrer votre Prenom"/>
                <input name="date_n_time_birth" value={signup.date_n_time_birth} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Date et lieu de naissance"/>
                <input name="specialite" value={signup.specialite} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Spécialité"/>
                <input name="national_id" value={signup.national_id} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Numéro de cart national"/>
                <input name="date_publication" value={signup.date_publication} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Date de publication"/>
                <input name="a_propos" value={signup.a_propos} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="A propos de votre cercle"/>
                <input name="adresse" value={signup.adresse} onChange={(e) => setSignup(prev => ({...prev, [e.target.name]:e.target.value}))} type="text" placeholder="Adresse"/>
                <button onClick={handleSignup}>se inscrire</button>
                <p onClick={() => setLoginUI(true)} className={s.suggest}>si vous avez un compte, essayez de vous connecter maintenant</p>
              </div>
            }
          </div>
      </div>
    </div>
    </>
  );
}


