import mail, {mailActionType, mailState} from "./mail";

describe("Mail reducer should set state correctly...", () => {
  it("when data is loaded correctly", () => {
    const newState = mail(null, {
      type: mailActionType.LOAD,
      in: [
        {isViewed: false},
        {isViewed: true},
        {isViewed: true},
        {isViewed: false},
      ],
      out: [{}, {}],
    });
    expect(newState.in.length).toEqual(4);
    expect(newState.out.length).toEqual(2);
    expect(newState.unRead).toEqual(2);
    expect(newState.state).toEqual(mailState.LOADED);
    expect(newState.error).not.toBeDefined();
  });

  it("when data is not loaded", () => {
    const newState = mail(null, {
      type: mailActionType.LOAD_ERROR,
      error: "some error",
    });
    expect(newState.in.length).toEqual(0);
    expect(newState.out.length).toEqual(0);
    expect(newState.unRead).toEqual(-1);
    expect(newState.state).toEqual(mailState.ERROR);
    expect(newState.error).toEqual("some error");
  });

  it("when a mail in inbox is viewed", () => {
    const newState = mail(
      {
        in: [
          {id: 1, isViewed: false},
          {id: 2, isViewed: true},
          {id: 3, isViewed: true},
          {id: 4, isViewed: false},
        ],
        out: [{}, {}],
        unRead: 2,
        state: mailState.LOADED,
        error: undefined,
      },
      {
        type: mailActionType.VIEWED,
        mailId: 4,
      },
    );
    expect(newState.in.length).toEqual(4);
    expect(newState.out.length).toEqual(2);
    expect(newState.unRead).toEqual(1);
    expect(newState.state).toEqual(mailState.LOADED);
    expect(newState.error).not.toBeDefined();
  });
});
