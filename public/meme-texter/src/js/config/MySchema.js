import { Schema, arrayOf } from 'normalizr';

export const phoneNumber = new Schema('phoneNumbers');
export const message = new Schema('messages');

phoneNumber.define({
  messages: arrayOf(message)
});

message.define({
  phone_number: phoneNumber
});

