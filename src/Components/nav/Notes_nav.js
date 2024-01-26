import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
import { useCookies } from 'react-cookie';
function Notes_nav() {
    const [user, setUser] = useState();
    const [check, setCheck] = useState(false);
    const [tittle, setTittle] = useState("Untittled");
    //@ts-ignore
    const [cookies, setCookie] = useCookies(['note']);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);
    const create = async () => {
        if (check == false) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    };
    const createBtn = async () => {
        try {
            if (user) {
                const data = {
                    tittle: tittle,
                    email: user.email,
                };
                const options = {
                    method: "POST",
                    url: "https://ideapad.onrender.com/createNote",
                    headers: {
                        accept: "application/json",
                        authorization: `Bearer ${user.accessToken}`
                    },
                    data: data
                };
                const responce = await axios.request(options);
                setTittle('Untittled');
                setCookie('note', {
                    id: responce.data._id
                });
                window.location.href = '/note';
                setCheck(false);
            }
            else {
                alert("You need to signIn to create notes");
                setCheck(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    const newNote = () => {
        if (check) {
            return (_jsxs(_Fragment, { children: [_jsx("input", { onChange: (e) => setTittle(e.target.value), type: "text", placeholder: "Title :", className: "input input-bordered w-full max-w-xs" }), _jsx("div", { className: 'create_note_btn', children: _jsx("button", { onClick: createBtn, className: "btn btn-wide", children: "create" }) })] }));
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "navbar bg-base-100", children: [_jsx("div", { className: "navbar-start", children: _jsx("button", { onClick: create, className: 'btn', children: _jsx(NoteAddIcon, {}) }) }), _jsx("div", { className: "navbar-center hidden lg:flex" }), _jsx("div", { className: "navbar-end" })] }), newNote()] }));
}
export default Notes_nav;
