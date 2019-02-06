import React from "react";
import {connect} from "react-redux";
import MailList from "./MailList";
import Mailbox from "./Mailbox";

class Inbox extends React.Component {
  render() {
    return (
      <Mailbox>
        <MailList
          name="Inbox"
          list={this.props.inbox}
          showUnread={true}
          firstColumn="from"
          isInbox={true}
        />
      </Mailbox>
    );
  }
}

export default connect(state => ({inbox: state.mail.in}))(Inbox);
