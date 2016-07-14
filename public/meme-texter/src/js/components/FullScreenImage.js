import React, { PropTypes, Component } from 'react'

const FullScreenImage = (props) => {

  return(
    <div>
      <img className="fullScreenImage img-rounded"
        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=300%C3%97300&w=300&h=300"
      />
    </div>
  );
};

FullScreenImage.propsTypes = {
}

export default FullScreenImage;

