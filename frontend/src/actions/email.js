import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'

export const EMAIL_REQUEST = '@@email/EMAIL_REQUEST';
export const EMAIL_SUCCESS = '@@email/EMAIL_SUCCESS';
export const EMAIL_FAILURE = '@@email/EMAIL_FAILURE';

export const submit = (email) => ({
  [RSAA]: {
      endpoint: '/api/signup/',
      method: 'POST',
      body: JSON.stringify({email: email}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        EMAIL_REQUEST, EMAIL_SUCCESS, EMAIL_FAILURE
      ]
  }
})