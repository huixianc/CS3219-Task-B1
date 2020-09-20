let chai = require('chai');
let chaiHttp = require('chai-http');
import app from "../index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test", () => {
    describe("GET /", () => {
        // Test to get all contacts record
        it("should get all contacts record", (done) => {
            try {
                chai.request(app)
                    .get('/api/contacts')
                    .end((err, res) => {
                        res.should.have.status(200);
                        //res.body.should.be.a('object');
                        done();
                    });
            } catch (done) {}
            
        });
        // Test to get single contact record
        it("should get a single contact record", (done) => {
            try {
                const id = '5f66eaf2b988e9089ceab338';
                chai.request(app)
                    .get(`/api/contacts/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        //res.body.should.be.a('object');
                        done();
                    });
            } catch (done) { }
            
        });

        // Test to get single contact record
        it("should not get a single contact record", (done) => {
            try {
                const id = 5;
                chai.request(app)
                    .get(`/api/contacts/${id}`)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            } catch (done) { }
        });
    });
});