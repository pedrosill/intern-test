import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToSaved, removeFromSaved } from '../actions/savedActions';
import MessageBox from '../components/MessageBox';

export default function SavedInternshipsScreen(props) {
    const internshipId = props.match.params.id;

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const dispatch = useDispatch();

    useEffect(() => {
        if (internshipId) {
            dispatch(addToSaved(internshipId));
        }
    }, [dispatch, internshipId]);

    const applyHandler = () => {
        props.history.push('/signin?redirect=apply')
    }

    const removeFromSavedHandler = (id) => {
        dispatch(removeFromSaved(id));
    }

    return (
        <div className="row top">
            <div className="col-2">
                <h1>My internships</h1>
                {savedItems.length === 0 ?
                    (
                        <MessageBox>
                            0 internships saved.
                            <Link to="/">
                                <br></br>Save an internship!
                            </Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {
                                savedItems.map((item) => (
                                    <li key={item.internship}>
                                        <div className="row">
                                            <div>
                                                <Link to={`/internship/${item.internship}`}>
                                                    <img className="small"
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="min">
                                                <Link to={`/internship/${item.internship}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <button className="primary block" onClick={applyHandler} disabled={savedItems.length === 0}> Apply </button>
                                            </div>
                                            <div>
                                                <button className="primary block" onClick={() => removeFromSavedHandler(item.internship)}> Delete </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    );

}