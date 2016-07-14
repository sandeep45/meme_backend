import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

class PhoneNumberList extends Component {
  constructor(props){
    super(props);
  };

  render() {
    const {phoneNumbers, selectedPhoneNumber, onSelectionOfNumber,
      onDeleteOfNumber, refresh} = this.props;

    console.log("in render of PhoneNumberList with: ", phoneNumbers);

    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.caption || "Phone Numbers"}
          <input type="button" value="refresh" className="pull-right"
            onClick={refresh}/>
        </div>
        <div className="panel-body">
          <table className="table table-bordered table-hover table-condensed">
            <thead>
              <tr>
                <th>Id</th><th>Name</th><th>Number</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {phoneNumbers.map( (item) => {
                  return (
                    <tr key={item.id}
                      onClick={onSelectionOfNumber.bind(this, item.name, item.number)}
                      className={selectedPhoneNumber == item.number ? "bg-warning" : "xx"}
                    >
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>
                        <div className="btn-toolbar" role="toolbar" aria-label="...">
                          <input type="button" value="x" className="btn btn-danger"
                            onClick={onDeleteOfNumber.bind(this, item.id)} />
                          <Link to={`/phone_numbers/${item.number}/messages`} className="btn btn-primary">
                            Messages
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };


};

PhoneNumberList.propTypes = {
  caption: PropTypes.string,
  phoneNumbers: PropTypes.array.isRequired,
  selectedPhoneNumber: PropTypes.string.isRequired,
  onSelectionOfNumber: PropTypes.func.isRequired,
  onDeleteOfNumber: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  updateSelectedPage: PropTypes.func
};

export default PhoneNumberList;