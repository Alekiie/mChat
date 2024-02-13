import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
