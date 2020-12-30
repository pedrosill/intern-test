import { INTERNSHIP_CATEGORY_LIST_FAIL, INTERNSHIP_CATEGORY_LIST_REQUEST, INTERNSHIP_CATEGORY_LIST_SUCCESS, INTERNSHIP_CREATE_REQUEST, INTERNSHIP_CREATE_RESET, INTERNSHIP_CREATE_SUCCESS, INTERNSHIP_DELETE_FAIL, INTERNSHIP_DELETE_REQUEST, INTERNSHIP_DELETE_RESET, INTERNSHIP_DELETE_SUCCESS, INTERNSHIP_DETAILS_FAIL, INTERNSHIP_DETAILS_REQUEST, INTERNSHIP_DETAILS_SUCCESS, INTERNSHIP_LIST_FAIL, INTERNSHIP_LIST_REQUEST, INTERNSHIP_LIST_SUCCESS, INTERNSHIP_UPDATE_FAIL, INTERNSHIP_UPDATE_REQUEST, INTERNSHIP_UPDATE_RESET, INTERNSHIP_UPDATE_SUCCESS } from "../constants/internshipConstants";

export const internshipListReducer = (state = { loading: true, internships: [] }, action) => {
    switch(action.type){
        case INTERNSHIP_LIST_REQUEST:
            return {loading: true};
        case INTERNSHIP_LIST_SUCCESS:
            return {loading: false, internships: action.payload};
        case INTERNSHIP_LIST_FAIL:
            return {loading: false, error: action.payload};
        default :
            return state;    
    }
};

export const internshipCategoryListReducer = (state = { loading: true, internships: [] }, action) => {
    switch(action.type){
        case INTERNSHIP_CATEGORY_LIST_REQUEST:
            return {loading: true};
        case INTERNSHIP_CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
        case INTERNSHIP_CATEGORY_LIST_FAIL:
            return {loading: false, error: action.payload};
        default :
            return state;    
    }
};

export const internshipDetailsReducer = (state = {loading: true}, action) =>{
    switch(action.type){
        case INTERNSHIP_DETAILS_REQUEST:
            return {loading: true};
        case INTERNSHIP_DETAILS_SUCCESS:
            return {loading : false, internship: action.payload };
        case INTERNSHIP_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const internshipCreateReducer = (state= {}, action) =>{
    switch(action.type){
        case INTERNSHIP_CREATE_REQUEST:
            return {loading: true};
        case INTERNSHIP_CREATE_SUCCESS:
            return {loading: false, success: true, internship: action.payload};
        case INTERNSHIP_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        case INTERNSHIP_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const internshipUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case INTERNSHIP_UPDATE_REQUEST:
            return {loading: true};
        case INTERNSHIP_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case INTERNSHIP_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case INTERNSHIP_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const internshipDeleteReducer = (state = {}, action) => {
    switch (action.type){
        case INTERNSHIP_DELETE_REQUEST:
            return {loading: true};
        case INTERNSHIP_DELETE_SUCCESS:
            return {loading: false, success: true};
        case INTERNSHIP_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case INTERNSHIP_DELETE_RESET:
            return {};
        default:
            return state;
    }
};