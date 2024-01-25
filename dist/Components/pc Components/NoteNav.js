import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../FirebaseConfig";
import axios from 'axios';
function NoteNav(props) {
    const [user, setUser] = useState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);
    const clickBack = () => {
        window.location.href = '/';
    };
    const deleteNote = async () => {
        try {
            const options = {
                method: "PUT",
                url: "https://ideapad.onrender.com/deleteNote",
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${user.accessToken}`
                },
                data: { id: props._id }
            };
            await axios.request(options);
            window.location.href = '/';
        }
        catch (err) {
            console.log(err);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "navbar bg-base-100", children: [_jsx("a", { className: "btn btn-ghost text-xl", children: "IdeaPad" }), _jsx("button", { onClick: clickBack, className: 'btn', children: _jsx(ArrowBackIosIcon, {}) }), _jsxs("div", { className: 'icons', children: [_jsx("div", { className: 'icon_', children: _jsx("button", { className: 'btn', children: _jsx(PersonAddIcon, {}) }) }), _jsx("div", { className: 'icon_', children: _jsx("button", { onClick: deleteNote, className: 'btn', children: _jsx(DeleteForeverIcon, {}) }) })] })] }) }));
}
export default NoteNav;
