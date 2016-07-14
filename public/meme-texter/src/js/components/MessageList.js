import React, { PropTypes, Component } from 'react'

import {getRecordById} from '../config/helpers.js'

const bodyData = (body) => {
  if(body.indexOf("https") == 0){
    return (
      <img src={body} className="imagePreviewInTable" />
    );
  }else{
    return body
  }
}

const MessageList = (props) => {
  const {messages, phoneNumbers, refresh} = props;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {props.caption || "Messages"}
        <input type="button" value="refresh" className="pull-right"
          onClick={refresh}/>
      </div>
      <div className="panel-body">
        <table className="table table-bordered table-hover table-condensed">
          <thead>
            <tr>
              <th>Id</th><th>Body</th>
              <th>text</th><th>Tag</th>
              <th>Direction</th><th>To Name</th>
            </tr>
          </thead>
          <tbody>
            {messages.map( (item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{bodyData(item.body)}</td>
                    <td>{item.text}</td>
                    <td>{item.tag}</td>
                    <td>{item.direction}</td>
                    <td>{getRecordById(phoneNumbers, item.phone_number_id).name }</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

MessageList.propTypes = {
  caption: PropTypes.string,
  messages: PropTypes.array.isRequired,
  phoneNumbers: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
};

export default MessageList;