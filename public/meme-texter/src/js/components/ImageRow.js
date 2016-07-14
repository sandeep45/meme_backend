import React, {PropTypes, Component} from 'react'

class ImageRow extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {images, text0, text1, selectedImageId, selectedGeneratorId} = this.props;

    return(
      <div className="row">
        { images.map( item => {

            let url = `https://cdn.meme.am/Instance/Preview?imageID=${item.imageId}`+
              `&generatorTypeID=${item.generatorId}&panels=&text0=${text0}&text1=${text1}`

            return (
              <div className="col-xs-12 col-sm-6 col-md-3" key={url}
                onClick={this._imageClicked.bind(this, item.imageId, item.generatorId)}
              >
                <a href="javascript:void(0);" className="">
                  <img src={url}
                    alt="..." className="img-rounded previewImage img-responsive"
                  />
                  {this._putTickMark(item)}
                </a>
              </div>
            );
          } )
        }
      </div>
    );
  };

  _imageClicked = (imageId, generatorId) => {
    console.log("image clicked: ", imageId, generatorId);
    this.props.previewSelected(imageId, generatorId);
  };

  _putTickMark = (item) => {
    console.log("in _putTickMark");
    const {selectedImageId, selectedGeneratorId} = this.props;
    if(item.imageId == selectedImageId && item.generatorId == selectedGeneratorId){
      console.log("in in in _putTickMark");
      return (
        <span className="previewOk">
          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
        </span>
      );
    }else{
      return "";
    }
  }
}

ImageRow.propType = {
  images: PropTypes.array.isRequired,
  text0: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  previewSelected: PropTypes.func.isRequired
}

ImageRow.defaultProps = {

}

export default ImageRow;

