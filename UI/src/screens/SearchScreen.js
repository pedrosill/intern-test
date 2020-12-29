import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listInternships } from '../actions/internshipActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Internship from '../components/Internship.js';

export default function SearchScreen(props) {
  const { name = 'all' } = useParams();
  const dispatch = useDispatch();
  const internshipList = useSelector((state) => state.internshipList);
  const { loading, error, internships } = internshipList;
  useEffect(() => {
    dispatch(listInternships({ name: name !== 'all' ? name : '' }));
  }, [dispatch, name]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{internships.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {internships.length === 0 && (
                <MessageBox>No Internship Found</MessageBox>
              )}
              <div className="row center">
                {internships.map((internship) => (
                  <Internship key={internship._id} internship={internship}></Internship>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}