import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const EMAIL_REQUEST = '@@email/EMAIL_REQUEST';
export const EMAIL_SUCCESS = '@@email/EMAIL_SUCCESS';
export const EMAIL_FAILURE = '@@email/EMAIL_FAILURE';

export const echo = (message) => ({
  [RSAA]: {
      endpoint: '/api/echo/',
      method: 'POST',
      body: JSON.stringify({message: message}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        ECHO_REQUEST, ECHO_SUCCESS, ECHO_FAILURE
      ]
  }
})