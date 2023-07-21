import app from "../index";
import supertest from "supertest";

const request = supertest(app);

describe("Testing Endpoints", () => {
  it("Testing if endpoint  exists", async () => {
    await request
      .get("/image?filename=benzema&&width=500&&height=500")
      .expect(200);
  });
  it("Testing if endpoint dosent exist", async () => {
    await request.get("/resize").expect(404);
  });
});
