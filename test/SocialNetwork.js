const SocialNetwork = artifacts.require("./SocialNetwork.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("SocialNetwork", ([depoyer, author, tipper]) => {
  let socialNetwork;

  before(async () => {
    socialNetwork = await SocialNetwork.deployed();
  });

  describe("depolyment", async () => {
    it("deploys successfully", async () => {
      const address = await socialNetwork.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await socialNetwork.name();
      assert.equal(name, "CAN Social Network");
    });
  });
  describe("posts", async () => {
    let result, postCount;
    it("creates posts", async () => {
      result = await socialNetwork.createPost("This is my first post", {
        from: author
      });
      postCount = await socialNetwork.postCount();
      //sucess
      assert.equal(postCount, 1);
    });
    //it("List all the posts", async () => {});
    //it("Tip posts", async () => {});
  });
});
