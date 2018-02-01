import { FETCH_USER } from '../actions/types'

const INITIAL_STATE = {
  loggedIn: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { loggedIn: true }
    default:
      return state
  }
}