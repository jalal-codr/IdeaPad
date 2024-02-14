import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Views/homePage/Home';
import Signin from './Components/signin/Signin';
import Signup from './Components/signup/Signup';
import NotePage from './Views/notePage/NotePage';
import Table from './Views/Table/Table';

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/note' element={<NotePage/>}/>
      <Route path='/table' element={<Table/>} />
    </Routes>
    </>
  )
}

export default App
