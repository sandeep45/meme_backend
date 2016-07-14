import React, { PropTypes, Component } from 'react'

class PreviewLine extends Component{

  constructor(props){
    super(props);
  };

  _imageUrls = () => {
    const {selectedImageId, selectedGeneratorId, variousImages, text0, text1} = this.props;
    return variousImages.map( (item) => {

      let highlightClass = "";
      let okSignClass = "hide";
      if(item.imageId == selectedImageId && item.generatorId == selectedGeneratorId){
        highlightClass="bg-warning"
        okSignClass = "previewOk"
      }



      return (
        <div className={`col-md-2 ${highlightClass}`}
          key={item.imageId + "-" + item.generatorId}
          onClick={this._imageClicked.bind(this, item.imageId, item.generatorId)}
        >
            <span className={`${okSignClass}`}>
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </span>

            <img className="img-rounded previewImage"
              src={`https://cdn.meme.am/Instance/Preview?imageID=${item.imageId}&generatorTypeID=${item.generatorId}&panels=&text0=${text0}&text1=${text1}`}
            />
        </div>
      );
    });
  };

  _imageClicked = (imageId, generatorId) => {
    const {previewSelected, text0, text1} = this.props;
    console.log("image Clicked: ", imageId, generatorId);
    console.log("text is: " + text0 + " - " + text1);
    previewSelected(imageId, generatorId, text0, text1);
  };

  render() {
    const {variousImages, previewSelected, text} = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Preview - Please select one
        </div>
        <div className="panel-body">
          <div className="row">

            {this._imageUrls()}

          </div>
        </div>
      </div>
    );
  };

}

PreviewLine.propTypes = {
  variousImages: PropTypes.array,
  previewSelected: PropTypes.func.isRequired,
  text0: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired
};

export default PreviewLine;