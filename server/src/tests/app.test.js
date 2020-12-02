import mocha from "mocha";
import chai from "chai";
import chaihttp from "chai-http";
import app from "../connection/index";

chai.use(chaihttp);
const {it, describe} = mocha;
chai.should();

describe("App test:", ()=>{
    it("should display a not found message", async ()=>{
        const response = await chai.request(app).get("/mucyo");
        response.body.should.be.a("object"); 
        response.body.should.have.property("message");
        response.should.have.status(404);
    });
});
