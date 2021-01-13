import {
    SCHEDULE_CLASS,
    UNSCHEDULE_CLASS,
    ADD_PASS,
    EDIT_PASS,
    DELETE_PASS,
    DELETE_CLASS_FAILURE,
    DELETE_CLASS_SUCCESS,
    DELETE_CLASS_START,
    ADD_CLASS_FAILURE,
    ADD_CLASS_SUCCESS,
    ADD_CLASS_START,
    EDIT_CLASS_FAILURE,
    EDIT_CLASS_SUCCESS,
    EDIT_CLASS_START,
    FETCHCLASS_SUCCESS,
    ADD_USER,
    REMOVE_USER,
    GET_CLASSES_START,
    GET_CLASSES_SUCCESS,
    GET_CLASSES_FAILURE,
    GET_REGISTERED_CLIENTS_START,
    GET_REGISTERED_CLIENTS_SUCCESS,
    GET_REGISTERED_CLIENTS_FAILURE,
  } from "../actions/index";
  
  const initialState = {
    //holder
    classes: [
    ],
    passes: [
      {
        workoutName: "Crossfit at the Beach",
        instructor: "Stephanie",
        client: "Simone",
        classesRemaining: 3,
        id: 0
      },
      {
        workoutName: "Yoga to Fit",
        instructor: "Johnny",
        client: "Byron",
        classesRemaining: 8,
        id: 1
      },
      {
        workoutName: "Cross Training",
        instructor: "Alan",
        client: "Peter",
        classesRemaining: 3,
        id: 2
      },
      {
        workoutName: "Strength 101",
        instructor: "James",
        client: "Max",
        classesRemaining: 7,
        id: 3
      },
      {
        workoutName: "Ab Ripper X",
        instructor: "Jessica",
        client: "Julissa",
        classesRemaining: 4,
      }
    ],
    registeredClients: [],
    user: "",
    isFetching: false,
    error: '',
    isPosting: false,
    isEditing: false
  };
  
  export const classReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case FETCHCLASS_SUCCESS:
        return {
          ...state,
          classes: action.payload
  
        }
      case SCHEDULE_CLASS:
        return {
          ...state,
          registeredClient: [...state.registeredClient, action.payload],
          classes: [...state.classes.filter((item, index) => {
            return item !== action.payload;
          })]
        };
      case UNSCHEDULE_CLASS:
        return {
          ...state,
          registeredClient: [
            ...state.registeredClient.filter((item, index) => {
              return item !== action.payload;
            })
          ],
          classes: [...state.classes, action.payload]
        };
      case ADD_PASS:
        return {
          ...state,
          passes: [...state.passes, action.payload]
        };
      case DELETE_PASS:
        return {
          ...state,
          passes: [
            ...state.passes.filter((item, index) => {
              return item !== action.payload;
            })
          ]
        };
      case EDIT_PASS:
        return {
          ...state,
          passes: state.passes.map(item => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          })
        };
      case ADD_CLASS_START:
        return {
          ...state,
          isPosting: true
        };
      case ADD_CLASS_SUCCESS:
        return {
          ...state,
          isPosting: false,
          error: '',
          twoClasses: [...state.twoClasses, action.payload]
        };
      case ADD_CLASS_FAILURE:
        return {
          ...state,
          isPosting: false,
          error: action.payload.data.Error
        };
      case EDIT_CLASS_START:
        return {
          ...state,
          isEditing: true
        }
      case EDIT_CLASS_SUCCESS:
        return {
          ...state,
          isEditing: false,
          error: '',
          twoClasses: state.twoClasses.map(item => {
            if (item.id === action.payload.id) {
              return { ...action.payload }
            }
            return item
          })
        };
      case EDIT_CLASS_FAILURE:
        return {
          ...state,
          isEditing: false,
          error: action.payload
        };
      case DELETE_CLASS_START:
        return {
          ...state,
          isPosting: true
        };
      case DELETE_CLASS_SUCCESS:
        const filteredClasses = state.classes.filter(c => {
            return c.id !== action.payload
        })
        return {
          ...state,
          isPosting: false,
          error: '',
          classes: filteredClasses,
          twoClasses: state.twoClasses.filter(c => c.id !== action.payload)
        };
      case DELETE_CLASS_FAILURE:
        return {
          ...state,
          isPosting: false,
          error: action.payload.data.Error
        };
      case GET_CLASSES_START:
        return {
          ...state,
          isFetching: true
        };
      case GET_CLASSES_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: '',
          classes: action.payload,
          twoClasses:
            action.payload.sort((a, b) => a.id - b.id)
        };
      case GET_CLASSES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };

      case GET_REGISTERED_CLIENTS_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: '',
          registeredClients: action.payload
        };
      case ADD_USER:
        return {
          ...state,
          user: action.payload
        }
      case REMOVE_USER:
        return {
          ...state,
          user: ''
        }
      default:
        return state;
    }
  };