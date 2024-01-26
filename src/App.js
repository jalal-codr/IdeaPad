import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Views/homePage/Home';
import Signin from './Components/signin/Signin';
import Signup from './Components/signup/Signup';
import NotePage from './Views/notePage/NotePage';
function App() {
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Home, {}) }), _jsx(Route, { path: '/signin', element: _jsx(Signin, {}) }), _jsx(Route, { path: '/signup', element: _jsx(Signup, {}) }), _jsx(Route, { path: '/note', element: _jsx(NotePage, {}) })] }) }));
}
export default App;
