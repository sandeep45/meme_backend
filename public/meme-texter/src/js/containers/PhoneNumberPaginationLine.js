import React, { PropTypes, Component } from 'react'

import {connect} from 'react-redux'

import {fetchPhoneNumbers, updatePageNumber, updateStartNumber, updateEndNumber} from '../actions'

import PaginationLine from '../components/PaginationLine.js'

const mapStateToProps = (state, ownProps) => {
  return {
    currentPageNumber: state.phoneNumbers.currentPage,
    startNumber: state.phoneNumbers.startNumber,
    endNumber: state.phoneNumbers.endNumber,
    itemsPerPage: 3
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateStartNumber: (number) => {
      dispatch(updateStartNumber(number));
    },
    updateEndNumber: (number) => {
      dispatch(updateEndNumber(number));
    },
    onPageNumberClick: (pageNumber) => {
      dispatch(updatePageNumber(pageNumber));
      dispatch(fetchPhoneNumbers(pageNumber));
    }
  };
};

const PhoneNumberPaginationLine = connect(mapStateToProps, mapDispatchToProps)(PaginationLine);

export default PhoneNumberPaginationLine