import React, { PropTypes, Component } from 'react';

class PhoneNumberListGroup extends Component {
  constructor(props){
    super(props);
  };

  render(){
    const {phoneNumbers,onSelectionOfNumber,selectedPhoneNumber} = this.props;
    return(
      <div className="list-group">
        {phoneNumbers.map(p => {
          let activeClass = p.number == selectedPhoneNumber ? "active" : "";
          return (
            <a href="javascript:void(0);" className={`list-group-item ${activeClass}`}
              key={p.number}
              onClick={onSelectionOfNumber.bind(this, p.name, p.number)}
            >
              {p.name} @ {p.number}
              <span className="badge">{p.messages.length}</span>
            </a>
          );
        }) }
    </div>
    );
  };
}

PhoneNumberListGroup.propTypes = {
  phoneNumbers: PropTypes.array,
  onSelectionOfNumber: PropTypes.func
};

PhoneNumberListGroup.defaultProps = {
  phoneNumbers: [
    {
      name: "Sandeep",
      number: "123.123.1234",
      messages: [1,2,3]
    },
    {
      name: "Rodrigo",
      number: "234.234.2345",
      messages: [1,2,4,5,6]
    },
    {
      name: "Yo Yo Honey Singh",
      number: "345.345.3456",
      messages: []
    }
  ],
  onSelectionOfNumber: (evt) => { console.log("phone number line was selected by the UI");  }
}

export default PhoneNumberListGroup;