import {validateMail} from "./mail";

describe("Email service:", () => {
  it("validateEmail should validate correctly", () => {
    expect(validateMail([], [], "  ", "  ").length).toEqual(3);
  });
});
