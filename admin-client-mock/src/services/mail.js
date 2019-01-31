import {post} from "./server";
import store from "./store";
import {mailActionType} from "./reducers/mail";

const validateMail = (to, cc, subject, body) => {
  let errors = [];
  if (to.length < 1) errors.push("Please add receipients");
  if (subject.trim().length === 0) errors.push("Please specify a subject");
  if (body.trim().length === 0) errors.push("Email cannot be empty");
  return errors;
};

const sendMail = (to, cc, subject, body, cb) => {
  post("mailbox/send", {to, cc, subject, body})
    .then(res => {
      loadMailbox();
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    });
};

const loadMailbox = () => {
  const {dispatch} = store;
  post("mailbox")
    .then(res => {
      const mailbox = res.data;
      dispatch({type: mailActionType.LOAD, in: mailbox.in, out: mailbox.out});
    })
    .catch(err => {
      dispatch({type: mailActionType.LOAD_ERROR, err});
    });
};

const mailWasViewed = mailId => {
  const {dispatch} = store;
  post("mailbox/view", {mailId})
    .then(res => {
      dispatch({type: mailActionType.VIEWED, mailId: mailId});
    })
    .catch(err => {
      // TODO: currently this is ignored
    });
};

const deleteMails = (isInbox, selectedIds) => {
  post("mailbox/delete", {isInbox, selectedIds})
    .then(res => {
      loadMailbox();
    })
    .catch(err => {
      // TODO: currently this is ignored
    });
};

export {sendMail, validateMail, loadMailbox, mailWasViewed, deleteMails};
