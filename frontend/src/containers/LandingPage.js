import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import * as reducers from '../reducers'

import Landing from '../components/Landing'
import {submit} from '../actions/email'
import {authErrors, isAuthenticated} from '../reducers'

const LandingPage = (props) => {
    if (props.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className="landing-page">
            <Landing {...props}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    errors: authErrors(state),
    isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
    onEmailSubmit: (email) => {
        dispatch(submit(email))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);