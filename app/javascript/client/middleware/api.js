import request from 'superagent'

export const GET_PAGES = 'GET_PAGES'
export const GET_PAGES_SUCCESS = 'GET_PAGES_SUCCESS'
export const GET_PAGES_ERROR = 'GET_PAGES_ERROR'

const PageService = store => dispatch => action => {
  // Pass all actions through by default
  dispatch(action)

  switch (action.type) {

  case GET_PAGES:
    request
      // Connect to the API
      .get('/static_pages')

      // Success
      .then((response) => {
        const data = JSON.parse(response.text)
        dispatch({
          type: GET_PAGES_SUCCESS,
          payload: data
        })
      })

      // Error
      .catch((error) => {
        dispatch({
          type: GET_PAGES_ERROR,
          payload: err
        })
      })
    break

  default:
    break
  }

};

export default pageService
