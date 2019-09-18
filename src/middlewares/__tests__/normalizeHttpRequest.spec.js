var { normalize } = require("../normalizeHttpRequest");

describe("test normalizeRequest middleware", () => {
  it("test without parameters", () => {
    var data = normalize(undefined, null, null);
    expect(data).toBe(null);
  });

  it("test with valid query string", () => {
    var data = normalize({}, { someKey: "someValue" }, null);
    expect(data).toMatchObject({ someKey: "someValue" });
  });

  it("test with valid body and content-type", () => {
    var data = normalize(
      { "content-type": "application/json" },
      null,
      JSON.stringify({ someKey: "someValue" })
    );

    expect(data).toMatchObject({ someKey: "someValue" });
  });

  it("test with valid body and Content-Type", () => {
    var data = normalize(
      { "Content-Type": "application/json" },
      null,
      JSON.stringify({ someKey: "someValue" })
    );

    expect(data).toMatchObject({ someKey: "someValue" });
  });

  it("test with valid query string and body and Content-Type", () => {
    var data = normalize(
      { "Content-Type": "application/json" },
      { someKeyQS: "someValueQS" },
      JSON.stringify({ someKeyBody: "someValueBody" })
    );

    expect(data).toMatchObject({
      someKeyQS: "someValueQS",
      someKeyBody: "someValueBody",
    });
  });

  it("test with invalid body and valid Content-Type", () => {
    expect(() =>
      normalize({ "Content-Type": "application/json" }, null, {
        someKey: "someValue",
      })
    ).toThrow(new Error("Content type defined as JSON but an invalid JSON was provided"));
  });
});
