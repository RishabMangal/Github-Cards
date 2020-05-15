import React from 'react'

function Footer() {
    return (
      <div className="container-fluid m-0" style={{color:"gray",backgroundColor:"#000000"}}>
        <h1 className="lead text-center text-primary text-weight-bold p-2 mr-auto" style={{fontSize:"40px"}}>BackMeUp</h1>
        <a href="https://github.com/RishabMangal"><i className="fab fa-git text-left px-3 mr-auto" style={{ position: 'absolute', left: 0 }}></i></a>            
        <a href="mailto:rishabhmangal1@gmail.com?subject=Awesome App"><i className="fas fa-envelope text-left px-3 mr-auto" style={{position: 'absolute',left:40}}></i></a>         
        <a href="https://www.linkedin.com/in/rishab-m-00b60a103/"><i className="fab fa-linkedin text-left px-3 mr-auto" style={{position: 'absolute',left:80}}></i></a>        
        <a href="https://api.whatsapp.com/send?phone=9928799243&text=Hello"><i className="fab fa-whatsapp text-left px-3 mr-auto" style={{ position: 'absolute', left: 120 }}></i></a>
        <a href="https://www.facebook.com/rishabh.mangal.77"><i className="fab fa-facebook text-left px-3 mr-auto" style={{ position: 'absolute', left: 160 }}></i></a>
        <a href="https://www.instagram.com/rishabhmangal1/"><i className="fab fa-instagram text-left px-3 mr-auto" style={{ position: 'absolute', left: 200 }}></i></a>
        <a href="https://github.com/RishabMangal"><i className="fab fa-github text-left px-3 mr-auto" style={{ position: 'absolute', left: 240 }}></i></a>
        <a href="https://www.github.com"><i className="fab fa-google-plus text-left px-3 mr-auto" style={{ position: 'absolute', left: 280 }}></i></a>            
        <p className="text-secondary text-right text-weight-normal px-3 mr-auto">Developed By Rishab Mangal</p>
        <p className="text-right text-weight-light px-3 mr-auto m-0">Version 1.0.0</p>
      </div>
    );
}

export default Footer
