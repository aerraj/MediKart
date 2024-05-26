import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
    let data=useCart();

    const [cartView,setCartView] = useState(false);
    const navigate=useNavigate();
    const handleLogOut=()=>{
        localStorage.removeItem("authToken");
        navigate("/login");
    }
  return (
    <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <Link className="navbar-brand fs-1 font-weight-bold company mt-0 mb-0 m-4 glow-on-hover" to="/"> MediKart</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto mb-2">
                      <li className="nav-item">
                          <Link className="nav-link active fs-5 glow-on-hover" to="/">Home</Link>
                      </li>

                 
                 {(localStorage.getItem("authToken"))? <li className="nav-item">
                          <Link className="nav-link active fs-5 glow-on-hover" to="/myorder">My-Orders</Link>
                      </li>:""}
                      <li className="nav-item">
                          <Link className="nav-link active fs-5 glow-on-hover" to="/support">Support</Link>
                      </li>
                     
                  </ul>
                  {(!localStorage.getItem("authToken"))?
                  <div className="d-flex" >
                          <Link className="nav-link fs-5 me-3 text-light glow-on-hover newUser"  to="/login">Login</Link>
                          <Link  className="nav-link fs-5 me-3 text-light" >or</Link>
                          <Link className="nav-link fs-5 me-3 glow-on-hover newUser" to="/createuser">SignUp</Link>
                  </div>:
                  <div>
                  <div className="btn bg-white text-primary mx-2 glow-on-hover" onClick={()=>{setCartView(true)}}>
                    My Cart{"  "}
                  <Badge pill bg="info">{data.length}</Badge>
                  </div>
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> :null}
                  <div className="btn bg-white text-danger mx-3 glow-on-hover" onClick={handleLogOut}>LogOut</div>
                  </div>}
              </div>
          </nav>
    </div>
  )
}
