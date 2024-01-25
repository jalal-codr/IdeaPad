import { useEffect, useState } from "react"
import TextArea from '../../Components/TextArea/TextArea';
import {useCookies} from 'react-cookie'
import{onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../FirebaseConfig";
import axios from "axios";
import Note from "../../Components/notes/Note";
import NoteNav from "../../Components/pc Components/NoteNav";




function NotePage() {
  const [cookies] = useCookies(['note']);
  const note = cookies.note
  const [user,setUser] = useState<any>();
  const [notes,setNotes] = useState<[]>([]);
  const breakPoint:number =1024;
  const screenWidth:number = window.innerWidth;


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    // Clean up subscription on unmount
    return () => unsubscribe();
}, []);

const renderNotes =() => {
  if(screenWidth>breakPoint){
    return(<>
          <div  className='note_pad_'>
        {
          notes.map((element:any,index:number)=>(<Note  data={element} key={index} />))
        }
    </div>
    </>)
  }
}



useEffect(()=>{
  const getNotes = async () => {
    try{
      const options = {
        method: "POST",
        url:"https://ideapad.onrender.com/getNotes",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${user.accessToken}`
        },
        data:{email:user.email},
      };
      const responce = await axios.request(options);
      setNotes(responce.data);

    }
    catch(err:any){
      console.log(err)
    }
   
  }
  if(user){
    getNotes();
  }
 

},[user])




  return (
    <>
    <NoteNav _id={note.id} />
    {
      renderNotes()
    }
    <div className='pad_quill'>
     <TextArea id ={note.id}/>
    </div> 
    </>
  )
}

export default NotePage
