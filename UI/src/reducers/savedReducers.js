import { SAVED_ADD_INTERNSHIP, SAVED_REMOVE_INTERNSHIP } from "../constants/savedConstants";

export const savedReducer = (state = { savedItems: [] }, action) => {
    switch (action.type) {
        case SAVED_ADD_INTERNSHIP:
            const item = action.payload;
            const existItem = state.savedItems.find((x) => x.internship === item.internship);
            if (existItem) {
                return {
                    ...state,
                    savedItems: state.savedItems.map((x) => 
                        x.internship === existItem.internship ? item : x
                    ),
                };
            } else {
                return { ...state, savedItems: [...state.savedItems, item] };
            }
        case SAVED_REMOVE_INTERNSHIP:
            return{ 
                ...state, 
                savedItems: state.savedItems.filter( x => x.internship !== action.payload),
            };
        default:
            return state;
    }

}