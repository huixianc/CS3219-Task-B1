let chai = require('chai');
let chaiHttp = require('chai-http');
import app from "../index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test", () => {
    describe("GET /", () => {
        //Test to get all contacts record
        it("should get all contacts record", (done) => {
            try {
                chai.request(app)
                    .get('/api/contacts')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            } catch (done) {}
            
        });
    });
});