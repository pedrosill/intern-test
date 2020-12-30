import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { internshipCategoryListReducer, internshipCreateReducer, internshipDeleteReducer, internshipDetailsReducer, internshipListReducer, internshipUpdateReducer } from './reducers/internshipReducers';
import { savedReducer } from './reducers/savedReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSignInReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    saved:{
        savedItems: localStorage.getItem('savedItems')
        ? JSON.parse(localStorage.getItem('savedItems'))
        :[], 
    },       
};
const reducer = combineReducers({
    internshipList: internshipListReducer,
    internshipDetails: internshipDetailsReducer,
    saved: savedReducer,
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    internshipCreate: internshipCreateReducer,
    internshipUpdate: internshipUpdateReducer,
    internshipDelete: internshipDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    internshipCategoryList: internshipCategoryListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;