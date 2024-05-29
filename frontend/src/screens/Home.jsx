import { useState, useEffect, useMemo } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Card from './../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [medCat, setMedCat] = useState([]);
    const [medItem, setMedItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const response = await fetch('https://medi-kart.vercel.app/api/displayData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            setMedItem(result[0] || []);
            setMedCat(result[1] || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredItems = useMemo(() => {
        return medItem.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [medItem, search]);

    return (
        <div>
            <Navbar />
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                        <div className="carousel-inner" id="carousel">
                            <div className="carousel-caption">
                                <div className="carousel-caption" style={{ zIndex: 9 }}>
                                    <div className="d-flex justify-content-center">
                                        <input
                                            className="form-control me-2 w-75 bg-white text-dark"
                                            type="search"
                                            placeholder="Type in..."
                                            aria-label="Search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <img src="m1.png" className="carouselImg d-block w-100" alt="" />
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
                    </div>
                    {localStorage.getItem("authToken") ? (
                        <div className='container'>
                            {medCat.length > 0 ? (
                                medCat.map((data) => (
                                    <div className='row mb-3' key={data._id}>
                                        <div className='fs-3 m-3'>{data.CategoryName}</div>
                                        <hr />
                                        {filteredItems.length > 0 ? (
                                            filteredItems
                                                .filter(item => item.CategoryName === data.CategoryName)
                                                .map(filterItems => (
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card medItem={filterItems} options={filterItems.options[0]} />
                                                    </div>
                                                ))
                                        ) : (
                                            <div>No Such Data Found</div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>No Categories Found</div>
                            )}
                        </div>
                    ) : (
                        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
                            <h1 style={{ color: '#012970' }}>Sign Up Today to access and buy a wide range of our Healthcare Products</h1>
                        </div>
                    )}
                </>
            )}
            <Footer />
        </div>
    );
}

