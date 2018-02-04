import React, { Component } from 'react'
import { connect } from 'react-redux'

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
          <li>
            <a>You are logged in</a>
          </li>
        )
    }
  }
  render() {
    console.log(this.props.authentication)
    return (
      <nav>
        <div className='nav-wrapper'>
          <a className='left brand-logo'>Emaily</a>
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
