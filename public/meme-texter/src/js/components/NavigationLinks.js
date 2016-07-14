import React, { PropTypes, Component } from 'react'

import {Link} from 'react-router';

const NavigationLinks = (props) => {
  const {deleteHandler} = props;

  return(
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">SMS Meme's</a>
        </div>
        <div id="navbar" className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li> <Link to="/">Message Builder</Link> </li>
            <li> <Link to="/all_messages">My Messages</Link> </li>
            <li> <Link to="/paginated_phone_numbers">Phone Book</Link> </li>
            <li> <Link to="/dashboard">Old View</Link> </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
           <li>

            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

NavigationLinks.propTypes = { };

export default NavigationLinks

