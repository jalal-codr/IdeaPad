import { useEffect,useState } from "react";
import{onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../FirebaseConfig";

function onboarding() {
  const [user,setUser] = useState<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const  checkUser  = ()=>{
    if(!user){
      return(<button onClick={clickBtn} className="btn btn-primary">Get Started</button>)
    }
  }
  const  clickBtn = ()=>{
    window.location.href = '/signin';
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Welcome to IdeaPad!</h1>
      <p className="py-6">Your mobile cloud based note pad, login in form anywhere on any of your device's and save that random idea that came to you,
      work on your existing notes seemlesly on multiple devices and  have no worries about your progres being saved cause IdeaPad got your back, with a rich a text interface you can draft out 
      minimalist profesional documents on the go or even take notes in  class,confrences or even on the field that you can revisit later on    </p>
      {
        checkUser()
      }
    </div>
  </div>
</div>
    </>
  )
}

export default onboarding
