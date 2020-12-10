import mocha from "mocha";
import chai from "chai";
import chaihttp from "chai-http";
import app from "../index";
import { stub } from "sinon";
import uploader from "../set-up/cloud";


chai.use(chaihttp);
const {it, describe} = mocha;
chai.should();

const image = "http://res.cloudinary.com/mucyo/image/upload/v1606143286/MY-BRAND/a88eb3277c6a3eed1779b6479a86e436_xfanag.jpg";
stub(uploader, "upload").resolves({ url: image });

describe("App test:", ()=>{
    it("should display a not found message", async ()=>{
        const response = await chai.request(app).get("/mucyo");
        response.body.should.be.a("object"); 
        response.body.should.have.property("message");
        response.should.have.status(404);
    });
    it("should display a swagger documentation UI", async () => {
    const response = await chai.request(app).get("/api-docs");
    response.should.have.status(200);
  });
  it("should not  display a swagger documentation UI", async () => {
    const response = await chai.request(app).get("/mucyo");
    response.should.have.status(404);
  });
});
