import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {onAuthStateChanged } from 'firebase/auth';
import {auth} from  "../../FirebaseConfig";
import axios from 'axios';

interface Props {
    _id:string,
}

function NoteNav(props:Props) {
    const [user,setUser] = useState<any>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });


        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);


    const clickBack = ()=>{
        window.location.href='/';
    }

    const deleteNote = async()=>{
        try{
            const options = {
                method: "PUT",
                url:"http://localhost:4000/deleteNote",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                data:{id:props._id}
            }
            await axios.request(options)
            window.location.href = '/'
        }
        catch(err){
            console.log(err);
        }
    } 

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">IdeaPad</a>
        <button onClick={clickBack} className='btn'>
                <ArrowBackIosIcon/>
            </button>
        <div className='icons'>
            <div className='icon_'>
                <button className='btn'>
                    <PersonAddIcon/>
                </button>
            </div>
            <div className='icon_'>
                <button onClick={deleteNote} className='btn'>
                    <DeleteForeverIcon/>
                </button>
            </div>
        </div>
        </div>
    </>
  )
}

export default NoteNav
