import { useEffect,useState, useRef } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { socketService } from '../../socket';
import{onAuthStateChanged} from 'firebase/auth'
import { auth } from "../../FirebaseConfig";
import axios from "axios";

interface Props {
  id:string,
}


function TextArea(props:Props) {


  const [user,setUser] = useState<any>();
  const quillRef = useRef(null);
  const quillInstance:any = useRef(null); // Added a ref to store the Quill instance
  const tool_bar_options:any = [
    [{header:[1,2,3,4,5,6,false]}],
    [{font:[]}],
    [{list:'ordered'},{list:"bullet"}],
    ['bold','italics',"underline"],
    [{color:[]},{background:[]}],
    [{script:'sub'},{scipt:"super"}],
    [{align:[]}],
    ['image','blockquote','code-block'],
    ['clean'],
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });


    // Clean up subscription on unmount
    return () => unsubscribe();
}, []);


  useEffect(() => {
    socketService.connect('https://ideapad.onrender.com/'); // Replace with your server URL

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, { theme: 'snow',modules:{toolbar:tool_bar_options} });
    }

    return () => {
      // Cleanup function
      if (quillInstance.current) {
        quillInstance.current = null;
      }
    };
  }, []);

  useEffect(()=>{
    if(socketService==null|| quillInstance.current==null) return;


    const handler =async (delta:any,oldDelta:any,source:any)=>{

      try{
        if(source!=="user") return;
      else{
        const data = {
          data:quillInstance.current.getContents(),
          id:props.id
        }
        socketService.emit('save_changes',data)
      }
      }
      catch(err){
        console.log(err)
      }
    };


    //making changes
    quillInstance.current.on("text-change",handler);


    return()=>{
      quillInstance.current.off("text-change",handler)
    };
  },[socketService,quillInstance]);

  useEffect(()=>{
    // if(socketService==null|| quillInstance.current==null) return;

    // const handler = (delta:any)=>{
    //  quillInstance.currennt.updateContents(delta);
    // };






  },[socketService,quillInstance]);

  useEffect(()=>{
    socketService.on("receive-changes",()=>{
      console.log("new Note")
    });

    return()=>{
      // socketService.off("receive-changes",handler)
    };
  },[socketService])

  useEffect(()=>{
    const getNote =async () => {
      try{
        if(user){
          const options = {
            method: "PUT",
            url:"https://ideapad.onrender.com/getNote",
            headers: {
                accept: "application/json",
                authorization: `Bearer ${user.accessToken}`
            },
            data:{id:props.id},
          };
          const responce = await axios.request(options);
          quillInstance.current.setContents(responce.data.note);
      }
      }
      catch(err:any){
        console.log(err.message)
      }
    }
    getNote();
  })



  return<>
     <div className='quill_box' ref={quillRef} />
  </>

}

export default TextArea;
