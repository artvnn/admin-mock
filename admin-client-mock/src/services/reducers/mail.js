const mailState = {
  LOADING: 0,
  LOADED: 1,
  ERROR: 2,
};

const mailActionType = {
  LOAD: 10,
  LOAD_ERROR: 11,
  VIEWED: 12,
};

const calculateUnRead = list =>
  list.reduce((total, current) => (current.isViewed ? total : total + 1), 0);

export default function mail(
  state = {
    in: [],
    out: [],
    unRead: -1,
    state: mailState.LOADING,
    error: undefined,
  },
  action,
) {
  switch (action.type) {
    case mailActionType.LOAD:
      return {
        in: action.in,
        out: action.out,
        unRead: calculateUnRead(action.in),
        state: mailState.LOADED,
        error: undefined,
      };
    case mailActionType.LOAD_ERROR:
      return {
        in: [],
        out: [],
        unRead: -1,
        state: mailState.ERROR,
        error: action.error,
      };
    case mailActionType.VIEWED:
      const newInBox = state.in.map(mail => {
        if (mail.id === action.mailId) {
          return {...mail, isViewed: true};
        } else return mail;
      });
      return {...state, in: newInBox, unRead: calculateUnRead(newInBox)};
    default:
      return state;
  }
}

export {mailActionType, mailState};
