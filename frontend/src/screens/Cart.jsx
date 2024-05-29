import { useCart, useDispatchCart } from '../components/ContextReducer';
import toast, { Toaster } from 'react-hot-toast';

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

  const notify = () => toast.success('ORDER CONFIRMED!');
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


  let totalPrice = data.reduce((total, med) => total + med.price, 0).toFixed(2);

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
        <div><h1 className='fs-2'>Total Price: ₹{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
          <Toaster />
        </div>
      </div>
    </div>
  )
}
