import React, { PropTypes, Component } from 'react'

const Notification = (props) => {

  const heading = props.heading || "Sent!";
  const body = props.body || "Your message is away";

  let showClass = "";
  if(props.showNotification === true){
    showClass = "in";
  }else{
    showClass = "hide";
  }
  return(
    <div className={`alert alert-success alert-dismissible fade ${showClass}`} role="alert">
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{heading} </strong> {body}
    </div>
  );
};

Notification.propsTypes = {
  heading: PropTypes.string,
  body: PropTypes.string,
  showNotification: PropTypes.bool.isRequired
}

export default Notification;

