const convertFracNumber = (number) => {
  let indexOfOp = number.indexOf("/");
  let firstNum = parseFloat(number.slice(0, indexOfOp));
  let secondNum = parseFloat(number.slice(indexOfOp + 1));
  return firstNum / secondNum;
};

function ConvertHandler() {
  this.getNum = function (input) {
    const patt = /[a-z]/i;
    const doublFracPatt = /.*\/.*\/.*/;
    let result;
    let indexOfUnit;
    for (let i = 0; i < input.length; i++) {
      if (patt.test(input[i])) {
        indexOfUnit = i;
        break;
      }
    }
    result = input.slice(0, indexOfUnit);
    if (result.length === 0) return 1;
    if (doublFracPatt.test(result)) return "invalid number";
    if (result.indexOf("/") !== -1) {
      result = convertFracNumber(result);
      return result;
    }
    return parseFloat(result);
  };

  this.getUnit = function (input) {
    let validUnitsParts = /^(mi|km|gal|kg|lbs|L)$/i;
    let unitPatt = /[a-zA-Z]+/;
    let result = input.match(unitPatt)[0];
    if (result === null) return "invalid unit";
    if (!validUnitsParts.test(result)) return "invalid unit";
    if (result === "l" || result === "L") {
      return result.toUpperCase();
    }
    return result.toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "mi":
        result = "km";
        break;
      case "gal":
        result = "L";
        break;
      case "lbs":
        result = "kg";
        break;
      case "km":
        result = "mi";
        break;
      case "L":
        result = "gal";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    let unitsTable = [
      { km: "kilometers" },
      { mi: "miles" },
      { lbs: "pounds" },
      { kg: "kilograms" },
      { gal: "gallons" },
      { L: "liters" },
    ];
    unitsTable.forEach((item) => {
      if (item.hasOwnProperty(unit)) {
        result = item[unit];
      }
    });
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = initNum;
    switch (initUnit) {
      case "mi":
        result *= miToKm;
        break;
      case "km":
        result /= miToKm;
        break;
      case "lbs":
        result *= lbsToKg;
        break;
      case "kg":
        result /= lbsToKg;
        break;
      case "gal":
        result *= galToL;
        break;
      case "L":
        result /= galToL;
        break;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
    };
    return result;
  };
}

module.exports = ConvertHandler;
