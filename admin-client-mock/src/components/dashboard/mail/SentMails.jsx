import React from "react";
import {connect} from "react-redux";
import Mailbox from "./Mailbox";
import MailList from "./MailList";

class SentMails extends React.Component {
  render() {
    return (
      <Mailbox>
        <MailList
          name="Sent Mails"
          list={this.props.sentMails}
          showUnread={false}
          firstColumn="to"
          isInbox={false}
        />
      </Mailbox>
    );
  }
}

export default connect(state => ({sentMails: state.mail.out}))(SentMails);
