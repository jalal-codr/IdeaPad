import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import TextArea from '../../Components/TextArea/TextArea';
import { useCookies } from 'react-cookie';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
import axios from "axios";
import Note from "../../Components/notes/Note";
import NoteNav from "../../Components/pc Components/NoteNav";
function NotePage() {
    const [cookies] = useCookies(['note']);
    const note = cookies.note;
    const [user, setUser] = useState();
    const [notes, setNotes] = useState([]);
    const breakPoint = 1024;
    const screenWidth = window.innerWidth;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);
    const renderNotes = () => {
        if (screenWidth > breakPoint) {
            return (_jsx(_Fragment, { children: _jsx("div", { className: 'note_pad_', children: notes.map((element, index) => (_jsx(Note, { data: element }, index))) }) }));
        }
    };
    useEffect(() => {
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
        if (user) {
            getNotes();
        }
    }, [user]);
    return (_jsxs(_Fragment, { children: [_jsx(NoteNav, { _id: note.id }), renderNotes(), _jsx("div", { className: 'pad_quill', children: _jsx(TextArea, { id: note.id }) })] }));
}
export default NotePage;
