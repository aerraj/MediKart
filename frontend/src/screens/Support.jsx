// import React from 'react'
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import SupportBanner from './../components/SupportBanner';
export default function Support() {
  return (
    <>
          <div>
        <Navbar />
      </div>
      <SupportBanner style={{marginTop:"0px"}}></SupportBanner>
      <div>
        <hr />
    <h1 className="animated animatedFadeInUp fadeInUp" style={{ marginTop: '50px', color: '#012970', textAlign: 'center', fontWeight: 'bolder' }}>
        Reach Out to Us!!!
    </h1>
    <div id="contact" className="section wb mt-4">
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-md-3">
                    <div className="card bg-light card-block info-box shadow-lg p-3 mb-5 bg-white rounded" style={{ paddingTop: '10%' }}>
                        <div className="head d-flex align-items-center justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <h3><i className="bi bi-geo-alt"></i> Postal Address</h3>
                        </div>
                        <a href="https://www.google.com/maps/dir//R48J%2B6V+National+Institute+of+Technology+Delhi,+National+Institute+of+Technology+Plot+No.+FA7,Zone,+P1,+GT+Karnal+Rd,+Delhi,+110036/@28.9025366,78.1580267,6z/data=!4m17!1m7!3m6!1s0x390d1b1923ada2e3:0x1169930518add2fe!2sNational+Institute+of+Technology+Delhi!8m2!3d28.8162558!4d77.1332341!16s%2Fm%2F0l8gg7v!4m8!1m0!1m5!1m1!1s0x390d1b1923ada2e3:0x1169930518add2fe!2m2!1d77.1332341!2d28.8162558!3e2" target="_blank" style={{ textAlign: 'center', marginTop: '2.5%', paddingBottom: '3%', fontSize: 'small' }}>
                            MediKart Headquarters
                            <br />
                            Plot No. FA7, Zone P1,<br /> GT Karnal Road, Delhi-110036
                        </a>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-light card-block info-box shadow-lg p-3 mb-5 bg-white rounded" style={{ paddingTop: '10%' }}>
                        <div className="head d-flex align-items-center justify-content-center">
                            <svg viewBox="0 0 24 24" width="44" height="44" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <h3><i className="bi bi-telephone"></i> Call Us</h3>
                        </div>
                        <p>
                            <a className="btn btn-outline-primary" style={{ marginBottom: '1.5%', fontSize: 'small' }} href="tel:+91-011-33833867">+91-011-33833867</a>
                            <br />
                            <a className="btn btn-outline-primary" style={{ fontSize: 'small' }} href="tel:+91-011-2342345">+91-011-2342345</a>
                        </p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-light card-block shadow-lg p-3 mb-5 bg-white rounded" style={{ paddingTop: '10%', paddingBottom: '5%', marginTop: '2.5%' }}>
                        <div className="head d-flex align-items-center justify-content-center">
                            <svg viewBox="0 0 24 24" width="44" height="44" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <h3><i className="bi bi-envelope"></i> Email Us</h3>
                        </div>
                        <br />
                        <a className="btn btn-outline-primary" style={{ marginLeft: '7%', marginRight: '7%', fontSize: 'small' }} href="mailto:medikart@gmail.com">medikart@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-md-12">
                    <iframe id="itsmap" className="shadow-lg p-3 mb-5 bg-white rounded" style={{ border: 0, width: '100%', height: '500px', marginTop: '2.5%' }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13983.721902328205!2d77.1294815896788!3d28.811145645414022!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b1923ada2e3%3A0x1169930518add2fe!2sNational%20Institute%20of%20Technology%20Delhi!5e0!3m2!1sen!2sin!4v1676659578362!5m2!1sen!2sin" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>


    <div>
        <Footer />
      </div>
    </>
  )
}
