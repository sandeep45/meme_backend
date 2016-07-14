import appCss from '../../css/app.css'

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import NavigationLinks from '../components/NavigationLinks.js'
import {fetchPhoneNumbers, fetchMessages, doSearch} from "../actions/"

class App extends Component{

  constructor(props){
    super(props);
  };

  componentWillMount() {
   this.props.loadData();
  }

  render(){
    return(
      <div>
        <NavigationLinks />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state, ownProps) => {
  return { }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: () => {
      dispatch(fetchPhoneNumbers());
      dispatch(fetchMessages());
      dispatch(doSearch(store.getState().message.tag));
    }
  }
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;

