import { connect } from 'react-redux'

import PreviewLine from '../components/PreviewLine.js'
import {buildInstance, updateSelectedPreviewItem} from '../actions'
import {splitTextInToTwo} from '../config/helpers.js'

const mapStateToProps = (state, ownProps) => {
  const {text} = state.message;
  return {
    variousImages: state.message.variousImages.slice(0,6),
    text0: splitTextInToTwo(text)[0],
    text1: splitTextInToTwo(text)[1],
    selectedImageId: state.message.selectedPreviewItem.imageId,
    selectedGeneratorId: state.message.selectedPreviewItem.generatorId
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    previewSelected: (imageId, generatorId, text0, text1) => {
      console.log("you selected: ", imageId, generatorId, text0, text1);
      dispatch(updateSelectedPreviewItem(imageId, generatorId));
    }
  }
};

const CurrentPreviewLine = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewLine);

export default CurrentPreviewLine;

