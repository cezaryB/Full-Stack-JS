import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

const Fragment = React.Fragment

class Header extends Component {
  renderContent() {
    switch (this.props.authentication) {
      case null:
        return null
      case false:
        return (
          <li>
            <a href='/auth/google'>Login with Google</a>
          </li> 
        )
      default:
        return (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px' }}>
              You have: {this.props.authentication.credits} credits
            </li>
            <li>
              <a href='/api/logout'>Logout</a>
            </li>
          </Fragment>
        )
    }
  }
  render() {
    const redirectRoute = this.props.authentication ? '/survey' : '/'
    console.log(this.props.authentication)
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link to={redirectRoute} className='left brand-logo'>Emaily</Link>
          <ul className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ authentication }) => {
  return {
    authentication
  }
}

export default connect(mapStateToProps)(Header)
