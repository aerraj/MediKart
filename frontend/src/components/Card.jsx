import PropTypes from 'prop-types';
import  { useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useCart,useDispatchCart } from './ContextReducer';

export default function Card(props) {
    
  let dispatch=useDispatchCart();
  let data=useCart();

  const notify = () => toast.success('Item is added to cart!');

    let options =props.options;
    let priceOptions=Object.keys(options);
    let medItem = props.medItem;

    
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    const handleAddToCart =async () => {
      let med = []
      for (const item of data) {
        if (item.id === medItem._id) {
          med = item;
  
          break;
        }
      }
      if (med != []) {
        if (med.size === size) {
          await dispatch({ type: "UPDATE", id: medItem._id, price: finalPrice, qty: qty })
          return
        }
        else if(med.size!==size){
      await dispatch({type:"ADD",id:medItem._id,name:medItem.name, price:finalPrice,qty: qty,size: size,});
      return
        }
        return
    }

    await dispatch({type:"ADD",id:medItem._id,name:medItem.name, price:finalPrice,qty: qty,size: size,});
  }
    let finalPrice = Math.round((qty * Number(options[size])) * 100) / 100;
    const handleClick=()=>{notify();handleAddToCart();}
  return (
    <div>
          <div className="card mt-3" style={{ "width": "19rem", "maxHeight": "400px" }}>
              <img className="card-img-top img-fluid" src={medItem.img} alt="Card image cap" style={{height:"160px",objectFit:"fill"}} />
              <div className="card-body">
                  <h5 className="card-title">{medItem.name}</h5>
                  <div className="container w-100" >
                      <select className="m-2 h-100 bg-primary text-white rounded" onChange={(e) => setQty(e.target.value)}>
                          {
                              Array.from(Array(6), (e, i) => {
                                  return <option key={i + 1} value={i + 1}>{i + 1}</option>
                              })
                          }
                      </select>
                      <select className="m-2 h-100 bg-primary text-white rounded" onChange={(e) => setSize(e.target.value)}>
                         {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                         })}
                      </select>
                      <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                  </div>
                  <hr />
            <button
              className={`btn btn-primary justify-center ms-5`}
              onClick={handleClick}
            >
             + Add to Cart
            </button>
            <Toaster/>
              </div>
          </div>
    </div>
  )
}

Card.propTypes = {
    medItem: PropTypes.object.isRequired,
    options:PropTypes.object.isRequired
}