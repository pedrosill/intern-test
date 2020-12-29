import Axios from 'axios';
import { 
    INTERNSHIP_UPDATE_REQUEST, 
    INTERNSHIP_UPDATE_SUCCESS, 
    INTERNSHIP_UPDATE_FAIL, 
    INTERNSHIP_CREATE_FAIL, 
    INTERNSHIP_CREATE_REQUEST, 
    INTERNSHIP_CREATE_SUCCESS, 
    INTERNSHIP_DETAILS_FAIL, 
    INTERNSHIP_DETAILS_REQUEST, 
    INTERNSHIP_DETAILS_SUCCESS, 
    INTERNSHIP_LIST_FAIL, 
    INTERNSHIP_LIST_REQUEST, 
    INTERNSHIP_LIST_SUCCESS, 
    INTERNSHIP_DELETE_FAIL, 
    INTERNSHIP_DELETE_REQUEST, 
    INTERNSHIP_DELETE_SUCCESS, 
} from "../constants/internshipConstants";

export const listInternships = ({institution='', name=''}) => async (dispatch) => {
    dispatch({
        type: INTERNSHIP_LIST_REQUEST
    });
    try{
        const { data } = await Axios.get(
            `/api/internships?institution=${institution}&name=${name}`
        );
        dispatch({ type: INTERNSHIP_LIST_SUCCESS, payload: data});
    } catch(error){
        dispatch({ type: INTERNSHIP_LIST_FAIL, payload : error.message});
    }
};

export const detailsInternship = (internshipId) => async(dispatch) =>{
    dispatch({type: INTERNSHIP_DETAILS_REQUEST, payload: internshipId});
    try{
        const {data} = await Axios.get(`/api/internships/${internshipId}`);
        dispatch({
            type: INTERNSHIP_DETAILS_SUCCESS, 
            payload: data
        });
    } catch(error){
        dispatch({
            type: INTERNSHIP_DETAILS_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const createInternship = () => async (dispatch, getState) =>{
    dispatch({type: INTERNSHIP_CREATE_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.post
            ('/api/internships', 
            {}, 
            {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            }   
        );
        dispatch ({
            type: INTERNSHIP_CREATE_SUCCESS,
            payload: data.internship,
        })
    } catch (error){
        const message= error.response && error.response.data.message 
        ? error.response.data.message
        : error.message;
        dispatch({type: INTERNSHIP_CREATE_FAIL, payload: message});
    }
};

export const updatedInternship = (internship) => async(dispatch, getState) => {
    dispatch({type: INTERNSHIP_UPDATE_REQUEST, payload: internship});
    const {userSignin : {userInfo}} = getState();
    try{
        const {data} = await Axios.put(`/api/internships/${internship._id}`, internship, {
            headers: {authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: INTERNSHIP_UPDATE_SUCCESS, payload: data});
    }catch (error){
        const message = 
        error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({type: INTERNSHIP_UPDATE_FAIL, error: message});
    }
};

export const deleteInternship = (internshipId) => async(dispatch, getState) => {
    dispatch({type: INTERNSHIP_DELETE_REQUEST, payload: internshipId});
    const {userSignin: {userInfo}} = getState();
    try{
        const { data } = Axios.delete(`/api/internships/${internshipId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: INTERNSHIP_DELETE_SUCCESS, payload: data});
    } catch (error){
        const message = 
        error.response && error.response.data.message 
            ? error.response.data.message
            : error.message;
        dispatch({type: INTERNSHIP_DELETE_FAIL, payload: message});
    }
};