const bembam = require("./index");

describe("#toString", () => {
  it("should combine class names into a single string seperated by spaces", () => {
    const result = bembam("a", "b", "c", "d").toString();

    if(result !== "a b c d") {
      throw new Error("Invalid class name string: '" + result + "'");
    }
  });

  it("should ignore falsy names", () => {
    it("should combine class names into a single string seperated by spaces", () => {
      const result = bembam("a", null, "b", false, undefined, "c").toString();

      if(result !== "a b c") {
        throw new Error("Invalid class name string: '" + result + "'");
      }
    });
  });
});

describe("#mod", () => {
  it("should add a modifier name if the modifier's condition isn't defined", () => {
    const result = bembam("a", "b", "c", "d")
      .mod("green")
      .toString();

    if(result !== "a b c d a--green") {
      throw new Error("Invalid class name string: '" + result + "'");
    }
  });

  it("shouldn't add a modifier name if the modifier's condition is falsy", () => {
    const result = bembam("a", "b", "c", "d")
      .mod("blue", false)
      .mod("green")
      .toString();

    if(result !== "a b c d a--green") {
      throw new Error("Invalid class name string: '" + result + "'");
    }
  });

  it("should add a negated modifier if the condition is false and three arguments are passed", () => {
    const result = bembam("a")
      .mod("b", "c", false)
      .toString();

    if(result !== "a a--c") {
      throw new Error("negated modifier not present: '" + result + "'");
    }
  });

  it("should ignore falsy modifier names", () => {
    const result = bembam("a", "b", "c", "d")
      .mod("green")
      .mod(null)
      .mod(undefined)
      .mod(false)
      .mod("mod", null, false)
      .toString();

    if(result !== "a b c d a--green") {
      throw new Error("Invalid class name string: '" + result + "'");
    }
  });
});

describe("#el", () => {
  it("should return a BEM formatted element name", () => {
    const result = bembam("foo", "a", "b", "c").el("bar");
    if(result !== "foo__bar") {
      throw new Error("Incorrect modifier name:" + result);
    }
  });

  it("should throw an error if the element name is falsy", (done) => {
    try {
      bembam("a").el(null);
      done(new Error("didn't throw an error when element name was falsy"));
    } catch(error) {
      done();
    }
  });
})
