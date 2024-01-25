import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {onAuthStateChanged } from 'firebase/auth';
import {auth} from  "../../FirebaseConfig";
import {useCookies} from 'react-cookie'




function Notes_nav() {
    const [user,setUser] = useState<any>();
    const [check,setCheck] = useState<Boolean>(false);
    const [tittle,setTittle] =  useState<string>("Untittled");
    const [cookies, setCookie] = useCookies(['note']);
    


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });


        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    

    const create =async () => {
        if(check==false){
            setCheck(true);
        }
        else{
            setCheck(false);
        }
       
    }
    const createBtn = async ()=>{
        try{
            if(user){

            const data = {
            tittle:tittle,
            email:user.email,
        };
        const options = {
            method: "POST",
            url:"https://ideapad.onrender.com/createNote",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${user.accessToken}`
            },
            data:data
        }
        const responce =   await axios.request(options);
        setTittle('Untittled')
        setCookie('note',{
            id:responce.data._id
          })
        window.location.href='/note';
        setCheck(false); 
        }
        else{
            alert("You need to signIn to create notes")
            setCheck(false);
        }

        }
        catch(err){
            console.log(err)
        }


        
    } 
    const newNote = ()=>{
        if(check){
            return(<>
            <input onChange={(e)=>setTittle(e.target.value)}  type="text" placeholder="Title :" className="input input-bordered w-full max-w-xs" />
            <div className='create_note_btn'>
            <button onClick={createBtn} className="btn btn-wide">create</button>
            </div>
            
            </>)
        }

    }
 

  return (
    <>
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <button onClick={create} className='btn' >
    <NoteAddIcon/>
    </button>
   
  </div>
  <div className="navbar-center hidden lg:flex">
  </div>
  <div className="navbar-end">

  </div>
</div>
    {
        newNote()
    }
    </>
  )
}

export default Notes_nav
