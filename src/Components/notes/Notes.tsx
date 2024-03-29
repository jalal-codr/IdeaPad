import { useEffect, useState } from "react"
import Footer from "../footer/Footer"
import Notes_nav from "../nav/Notes_nav"
import{onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../FirebaseConfig";
import axios from "axios";
import Note from "./Note";
import Table from "../Table/Table";
// import { Search } from "@mui/icons-material";

// interface Props {
//       _id:string,
//       tittle:string,
//       updatedAt:any,

// }

function Notes() {
  const [user,setUser] = useState<any>();
  const [notes,setNotes] = useState<[]>([]);
  const [tables,setTables] = useState<[]>([]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    // Clean up subscription on unmount
    return () => unsubscribe();
}, []);



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

const getTables = async ()=>{
  try{
    const options = {
      method: "POST",
      url:"https://ideapad.onrender.com/get-tables",
      headers: {
          accept: "application/json",
          authorization: `Bearer ${user.accessToken}`
      },
      data:{email:user.email},
    };
    const responce = await axios.request(options);
    setTables(responce.data);
  }
  catch(err:any){
    console.log(err.message)
  }
}

  useEffect(()=>{

    if(user){
      getNotes();
      getTables();
    }
   

  },[user])

  // const searchNotes = (e:any)=>{
  //   const newNotes:any = notes.filter((element:Props)=>element.tittle.includes(e.target.value))
  //   setNewNote(newNotes);
  //   console.log(newNote)
  // }


  return (
    <>
      <Notes_nav/>
      <div className="notes_render_div">
        <div className="serch_box">
          <input   type="text" placeholder="Type here" className="input input-bordered input-xs w-full max-w-xs" />
        </div>
        <div className="note_div">
          {
            notes.map((element:any,index:number)=>(<Note  data={element} key={index} />))
          }
        </div>
          <div className="table_div">
            <div className="t_head">
            <h2 className="t_p">Tables</h2>
            </div>
            {
              tables.map((element:any,index:number)=>(<Table data={element} key={index}/>))
            }

          </div>
      </div>
      <div className="footer">
      <Footer/>
      </div>
     
    </>
  )
}

export default Notes
