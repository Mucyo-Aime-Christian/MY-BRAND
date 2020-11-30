import mocha from "mocha";
import chai from "chai";
import chaihttp from "chai-http";
import mockData from "../tests/testData";
import jwt from "jsonwebtoken";
import app from "../connection/index";
import Query from "../models/queries";
import {JWT_KEY } from "../set-up/env";

const token= jwt.sign(
            mockData.logInvalid,
           JWT_KEY,
            { expiresIn: '1d' }
        );
 chai.use(chaihttp);
 chai.should();
 const { it, describe, beforeEach , afterEach} = mocha 
 describe('QUERY tests', async()=> {

  beforeEach(async()=> {
    // runs before each test in this block
    await Query.deleteMany({});
  });

  afterEach(async()=> {
    // runs after each test in this block
    await Query.deleteMany({});
  });
  // test cases
  it("should allow to POST a new query:", async () => {
      const response = await chai
                .request(app)                
                .post("/api/queries")
                .send(mockData.query);
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('msg').eq("Query sent successfully");
                    response.body.should.have.property('data');
                });

  it("should not allow  a non token beholder to view queries", async () => {
                 await chai
                .request(app)                
                .post("/api/queries")
                .send(mockData.query);
                const response = await chai
                .request(app)
                .get("/api/queries")
                .set("token" , "");
                    response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
                }); 
   it("should not allow  invalid token beholder to view queries", async () => {
                  await chai
                  .request(app)                
                  .post("/api/queries")
                  .send(mockData.query);
                  const response = await chai
                  .request(app)
                  .get("/api/queries")
                  .set("token" , "hey hey hey");
                      response.should.have.status(401);
                      response.body.should.be.a('object');
                      response.body.should.have.property('error');
                  });               
  it("should allow token beholder to view queries", async () => {
                  await chai
                  .request(app)                
                  .post("/api/queries")
                  .send(mockData.query);
                  const response = await chai
                  .request(app)
                  .get("/api/queries")
                  .set('Authorization', token);
                      response.should.have.status(200);
                      response.body.should.be.a('object');
                      response.body.should.have.property('data');
                      response.body.should.have.property("msg");
                  });                               
 });    
