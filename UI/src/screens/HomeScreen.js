import React, { useEffect } from 'react';
import Internship from '../components/Internship';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listInternships } from '../actions/internshipActions';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const internshipList = useSelector((state) => state.internshipList);
    const {loading, error, internships} = internshipList;

    useEffect(() => {
        dispatch(listInternships({}));
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger" >{error}</MessageBox>
            ) : (
                        <div className="row center">
                            {internships.map((internship) => (
                                <Internship key={internship._id} internship={internship}></Internship>
                            ))}
                        </div>
            )}
        </div>
    );
}