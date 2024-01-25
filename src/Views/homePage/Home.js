import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import OnBoarding from "../../Components/pc Components/OnBoarding";
import Notes from "../../Components/notes/Notes";
// import{onAuthStateChanged} from 'firebase/auth'
// import { auth } from "../../FirebaseConfig";
function Home() {
    // const [user,setUser] = useState<any>();
    const breakPoint = 700;
    const screenWidth = window.innerWidth;
    // onAuthStateChanged(auth,(currentUser:any)=>{
    //   setUser(currentUser)
    // })
    const notes = () => {
        if (screenWidth >= breakPoint) {
            return (_jsx(OnBoarding, {}));
        }
    };
    useEffect(() => {
        notes();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "notes_div", children: _jsx(Notes, {}) }), _jsx("div", { className: "note_pad_div", children: notes() })] }));
}
export default Home;
