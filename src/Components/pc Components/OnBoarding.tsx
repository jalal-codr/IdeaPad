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
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to IdeaPad</h1>
            <p className="mb-5">Your mobile, cloud-based notepad allows you to log in from anywhere on any of your devices and save that random idea that came to you. Work on your existing notes seamlessly across multiple devices, and have no worries about your progress being saved because IdeaPad has got your back. With a rich text interface, you can draft minimalist professional documents on the go or even take notes in class, conferences, or even in the field that you can revisit later on..</p>
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
