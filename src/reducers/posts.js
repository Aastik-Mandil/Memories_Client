import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

const initialState = {
    isLoading: false,
    posts: [],
    post: null,
    currentPage: 0,
    numberOfPage: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage,
                isLoading: false,
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.post,
                isLoading: false,
            };
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data,
                isLoading: false,
            };
        case CREATE:
            return {
                ...state,
                posts: [...state.posts, action.payload],
                isLoading: false,
            };
        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
                isLoading: false,
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload),
                isLoading: false,
            };
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post),
                isLoading: false
            };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            };
        default:
            return state;
    }
}