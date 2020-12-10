import mocha from "mocha";
import chai from "chai";
import chaihttp from "chai-http";
import mockData from "../tests/testData";
import app from "../index";
import User from "../models/userauth";
import fs from 'fs';

 chai.use(chaihttp);
 chai.should();
 const { it, describe, beforeEach , afterEach} = mocha;
 
 describe("User tests:", async () =>{
     beforeEach(async()=> {
    // runs before each test in this block
    await User.deleteMany({});
  });

  afterEach(async()=> {
    // runs after each test in this block
    await User.deleteMany({});
  });
  // test cases
     it("should create a user", async () => {
      const response = await chai
                .request(app)                
                .post("/api/users/signUp")
                .send(mockData.signUpValid);
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('data') 
     });
     it("should not create a user without valid information", async () => {
      const response = await chai
                .request(app)                
                .post("/api/users/signUp")
                .send(mockData.signUpInvalid);
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
     });

     it("should login a user ", async () => {
      await chai
      .request(app)
      .post("/api/users/signUp")
      .send(mockData.signUpValid)
      const response = await chai
                .request(app)                
                .post("/api/users/login")
                .send(mockData.logInvalid);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('data');
     });

     it("Should not login a user without valid information", async () => {
    await chai
      .request(app)
      .post("/api/users/signUp")
      .send(mockData.signUpValid);

    const response = await chai
      .request(app)
      .post("/api/users/login")
      .send(mockData.loginInvalid);
      response.should.have.status(400);
      response.body.should.be.a("object");
      response.body.should.have.property('error');
  });

it("should update the user's profile picture", async () => {
    const userRes = await chai
      .request(app)
      .post("/api/users/signUp")
      .send(mockData.signUpValid);

    const resLogin = await chai
      .request(app)
      .post("/api/users/login")
      .send(mockData.logInvalid);
    const response = await chai
      .request(app)
      .put(`/api/users/updateProfile/${userRes.body.data.newUser._id}`)
      .set('Authorization', resLogin.body.data)
      .field({
        email: mockData.updateProfile.email,
        password: mockData.updateProfile.password,
      })
      .attach(
        "profileImage",
        fs.readFileSync("src/tests/file/tree.jpg"),
        "tree.jpg"
      );
      response.should.have.status(200);
  });
  });