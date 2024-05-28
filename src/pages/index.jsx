import s from "@/styles/Home.module.css";
import { useState } from 'react'
import Image from 'next/image'


export default function Home() {
  let [loginUI, setLoginUI] = useState(true)

  return (
    <div className={s.container}>
      <Image 
        src="/index.jpg"
        alt="image"
        layout="fill"
        objecFit="cover"
      />
      <div className={s.hero}>
        <p className={s.welcom}>Bienvenue à Acceil</p>

        <div className={s.accounts_types}>
          <div>
            <p>Compte utilisateur normal:</p>
            <p>email: user@user.com</p>
            <p>password: user</p>
          </div>
           <div>
            <p>Compte administrateur:</p>
            <p>email: admin@admin.com</p>
            <p>password: admin</p>
          </div>
        </div>

         <div className={s.inputs_container}>
            {
              loginUI?
              <div>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>se connecter</button>
                <p onClick={() => setLoginUI(false)} className={s.suggest}>si vous ne avez pas de compte, créez-en un maintenant</p>
              </div>
              :
              <div>
                <input type="email" placeholder="Entrer votre n_inscription"/>
                <input type="email" placeholder="Entrer votre Nom"/>
                <input type="email" placeholder="Entrer votre Prenom"/>
                <input type="email" placeholder="Date et lieu de naissance"/>
                <input type="password" placeholder="Spécialité"/>
                <input type="password" placeholder="Numéro de cart national"/>
                <input type="password" placeholder="Date de publication"/>
                <input type="password" placeholder="A propos de votre cercle"/>
                <input type="password" placeholder="Adresse"/>
                <button>se connecter</button>
                <p onClick={() => setLoginUI(true)} className={s.suggest}>si vous avez un compte, essayez de vous connecter maintenant</p>
              </div>
            }
          </div>
      </div>
    </div>
  );
}
