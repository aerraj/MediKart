// import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Card from './../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [medCat, setMedCat] = useState([]);
    const [medItem, setMedItem] = useState([]);


   const loadData=async()=>{

    let response = await fetch('https://medi-kart.vercel.app/api/displayData',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
    });
    response = await response.json();
    // console.log(response);
    setMedItem(response[0]);
    setMedCat(response[1]);
   }

   useEffect(() => {
    loadData();
   },[]);
    return (
  

        <div>

            <div><Navbar /></div>
            <div>            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ "objectFit": "contain !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption">
                        <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}  />
                                {/* <button className="btn text-white bg-primary" type="submit">Search</button> */}
                            </div>
                        </div>        
                    </div>
                    <div className="carousel-item active">
                        <img src="m1.png" className=" carouselImg d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src="comp1.png" className="carouselImg d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="ban1.png" className="carouselImg d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            {(localStorage.getItem("authToken"))?
            <div>
             <div className='container'>
                {
                    medCat!=[]?medCat.map((data)=>{
                        return (<div className='row mb-3'key={data}>
                        <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                        <hr />
                        {
                            medItem!=[]?medItem.filter((item)=> (item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                            .map((filterItems)=>{
                                return(
                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                        <Card
                                        medItem={filterItems}
                                        options={filterItems.options[0]}
                                    > </Card>
                                    </div>
                                )
                            })
            
                            :<div>No Such Data Found</div>
                        }
                        </div>)
                    }):<Card/>
                }
            </div>
            </div>:<div>
            <div className="text-center"style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
    <h1 className='d-flex' style={{ color: '#012970' }}>Sign Up Today to access and buy wide range of our Healthcare Products</h1>
</div></div>}
            <div><Footer></Footer></div>
        </div>
    )
}
