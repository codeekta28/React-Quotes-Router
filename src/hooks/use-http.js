import { useCallback, useReducer } from "react";
// const initialState = {
//   status: startWithPending ? "pending" : null,
//   error: null,
//   data: null,
// };
function reducerFn(state, action) {
  if (action.type === "SEND") {
    return {
      status: "pending",
      error: null,
      data: null,
    };
  }
  if (action.type === "SUCCESS") {
    return {
      status: "completed",
      error: null,
      data: action.responseData,
    };
  }
  if (action.type === "ERROR") {
    return {
      status: "completed",
      error: action.errorMessage,
      data: null,
    };
  }

  return state;
}
function useHttp(requestFunction, startWithPending=false) {
  const [httpState, dispatch] = useReducer(reducerFn, {
    status: startWithPending ? "pending" : null,
    error: null,
    data: null,
  });
//  console.log("useHTTp",requestFunction);
  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({ type: "ERROR", errorMessage: error.message });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    ...httpState,
  };
}
export default useHttp;
