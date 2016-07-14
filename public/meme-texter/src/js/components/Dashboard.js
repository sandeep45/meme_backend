import React from 'react';

import AllMessages from '../containers/AllMessages.js'
import MostUsedFivePhoneNumbers from '../containers/MostUsedFivePhoneNumbers.js'
import CurrentMessage from '../containers/CurrentMessage.js'
import CurrentPreviewLine from '../containers/CurrentPreviewLine.js'
import MessageNotification from '../containers/MessageNotification.js'

const Dashboard = (props) => {
  return(
    <div>
      <MostUsedFivePhoneNumbers />
      <CurrentPreviewLine />
      <CurrentMessage />
      <MessageNotification />
    </div>
  )
}

export default Dashboard

