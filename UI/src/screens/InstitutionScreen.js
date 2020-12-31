import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInternships } from '../actions/internshipActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Internship from '../components/Internship';

export default function InstitutionScreen(props) {

    const institutionId = props.match.params.id;

    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const internshipList = useSelector((state) => state.internshipList);
    const {
        loading: loadingInternships, 
        error: errorInternships, 
        internships,
    } = internshipList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsUser(institutionId));
        dispatch(listInternships({institution: institutionId}));
    }, [dispatch, institutionId]);

    return (
        <div className="row top">
            <div className="col-1">
                {
                    loading ? (<LoadingBox></LoadingBox>
                    )   :   
                    error ? (<MessageBox variant="danger">{error}</MessageBox>
                    )
                    :
                    (
                        <ul className="card1 card-body">
                            <li>
                                <div className="row top">
                                    <div>
                                        <img 
                                            className= "small"
                                            src={user.institution.logo} 
                                            alt= {user.institution.name}
                                        ></img>
                                    </div>
                                    <div>
                                        <h1>
                                            {user.institution.name}
                                        </h1>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href={`mailto:${user.email}`}>Contact Institution</a>
                            </li>
                        </ul>
                    )
                }
            </div>
            <div className="col-3">
                {
                    loadingInternships ? (<LoadingBox></LoadingBox>
                        )   :   
                        errorInternships ? (<MessageBox variant="danger">{errorInternships}</MessageBox>
                        )
                        :
                        (
                            <>
                            {internships.lenght === 0 && (<MessageBox>No Internship Found</MessageBox>)}
                                <div className="row center">
                                {internships.map((internship) => (
                                    <Internship key={internship._id} internship={internship}></Internship>
                                ))}
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    )
}