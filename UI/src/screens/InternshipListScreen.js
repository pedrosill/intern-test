import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInternship, deleteInternship, listInternships } from '../actions/internshipActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INTERNSHIP_CREATE_RESET, INTERNSHIP_DELETE_RESET } from '../constants/internshipConstants';

export default function InternshipListScreen(props){
    const internshipList = useSelector(state => state.internshipList);
    const {loading, error, internships} = internshipList;
    
    const internshipCreate = useSelector(state => state.internshipCreate);
    const {
        loading : loadingCreate, 
        error : errorCreate, 
        success: successCreate, 
        internship: createdInternship,
    } = internshipCreate;

    const internshipDelete = useSelector(state => state.internshipDelete);
    const {
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete,
    } = internshipDelete;
    
    const dispatch = useDispatch();

    useEffect(() =>{
        if(successCreate){
            dispatch({type: INTERNSHIP_CREATE_RESET});
            props.history.push(`/internship/${createdInternship._id}/edit`);
        }
        if(successDelete){
            dispatch({type: INTERNSHIP_DELETE_RESET});
        }
        dispatch(listInternships());
    }, [createdInternship, dispatch, props.history, successCreate, successDelete]);

    const deleteHandler = (internship) =>{
        if(window.confirm('Are you sure you want to delete?')){
            dispatch(deleteInternship(internship._id));
        }
    };
    const createHandler = () => {
        dispatch(createInternship());
    };


    return(
        <div>
            <div className="row">
                <h1>Internships</h1>
                <button 
                    type="button" 
                    className="small" 
                    onClick={createHandler}
                >
                    Create Internship
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>COMPANY</th>
                            <th>LOCATION</th>
                            <th>TYPE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {internships.map((internship) => (
                            <tr key = {internship._id}>
                                <td>{internship._id}</td>
                                <td>{internship.name}</td>
                                <td>{internship.company}</td>
                                <td>{internship.location}</td>
                                <td>{internship.type}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="small" 
                                        onClick={() => 
                                            props.history.push(`/internship/${internship._id}/edit`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        type="button" 
                                        className="small" 
                                        onClick = {() => deleteHandler(internship)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}