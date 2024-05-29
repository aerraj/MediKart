import { useEffect, useState } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

export default function MyOrder() {
  const [orderData, setOrderData] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch('https://medi-kart.vercel.app/api/myOrderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });
      const responseData = await response.json();
      setOrderData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='row'>
            {orderData && orderData.orderData ? (
              orderData.orderData.order_data.map((item, index) => (
                <div key={index}>
                  {item.map((arrayData, innerIndex) => (
                    <div key={innerIndex}>
                      {arrayData.Order_date ? (
                        <div className='m-auto mt-5'>
                          {arrayData.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className='col-12 col-md-6 col-lg-3' key={arrayData._id}>
                          <div className='card mt-3' style={{ width: '16rem', maxHeight: '360px' }}>
                            <div className='card-body'>
                              <h5 className='card-title'>{arrayData.name}</h5>
                              <div className='container w-100 p-0' style={{ height: '38px' }}>
                                <span className='m-1'>{arrayData.qty}</span>
                                <span className='m-1'>{arrayData.size}</span>
                                <span className='m-1'>{arrayData.Order_date}</span>
                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div>No order data available</div>
            )}
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </>
  );
}
