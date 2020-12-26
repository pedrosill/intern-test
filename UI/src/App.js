import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions.js';
import PrivateRoute from './components/PrivateRoute.js';
import AdminRoute from './components/AdminRoute.js';
import HomeScreen from './screens/HomeScreen.js';
import InternshipListScreen from './screens/InternshipListScreen.js';
import InternshipScreen from './screens/InternshipScreen.js';
import SavedInternshipsScreen from './screens/MyInternshipsScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import SignInScreen from './screens/SignInScreen.js';
import InternshipEditScreen from './screens/InternshipEditScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';


function App(){

    const saved = useSelector((state) => state.saved);
    const { savedItems } = saved;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    }

    return(
        <BrowserRouter>
            <div className = "grid-container">
                <header className="row">
                    <div>
                    <Link className="brand" to="/">
                        Intern
                    </Link>
                    </div>
                    <div className="nav-links">
                        <li>
                            <Link className="ola" to="/saved"> 
                                My Internships 
                                {
                                    savedItems.length > 0 && (
                                        <span className="badge">{savedItems.length}</span>
                                    )
                                }
                            </Link>
                        </li>
                        <li><Link className="ola" to="/aboutus" >About Us</Link></li>
                        <li><Link className="ola" to="/contacts" >Contacts</Link></li>
                        {
                            userInfo ? (
                                <li className="dropdown">
                                    <Link className="ola" to="#">
                                        {userInfo.name} 
                                    </Link>
                                    <ul className="dropdown-content">
                                        <Link className="ola" to="/profile">
                                            User Profile
                                        </Link>
                                        <Link className="ola" to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </ul>
                                </li>
                            ) :
                            (
                                <li><Link className="ola" to="/signin" >Sign in</Link></li>
                            )
                        }
                        {userInfo && userInfo.isAdmin && (
                            <li className="dropdown">
                            <Link className="ola" to="#admin">
                                Admin 
                            </Link>
                            <ul className="dropdown-content">
                                <Link className="ola" to="/dashboard">
                                    Dashboard
                                </Link>
                                <Link className="ola" to="/internshiplist">
                                    Internships
                                </Link>
                                <Link className="ola" to="/userlist">
                                    Users
                                </Link>
                            </ul>
                        </li>
                        )

                        }
                    </div>
                </header>
                <main>
                    <Route path="/saved/:id?" component={SavedInternshipsScreen}></Route>
                    <Route path="/internship/:id" component={InternshipScreen} exact></Route>
                    <Route path="/internship/:id/edit" component={InternshipEditScreen} exact></Route>
                    <Route 
                        path="/signin" 
                        component={SignInScreen}
                    ></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <PrivateRoute 
                        path="/profile" 
                        component={ProfileScreen}
                    ></PrivateRoute>
                    <AdminRoute 
                        path="/internshiplist" 
                        component={InternshipListScreen}
                    ></AdminRoute>
                    <AdminRoute 
                        path="/userlist" 
                        component={UserListScreen}
                    ></AdminRoute>
                    <AdminRoute 
                        path="/user/:id/edit" 
                        component={UserEditScreen}
                    ></AdminRoute>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
                <footer className="row center">© 2020 by Intern</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;