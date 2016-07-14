import React from "react"
import { Route, IndexRoute } from "react-router"

import App from "../containers/App"
import Dashboard from "../components/Dashboard"
import PaginatedPhoneNumbers from "../containers/PaginatedPhoneNumbers.js"
import AllPhoneNumbers from "../containers/AllPhoneNumbers.js"
import AllMessages from "../containers/AllMessages.js"
import MessagesWithSpecificNumber from "../containers/MessagesWithSpecificNumber.js"

import MessageBuilder from "../containers/MessageBuilder.js"
import PhoneNumberSearchAndSave from "../containers/PhoneNumberSearchAndSave.js"

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={MessageBuilder} />
    <Route path="/all_messages" component={AllMessages} />
    <Route path="/paginated_phone_numbers" component={PaginatedPhoneNumbers} />
    <Route path="/all_phone_numbers" component={AllPhoneNumbers} />
    <Route path="/phone_numbers/:phone_number/messages" component={MessagesWithSpecificNumber} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/phoneNumberSearchAndSave" component={PhoneNumberSearchAndSave} />

  </Route>
);

export default routes;
