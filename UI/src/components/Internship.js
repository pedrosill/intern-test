import React from 'react'
import { Link } from 'react-router-dom';

export default function Internship(props) {
    const {internship} = props;
    return (
        <div key={internship._id} className="card">
            <Link to={`/internship/${internship._id}`}>
                <img className="medium" 
                src={internship.image}
                alt={internship.name}
                />
            </Link>
            <div className="card-text">
                <span className="date">{internship.date}</span>
                <h2>{internship.name}</h2>
            </div>
            <div className="card-stats">
                <div className="stat">
                    <div className="value">{internship.location}</div>
                    <div className="type">Location</div>
                </div>
                <div className="stat border">
                    <div className="value">{internship.candidates}</div>
                    <div className="type">Candidates</div>
                </div>
                <div className="stat">
                    <div className="value">{internship.type}</div>
                    <div className="type">Type</div>
                </div>
            </div>
        </div>
    )
}