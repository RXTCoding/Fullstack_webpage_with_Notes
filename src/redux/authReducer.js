// The way we've set up this reducer is pretty straightforward.
// We have a "user" piece of state that will default to null.
// This way if the user is null we know that no one is logged in.
// initial state
const initialState = {
  user: null
}

// We've set up an action type of SET_USER that we will use when
// we register or log in to save our user information to redux.
// action types
const SET_USER = "SET_USER"
// action builders
// when the setUser action builder is called it will take in a user
// object and build an action object that will be passed to our reducer.
// the type of the action will be SET_USER and the payload will be the
// user object. The reducer will use this action object to determine
// how it is supposed to update our redux state.
export function setUser(user){
  return {
    type: SET_USER,
    payload: user
  }
}
// reducer
// Our reducer currently just takes in our current redux state and an action
// that will inform it how to update the redux state. In our case we only have
// the 1 case but you can see that if the action type that our reducer receives
// is SET_USER then it knows it's supposed to take the action payload and save
// that as the user.
export default function authReducer(state = initialState, action){
  switch(action.type){
    case SET_USER:
      return {...state, user: action.payload}
    default:
      return {...state}
  }
}
// Next go look at ./cartReducer to see how we set up our second reducer