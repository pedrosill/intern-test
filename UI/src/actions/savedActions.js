import Axios from "axios";
import { SAVED_ADD_INTERNSHIP, SAVED_REMOVE_INTERNSHIP } from "../constants/savedConstants";

export const addToSaved = (internshipId) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/internships/${internshipId}`);

    dispatch({
        type: SAVED_ADD_INTERNSHIP,
        payload: {
            internship: data._id,
            name : data.name,
            category : data.category,
            image : data.image,
            company : data.company,
            location : data.location,
            candidates : data.candidates,
            status : data.status,
            type : data.type,
            date : data.date,
            description : data.description,
            institution: data.institution,
        },
    });
    localStorage.setItem('savedItems', JSON.stringify(getState().saved.savedItems)); 
};

export const removeFromSaved = (internshipId) => (dispatch, getState) => {
    dispatch({type: SAVED_REMOVE_INTERNSHIP, payload: internshipId});
    localStorage.setItem('savedItems', JSON.stringify(getState().saved.savedItems));
}