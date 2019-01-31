import {authState, authActionType} from "./auth";
import auth, {defaultUser} from "./auth";

describe("Auth reducer must set state correctly...", () => {
  it("when trying to login", () => {
    const newState = auth(null, {
      type: authActionType.LOGIN_TRY,
      digest: "someDigest",
    });
    expect(newState.digest).toEqual("someDigest");
    expect(newState.user).toEqual(defaultUser);
    expect(newState.state).toEqual(authState.LOGGING_IN);
  });

  it("after login", () => {
    const newUser = {
      id: "manoj",
      name: "Manoj Kumar A",
      designation: "Art Director",
      role: "user",
    };
    const newState = auth(
      {user: defaultUser, digest: "someDigest"},
      {
        type: authActionType.LOGIN_OK,
        user: newUser,
      },
    );
    expect(newState.digest).toEqual("someDigest");
    expect(newState.user).toEqual(newUser);
    expect(newState.state).toEqual(authState.AUTHENTICATED);
  });

  it("after login error", () => {
    const newState = auth(
      {user: defaultUser, digest: "someDigest"},
      {
        type: authActionType.LOGOUT_ERROR,
      },
    );
    expect(newState.digest).toBe(null);
    expect(newState.user).toEqual(defaultUser);
    expect(newState.state).toEqual(authState.ERROR);
  });

  it("after logout", () => {
    const newState = auth(
      {
        user: {
          id: "manoj",
          name: "Manoj Kumar A",
          designation: "Art Director",
          role: "user",
        },
        digest: "someDigest",
      },
      {
        type: authActionType.LOGOUT,
      },
    );
    expect(newState.digest).toBe(null);
    expect(newState.user).toEqual(defaultUser);
    expect(newState.state).toEqual(authState.NOT_AUTHENTICATED);
  });
});
