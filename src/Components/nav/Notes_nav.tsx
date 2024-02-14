import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {onAuthStateChanged } from 'firebase/auth';
import {auth} from  "../../FirebaseConfig";
import {useCookies} from 'react-cookie'




function Notes_nav() {
    const [user,setUser] = useState<any>();
    const [check,setCheck] = useState<String>("false");
    const [tittle,setTittle] =  useState<string>("Untittled");
    const [sheetUrl,setSheet] = useState('')
    const [sheetTittle,setSheetTittle] = useState<string>()
    const [, setCookie] = useCookies(['note','sheet']);
   
    


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });


        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    

    const create =async () => {
        if(check=="false"){
            setCheck("true");
        }
        else{
            setCheck("false");
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
        setCheck("false"); 
        }
        else{
            alert("You need to signIn to create notes")
            setCheck("false");
        }

        }
        catch(err){
            console.log(err)
        }


        
    } 
    const newNote = ()=>{
        if(check=="true"){
            return(<>
            <input onChange={(e)=>setTittle(e.target.value)}  type="text" placeholder="Title :" className="input input-bordered w-full max-w-xs" />
            <div className='create_note_btn'>
            <button onClick={createBtn} className="btn btn-wide">create</button>
            </div>
            
            </>)

        }
        else if (check=='table'){
            return(<>
            <input  onChange={(e)=>setSheet(e.target.value)} type="text" placeholder="Google sheet url" className="input input-bordered w-full max-w-xs" />
            <input onChange={(e)=>setSheetTittle(e.target.value)} type="text" placeholder="Tittle" className="input input-bordered w-full max-w-xs" />
            <div className='create_note_btn'>
            <button onClick={sheetPage}  className="btn btn-wide">Import Table</button>
            </div>
            </>)
        }

    }
    const sheetPage = async()=>{
        if(sheetUrl){
            await setCookie('sheet',{
                url:sheetUrl
            })
            const newSheet:object  = {
                email:user.email,
                tittle:sheetTittle,
                url:sheetUrl

            }
            const options = {
                method: "POST",
                url:"https://ideapad.onrender.com/create-table",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                data:newSheet
            }
            const responce =   await axios.request(options);
            console.log(responce);
            // window.location.href='/table'
        }else{
            alert("please input a google sheet url")
        }

    }
    const clickTable = ()=>{
        if(check=='false'){
            setCheck('table')
        }
        else{
            setCheck('false')
        }
        
    }
 

  return (
    <>
<div className="navbar bg-base-100">
  <div className="navbar-start">
    <button onClick={create} className='btn' >
    <NoteAddIcon/>
    </button>
    <div className='btn_tb'>
    <button  onClick={clickTable} className='btn'>
        <TableRowsIcon/>
    </button>
    </div>   
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
