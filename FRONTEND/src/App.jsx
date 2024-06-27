import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp"; 
import Login from './pages/Login';
import Footer from './components/Footer';
import About from "./pages/About";


function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
      </Routes> 
      <Footer/>
    </Router>
  )
}

export default App
