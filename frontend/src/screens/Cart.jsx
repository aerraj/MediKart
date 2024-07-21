import { useCart, useDispatchCart } from '../components/ContextReducer';
import toast, { Toaster } from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export default function Cart() {
  
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const notify = () => toast.success('Order Placed! Pay on Delivery');
  const notifySuccess = () => toast.success('Order Confirmed! Pay Online Now');
  const notifyFailure = () => toast.error('Payment Failed!');
  var currentDate = new Date();

  // Days of the week
  var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Months
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get the components
  var dayOfWeek = daysOfWeek[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  
  // Format the time with leading zeros if necessary
  var time = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
  ].join(':');
  
  // Construct the final string
  var formattedDateTime = `${dayOfWeek} ${month} ${day} ${year}, ${time}`;

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://medi-kart.vercel.app/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: formattedDateTime
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }

    notify();
  }

  const handleCheckOutOnline = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://medi-kart.vercel.app/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: formattedDateTime
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }

    notifySuccess();
  }


  let totalPrice = data.reduce((total, med) => total + med.price, 0).toFixed(2);

   // payment integration with stripe
  const makePayment = async () => {
    const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
    const body = {
      products:data
  }
  const headers = {
      "Content-Type":"application/json"
  }
  handleCheckOutOnline();
 
  try {
    const response = await fetch("https://medi-kart.vercel.app/api/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      notifyFailure();
      console.error(result.error.message);
    }
  } catch (error) {
    notifyFailure();
    console.error('Error:', error);
  }
  };

  return (
    <div>
      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((med, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{med.name}</td>
                <td>{med.qty}</td>
                <td>{med.size}</td>
                <td>₹{med.price.toFixed(2)}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <img src='trash.svg' style={{ height: "20px", objectFit: "fill" }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <hr />
        <div className="payment-container">
      <h3 className="payment-heading">Payment Options</h3>
      <div className="payment-options">
        <button className="btn btn-light" onClick={handleCheckOut}>
          Cash On Delivery
        </button>
        <button className="btn btn-primary"onClick={makePayment}>
          Pay Online Now 
        </button>
      </div>
      <Toaster />
    </div>
      </div>
    </div>
  )
}
