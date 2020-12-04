import mocha from "mocha";
import chai from "chai";
import chaihttp from "chai-http";
import mockData from "../tests/testData";
import jwt from "jsonwebtoken";
import app from "../index";
import Blog from "../models/blogmodels";
//import {JWT_KEY } from "../set-up/env";
import fs from "fs";
const JWT_KEY = process.env.JWT_KEY
const token= jwt.sign(
            mockData.logInvalid,
           JWT_KEY,
            { expiresIn: '1d' }
        );
 chai.use(chaihttp);
 chai.should();
 const { it, describe, beforeEach , afterEach} = mocha 
 describe('Blog tests:', async()=> {

  beforeEach(async()=> {
    // runs before each test in this block
    await Blog.deleteMany({});
  });

  afterEach(async()=> {
    // runs after each test in this block
    await Blog.deleteMany({});
  });
 it("should POST a new blog", async () => {
      const response = await chai
                .request(app)                
                .post("/api/blogs")
                .set('Authorization', token)
                .field({
                    title: mockData.blogsData.title,
                    description: mockData.blogsData.description
                })
               .attach("blogImage",
               fs.readFileSync("src/tests/file/tree.jpg"),
                "tress.jpg")
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('data')
                });
it("Should not post a blog when no token provied ", async () => {
                const response = await chai
                .request(app)
                .post("/api/blogs")
                .set("Authorization", "")
                .field({
                    title: mockData.blogsData.title,
                    description: mockData.blogsData.description,
                })
                .attach(
                    "blogImage",
                    fs.readFileSync("src/tests/file/tree.jpg"),
                    "tree.jpg"
                );
                response.should.have.status(401);
                    response.body.should.be.a('object');
                    response.body.should.have.property('error');
            });

it("Should show a list of blogs", async () => {
            await chai
            .request(app)
            .post("/api/blogs")
            .set("Authorization", token)
            .field({
                title: mockData.blogsData.title,
                description: mockData.blogsData.description,
            })
            .attach(
                "blogImage",
                fs.readFileSync("src/tests/file/tree.jpg"),
                "tree.jpg"
            );
            const response = await chai.request(app).get("/api/blogs");
            response.body.should.have.property('msg');
            response.body.should.have.property("data");
            response.should.have.status(200);
        });
it("should not update a blog post without token", async () => {
      const blogresponse = await chai
      .request(app)
      .post("/api/blogs")
      .set("Authorization", token)
      .field({
        title: mockData.blogsData.title,
        description: mockData.blogsData.description,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/file/tree.jpg"),
        "tree.jpg"
      );

     const response = await chai
      .request(app)
      .put(`/api/blogs/${blogresponse.body.data._id}`)
      .set("Authorization", "")
      .send(mockData.blogsData);
      response.body.should.have.property('error');
      response.should.have.status(401);
     });

it("It should GET a blog by ID", async () => {
                const blogresponse = await chai
                .request(app)
                .post("/api/blogs")
                .set("Authorization", token)
                .field({
                    title: mockData.blogsData.title,
                    description: mockData.blogsData.description,
                })
                .attach(
                    "blogImage",
                    fs.readFileSync("src/tests/file/tree.jpg"),
                    "treet.jpg"
                );
                const response = await chai
                .request(app)                
                .get(`/api/blogs/${blogresponse.body.data._id}`)
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg');
                    response.body.should.have.property('msg');
                });


it("should add a comment on a blog", async () => {
      const blogresponse = await chai
      .request(app)
      .post("/api/blogs")
      .set("Authorization", token)
      .field({
        title: mockData.blogsData.title,
        description: mockData.blogsData.description,
      })
      .attach(
        "blogImage",
        fs.readFileSync("src/tests/file/tree.jpg"),
        "treet.jpg"
      );
    const response = await chai
      .request(app)
      .post(`/api/comments/${blogresponse.body.data._id}`)
      .send(mockData.Comment);
      response.should.have.status(201);
      response.body.should.have.property("msg");
     });
     });