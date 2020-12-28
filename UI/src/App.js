import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
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
import Navbar from './components/Navbar/Navbar.js';



function App(){

    return(
        <BrowserRouter>
            <div className = "grid-container">
                <Navbar/>
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