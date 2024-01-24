import { useEffect } from "react";
import OnBoarding from "../../Components/pc Components/OnBoarding"
import Notes from "../../Components/notes/Notes";
// import{onAuthStateChanged} from 'firebase/auth'
// import { auth } from "../../FirebaseConfig";



function Home() {
  // const [user,setUser] = useState<any>();
  const breakPoint:number =1024;
  const screenWidth:number = window.innerWidth;

  // onAuthStateChanged(auth,(currentUser:any)=>{
  //   setUser(currentUser)
  // })

  const notes =() => {
    if(screenWidth>=breakPoint){
      return( <OnBoarding/>)
    }
  }
  useEffect(()=>{
    notes()
  },[])


  return (<>
  <div className="notes_div">
  <Notes />
  </div>
  <div className="note_pad_div">
  {
  notes()
  }
  </div>
  </>)
}

export default Home
