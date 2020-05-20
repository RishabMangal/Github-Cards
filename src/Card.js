import React from 'react'
import './style.css'
function Card(props) {
    const { name, bio,avatar_url,company,location,login } = props.user;
    return (
        // <div className={`m-${props.m} card info`}>
        <div className="m-2 card info">
            <div className="card-body row m-0">
                <div className="col-sm-4">
                    <img style={{width:"100%"}} src={avatar_url} alt="shakal"></img>
                </div>
                <div className="col-sm-8">
                    <div className="lead font-weight-bold">
                        <i className="fas fa-user mx-2"></i>{name ? name : login}
                    </div>
                    <div className="text-secondary">
                        <i className="fas fa-edit mx-2"></i>{bio ? <p style={{display:"inline",fontFamily:"cursive"}}>{bio}</p> : "No Bio found..."}
                    </div>
                    <div className="lead">
                        <i className="fas fa-university mx-2"></i>{company ? company : "No Company found..."}
                    </div>
                    <div className="lead">
                        <i className="fas fa-map-marker-alt mx-2"></i>{location ? location : "No Location found..."}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
