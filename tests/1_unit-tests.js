const chai = require("chai");
const { describe } = require("mocha");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("numbers input tests", function () {
    test("convertHandler should correctly read a whole number input", function () {
      assert.isNumber(convertHandler.getNum("16mi"));
    });
    test("convertHandler should correctly read a decimal number input", function () {
      assert.isNumber(convertHandler.getNum("3.2mi"));
    });
    test("convertHandler should correctly read a fractional input", function () {
      assert.isNumber(convertHandler.getNum("3/2mi"));
    });
    test("convertHandler should correctly read a fractional input with a decimal", function () {
      assert.isNumber(convertHandler.getNum("3.2/2mi"));
    });
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      assert.equal(convertHandler.getNum("3/2/2mi"), "invalid number");
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("mi"), 1);
    });
  });
  suite("units input tests", function () {
    test("convertHandler should correctly read each valid input unit", function () {
      const validUnits = [
        "mi",
        "MI",
        "km",
        "KM",
        "gal",
        "GAL",
        "L",
        "lbs",
        "LBS",
        "kg",
        "KG",
      ];
      validUnits.forEach((unit) => {
        assert.isOk(convertHandler.getUnit(unit));
      });
    });
    test("convertHandler should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.getUnit("invalid"), "invalid unit");
    });
  });
  suite("unit convertion tests", function () {
    test("convertHandler should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
  });
  suite("spelled units tests", function () {
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    });
  });
  suite("correct converstions", function () {
    test("convertHandler should correctly convert mi to km", function () {
      assert.strictEqual(convertHandler.convert("2", "mi"), 3.21868);
    });
    test("convertHandler should correctly convert km to mi", function () {
      assert.strictEqual(convertHandler.convert("2", "km"), 1.24275);
    });
    test("convertHandler should correctly convert L to gal", function () {
      assert.strictEqual(convertHandler.convert("2", "L"), 0.52834);
    });
    test("convertHandler should correctly convert gal to L", function () {
      assert.strictEqual(convertHandler.convert("2", "gal"), 7.57082);
    });
    test("convertHandler should correctly convert lbs to kg", function () {
      assert.strictEqual(convertHandler.convert("2", "lbs"), 0.90718);
    });
    test("convertHandler should correctly convert kg to lbs", function () {
      assert.strictEqual(convertHandler.convert("2", "kg"), 4.40925);
    });
  });
});
