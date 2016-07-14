import React from 'react'
import { connect } from 'react-redux'

import FullScreenImage from '../components/FullScreenImage.js'
import PaginatedPhoneNumbers from '../containers/paginatedPhoneNumbers.js'
import PhoneNumberSearchAndSave from '../containers/PhoneNumberSearchAndSave.js'
import CurrentMessage from '../containers/CurrentMessage.js'
import {buildInstance, updateSelectedPreviewItem} from '../actions'
import {splitTextInToTwo} from '../config/helpers.js'
import VariousImages from '../components/VariousImages.js'
import * as selectors from '../reducers/'

const mapStateToProps = (state, ownProps) => {
  const {text} = state.message;
  return {
    images: state.message.variousImages || [],
    text0: splitTextInToTwo(text)[0],
    text1: splitTextInToTwo(text)[1],
    selectedImageId: state.message.selectedPreviewItem.imageId,
    selectedGeneratorId: state.message.selectedPreviewItem.generatorId
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    previewSelected: (imageId, generatorId) => {
      console.log("you selected: ", imageId, generatorId);
      dispatch(updateSelectedPreviewItem(imageId, generatorId));
    }
  }
};

let MessageBuilder = (props) => {
  return(
    <div>
      <div className="row">
        <div className="col-sm-3">
          <CurrentMessage />
          <PhoneNumberSearchAndSave />
        </div>
        <div className="col-sm-9">
          <VariousImages {...props} />
        </div>
      </div>
    </div>
  );
}

MessageBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBuilder);

export default MessageBuilder;

