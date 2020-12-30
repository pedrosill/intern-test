import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listInternships } from '../actions/internshipActions.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import Internship from '../components/Internship.js';

export default function SearchScreen(props) {

  const { 
    name = 'all', 
    category='all',
  } = useParams();

  const dispatch = useDispatch();

  const internshipList = useSelector((state) => state.internshipList);
  const { loading, error, internships} = internshipList;

  const internshipCategoryList = useSelector((state) => state.internshipCategoryList);
  const { 
    loading: loadingCategories, 
    error: errorCategories, 
    categories 
  } = internshipCategoryList;

  useEffect(() => {
    dispatch(
      listInternships({ 
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '' ,
      })
    );
  }, [category, dispatch, name]);

  const getFilterUrl = (filter) =>{
    const filterCategory = filter.category || category;
    const filterName= filter.name || name;
    return `/search/category/${filterCategory}/name/${filterName}`;
  };

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
          {loadingCategories ? (
          <LoadingBox></LoadingBox>
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          <ul>
            <li>
              <Link
                className={'all' === category ? 'active' : ''}
                to={getFilterUrl({ category: 'all' })}
              >
                Any Department
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={c === category ? 'active' : ''}
                  to={getFilterUrl({ category: c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        )}
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