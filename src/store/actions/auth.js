const SUCCESS = "AUTH_SUCCESS";
const FAILURE = "AUTH_FAILURE";

const success = (payload) =>{
  console.log(payload)
  return {
    type: SUCCESS,
    payload,
  }
};

const failure = (payload) => ({
  type: FAILURE,
  payload,
});

export const auth = {
  SUCCESS,
  FAILURE,
  success,
  failure,
};
