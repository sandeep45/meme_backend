import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PhoneNumberList from '../components/PhoneNumberList.js'
import PhoneNumberPaginationLine from '../containers/PhoneNumberPaginationLine'

import {updateMessage, initiatePhoneNumberDeletion,
  updatePageNumber, refreshPageOfPhoneNumbers} from '../actions'

class PaginatedPhoneNumbers extends Component {
  constructor(props){
    super(props);
  };
  render(){
    return(
      <div>
        <PhoneNumberList {...this.props} />
        <PhoneNumberPaginationLine />
      </div>
    );
  };
}

PaginatedPhoneNumbers.propTypes = {
  currentPageNumber: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {

  const currentPageNumber = state.phoneNumbers.currentPage;
  const currentPhoneIds = state.pagination.phoneNumbers[currentPageNumber] || [];

  return {
    caption: "Paginated Phone Numbers",
    phoneNumbers: currentPhoneIds.map(i => state.entities.phoneNumbers[i]),
    currentPageNumber: currentPageNumber,
    selectedPhoneNumber: state.message.to,
    selectedPageNumber: state.phoneNumbers.currentPage
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectionOfNumber: (name, number) => {
      dispatch(updateMessage({name, to: number}))
    },
    onDeleteOfNumber: (id) => {
      dispatch(initiatePhoneNumberDeletion(id));
    },
    refresh: (pageNumber) => {
      dispatch(refreshPageOfPhoneNumbers());
    }
  }
};

PaginatedPhoneNumbers = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaginatedPhoneNumbers);

export default PaginatedPhoneNumbers;

