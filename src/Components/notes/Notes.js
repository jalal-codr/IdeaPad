import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Notes_nav from "../nav/Notes_nav";
import { onAuthStateChanged } from 'firebase/auth';
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
    const [user, setUser] = useState();
    const [notes, setNotes] = useState([]);
    const [tables, setTables] = useState([]);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);
    const getNotes = async () => {
        try {
            const options = {
                method: "POST",
                url: "https://ideapad.onrender.com/getNotes",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                data: { email: user.email },
            };
            const responce = await axios.request(options);
            setNotes(responce.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    const getTables = async () => {
        try {
            const options = {
                method: "POST",
                url: "https://ideapad.onrender.com/get-tables",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                data: { email: user.email },
            };
            const responce = await axios.request(options);
            setTables(responce.data);
        }
        catch (err) {
            console.log(err.message);
        }
    };
    useEffect(() => {
        if (user) {
            getNotes();
            getTables();
        }
    }, [user]);
    // const searchNotes = (e:any)=>{
    //   const newNotes:any = notes.filter((element:Props)=>element.tittle.includes(e.target.value))
    //   setNewNote(newNotes);
    //   console.log(newNote)
    // }
    return (_jsxs(_Fragment, { children: [_jsx(Notes_nav, {}), _jsxs("div", { className: "notes_render_div", children: [_jsx("div", { className: "serch_box", children: _jsx("input", { type: "text", placeholder: "Type here", className: "input input-bordered input-xs w-full max-w-xs" }) }), _jsx("div", { className: "note_div", children: notes.map((element, index) => (_jsx(Note, { data: element }, index))) }), _jsxs("div", { className: "table_div", children: [_jsx("div", { className: "t_head", children: _jsx("h2", { className: "t_p", children: "Tables" }) }), tables.map((element, index) => (_jsx(Table, { data: element }, index)))] })] }), _jsx("div", { className: "footer", children: _jsx(Footer, {}) })] }));
}
export default Notes;
