import React, { PropTypes, Component } from 'react'

class PaginationLine extends Component {

  constructor(props){
    super(props);
  };

  componentWillMount(){
    this.props.onPageNumberClick(1);
  };

  render(){
    const {startNumber, endNumber, currentPageNumber} = this.props;

    console.log("rendering with startNumber: ", startNumber, " and endNumber:", endNumber);
    return (
      <nav style={{textAlign:"center"}}>
        <ul className="pagination">
          <li onClick={this._backArrowClickHandler}>
            <a href="javascript:void(0);" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...Array(10).fill(1)].map( (item, idx) => {
              let tempNum = startNumber + idx
              return (
                <li key={tempNum} className={currentPageNumber == tempNum ? "active" : ""}
                  onClick={this._paginationClickHandler}>
                  <a href="javascript:void(0);">{tempNum}</a>
                </li>
              );
            })
          }
          <li onClick={this._forwardClickHandler}>
            <a href="javascript:void(0);" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
        </ul>
      </nav>
    );
  };

  _paginationClickHandler = (evt) => {
    console.log("on click of pagination button: ", evt.target.innerText);
    this.props.onPageNumberClick(parseInt(evt.target.innerText));
  };

  _forwardClickHandler = (evt) => {
    console.log("on forward arrow click button: ", evt.target.innerText);
    this.props.updateStartNumber(this.props.endNumber+1)
    this.props.updateEndNumber(this.props.endNumber+10)
    this.props.onPageNumberClick(this.props.endNumber+1);
  };

  _backArrowClickHandler = (evt) => {
    console.log("on back arrow click button: ", evt.target.innerText);
    this.props.updateStartNumber(this.props.startNumber-10)
    this.props.updateEndNumber(this.props.startNumber-1)
    this.props.onPageNumberClick(this.props.startNumber-1);
  }

};

PaginationLine.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  startNumber: PropTypes.number.isRequired,
  endNumber: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,

  updateStartNumber: PropTypes.func.isRequired,
  updateEndNumber: PropTypes.func.isRequired,
  onPageNumberClick: PropTypes.func.isRequired
}

export default PaginationLine