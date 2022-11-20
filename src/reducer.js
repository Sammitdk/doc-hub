export const initialState = {
  user: JSON.parse(localStorage.getItem("User")),
  error: null,
  patients: null,
  searchList: null,
  incorrectIdPass: null,
  dialog: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.user,
      };
    case "UserAlreadyExist":
      return {
        ...state,
        error: action.error,
      };
    case "setPatients":
      return {
        ...state,
        patients: action.patients,
      };
    case "patientsSearch":
      return {
        ...state,
        searchList: action.searchList,
      };
    case "WrongIdPass":
      return {
        ...state,
        incorrectIdPass: action.incorrectIdPass,
      };
    case "setDialog":
      return {
        ...state,
        dialog: action.dialog,
      };
    default:
      return state;
  }
};

export default reducer;
