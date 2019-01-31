import {createDigest, addDigest} from "./server";
import {authActionType} from "./reducers/auth";
import store from "./store";

const digestTestData = [
  ["admin", "pwd123", "YWRtaW46cHdkMTIz", "Basic YWRtaW46cHdkMTIz"],
  ["manoj", "kumar", "bWFub2o6a3VtYXI=", "Basic bWFub2o6a3VtYXI="],
  [
    "murugan",
    "Admin2019@",
    "bXVydWdhbjpBZG1pbjIwMTlA",
    "Basic bXVydWdhbjpBZG1pbjIwMTlA",
  ],
];

describe("Server communicator", () => {
  it("createDigest should convert username and password to digest", () => {
    digestTestData.forEach(test => {
      const [username, password, digest] = test;
      expect(createDigest(username, password)).toEqual(digest);
    });
  });

  it("addDigest should add authorization header", () => {
    digestTestData.forEach(test => {
      const [username, password, , headerValue] = test;
      const digest = createDigest(username, password);
      store.dispatch({type: authActionType.LOGIN_TRY, digest: digest});
      const options = addDigest({
        someOption: "option1",
        headers: {someHeader: "header1"},
      });
      expect(options.headers.Authorization).toEqual(headerValue);
      expect(options.someOption).toEqual("option1");
      expect(options.headers.someHeader).toEqual("header1");
      expect(addDigest({}).headers.Authorization).toEqual(headerValue);
    });
  });
});
