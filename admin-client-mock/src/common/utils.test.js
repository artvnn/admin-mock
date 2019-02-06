import {convertToHashmap} from "./utils";

describe("Utils:", () => {
  it("convertToHasmap should convert given string of arrays to hashmap", () => {
    const input = ["TEST1", "TEST2", "TEST1", "TEST3"];
    const output = convertToHashmap(input);
    expect(output.TEST1).toEqual("TEST1");
    expect(output.TEST2).toEqual("TEST2");
    expect(output.TEST3).toEqual("TEST3");
  });
});
