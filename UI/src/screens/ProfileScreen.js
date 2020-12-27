import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, signout, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');

    const userSignin = useSelector( state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdateProfile = useSelector( state => state.userUpdateProfile);
    const {
        success: successUpdate, 
        error: errorUpdate, 
        loading : loadingUpdate,
    } = userUpdateProfile;

    const dispatch = useDispatch();

    useEffect(() =>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else{
            setName(user.Name);
            setEmail(user.Email);
            if(user.company){
                setCompanyName(user.company.name);
                setCompanyLogo(user.company.logo);
                setCompanyDescription(user.company.description);
            }
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(
                updateUserProfile({ 
                    userId: user._id, 
                    name, 
                    email, 
                    password, 
                    companyName,
                    companyLogo,
                    companyDescription,
                })
            );
        }
    };

    const signoutHandler = () => {
        dispatch(signout());
    };

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading? (
                        <LoadingBox></LoadingBox>
                    ) : error? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                    <>  
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                        <MessageBox variant="success">Profile Updated Successfully</MessageBox>
                    )}
                        <div>
                            <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input> 
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input> 
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                ></input> 
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></input> 
                        </div>
                        {
                            user.isCompany && (
                                <>
                                    <div>
                                        <h2>Company</h2>
                                    </div>
                                    <div>
                                        <label htmlFor="companyName">Company Name</label>
                                        <input 
                                            id="companyName" 
                                            type="text" 
                                            placeholder="Enter Company Name"
                                            value={companyName} 
                                            onChange={(e) => setCompanyName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="companyLogo">Company Logo</label>
                                        <input 
                                            id="companyLogo" 
                                            type="text" 
                                            placeholder="Enter Company Logo"
                                            value={companyLogo} 
                                            onChange={(e) => setCompanyLogo(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="companyDescription">Company Description</label>
                                        <input 
                                            id="companyDescription" 
                                            type="text" 
                                            placeholder="Enter Company Description"
                                            value={companyDescription} 
                                            onChange={(e) => setCompanyDescription(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </>
                            )
                        }
                        <div>
                            <label/>
                            <button className="primary" type="submit">
                                Update
                            </button>
                            <div>
                                <button className="primary" to="/" onClick={signoutHandler}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
    
}