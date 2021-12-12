"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res, next) => {
    //getting input number and unit
    let numberToConvert = convertHandler.getNum(req.query.input);
    let mesureUnit = convertHandler.getUnit(req.query.input);
    //checking if the input is invalid
    if (numberToConvert === "invalid number" && mesureUnit === "invalid unit")
      return res.status(200).json("invalid number and unit");
    else if (numberToConvert === "invalid number")
      return res.status(200).json(numberToConvert);
    else if (mesureUnit === "invalid unit")
      return res.status(200).json(mesureUnit);
    //getting return unit
    const returnUnit = convertHandler.getReturnUnit(mesureUnit);
    //converting
    const convertedNumber = convertHandler.convert(numberToConvert, mesureUnit);

    //getting the final res
    const FINAL = convertHandler.getString(
      numberToConvert,
      mesureUnit,
      convertedNumber,
      returnUnit
    );
    res.status(200).send(FINAL);
  });
};
