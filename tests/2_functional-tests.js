const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../server");
const { assert } = require("chai");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert an invalid input such as 32g: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert/")
      .query({ input: "32g" })
      .end((err, res) => {
        assert.equal(err, null);
        assert.strictEqual(res.text, '"invalid unit"');
      });
  });
  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert/")
      .query({ input: "3/4/2mi" })
      .end((err, res) => {
        assert.equal(err, null);
        assert.strictEqual(res.text, '"invalid number"');
      });
  });
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert/")
      .query({ input: "3/7.2/4kilomegagram" })
      .end((err, res) => {
        assert.equal(err, null);
        assert.strictEqual(res.text, '"invalid number and unit"');
      });
    done();
  });
  test("Convert with no number such as kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert/")
      .query({ input: "kg" })
      .end((err, res) => {
        assert.equal(err, null);
        assert.strictEqual(
          res.body.string,
          "1 kilograms converts to 2.20462 pounds"
        );
      });
    done();
  });
  test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert/")
      .query({ input: "10l" })
      .end((err, res) => {
        assert.equal(err, null);
        assert.strictEqual(
          res.body.string,
          "10 liters converts to 2.64172 gallons"
        );
        done();
      });
  });
});
