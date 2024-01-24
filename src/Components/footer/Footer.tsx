import{onAuthStateChanged,signOut} from 'firebase/auth'
import { auth } from "../../FirebaseConfig";
import { useState } from "react";

function Footer() {
  const [user,setUser] = useState<any>();


    const btnClick = async()=>{
        window.location.href = '/signin';
    }
    const logOut = async () => {
      await signOut(auth);
    }

    onAuthStateChanged(auth,(currentUser:any)=>{
      setUser(currentUser)
    })
    const checkUser = ()=>{
      if(user){
        return(<button  onClick={logOut} className="btn btn-wide">Sign out</button>)
      }
      else{
        return(<button  onClick={btnClick} className="btn btn-wide">Signin</button>)
      }
    }

  return (
    <>
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
      {checkUser()}
      </nav> 
      <aside>
        <p> Copyright © 2024 - All right reserved</p>
      </aside>
    </footer>
    </>
  )
}

export default Footer
