import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsInternship } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function InternshipScreen(props) {
    const dispatch = useDispatch();
    const internshipId = props.match.params.id;
    const internshipDetails = useSelector((state) => state.internshipDetails);
    const { loading, error, internship } = internshipDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        dispatch(detailsInternship(internshipId));
    }, [dispatch, internshipId]);

    const applyHandler = () => {
        if (userInfo){
            props.history.push('/signin?redirect=apply')
        }
    }

    const addToCartHandler = () => {
        if (userInfo){
            props.history.push(`/saved/${internshipId}`)
        }
    };

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger" >{error}</MessageBox>
            ) : (
                        <div>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={internship.image} alt={internship.company}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{internship.name}</h1>
                                        </li>
                                        <li>
                                            
                                            <h1>
                                               <Link to={`/institution/${internship.institution._id}`}>
                                                    {internship.institution.institution.name}   
                                                </Link> 
                                            </h1>
                                        </li>
                                        <p></p>
                                        <li>
                                            Location : {internship.location}
                                        </li>
                                        <p></p>
                                        <li>
                                            Description :
                                <p>{internship.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card1 card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div> Position:</div>
                                                    <div className="candidates">  {internship.candidates} Candidates</div>
                                                    <p></p>
                                                </div>
                                                <div className="row">
                                                    <div> Status:</div>
                                                    <div>
                                                        {internship.status === 'Open' ? (
                                                            <span className="success">Open</span>
                                                        ) : (
                                                                <span className="danger">Closed</span>
                                                        )}
                                                    </div>
                                                    <p></p>
                                                </div>
                                            </li>
                                            {
                                                internship.status === 'Open' &&  (
                                                    <li>
                                                        <button className="iscreen" onClick={applyHandler}> Apply </button>
                                                    </li>
                                                )
                                            }
                                            <p></p>
                                            {
                                                internship.status === 'Open' &&  (
                                                    <li>
                                                        <button onClick={addToCartHandler} className="iscreen">Save</button>
                                                    </li>
                                                ) 
                                            }
                                            <p></p>
                                            {
                                                !userInfo && (
                                                    <li>
                                                        <MessageBox variant="danger" >
                                                            Sign in to Apply and Save
                                                        </MessageBox>
                                                    </li>
                                                )
                                            }            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
        </div>
    )
}