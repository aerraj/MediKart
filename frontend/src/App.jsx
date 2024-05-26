import './App.css'
import Home from './screens/Home';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from './screens/Signup.jsx';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Support from './screens/Support';

function App() {


  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} ></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/createuser" element={<Signup/>}></Route>
          <Route exact path="/myorder" element={<MyOrder/>} ></Route>
          <Route exact path="/support" element={<Support/>}></Route>
        </Routes>
      </div>    
    </Router>
    </CartProvider>
  )
}

export default App
