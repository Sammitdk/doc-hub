export const initialState = {
  user: JSON.parse(localStorage.getItem("User")),
  error: null,
  patients: null,
  searchList: null,
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
    default:
      return state;
  }
};

export default reducer;
