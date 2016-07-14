import React, { PropTypes, Component } from 'react'

import ImageRow from '../components/ImageRow.js'

class VariousImages extends Component{

  constructor(props){
    super(props);
  };

  _imageUrls = () => {
    const {selectedImageId, selectedGeneratorId, images, text0, text1} = this.props;
    return images.map( (item) => {

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
    const {images, ...restOfThem} = this.props;

    return (
      <div>
        <ImageRow images={images.slice(0,4)} {...restOfThem}/>
        <ImageRow images={images.slice(4,8)} {...restOfThem}/>
        <ImageRow images={images.slice(8,12)} {...restOfThem}/>
      </div>
    );
  };

}

VariousImages.propTypes = {
  images: PropTypes.array.isRequired,
  previewSelected: PropTypes.func.isRequired,
  text0: PropTypes.string,
  text1: PropTypes.string
};

VariousImages.defaultProps = {
  previewSelected: () => {},
  text0: "Hello",
  text1: "World"
}

export default VariousImages;