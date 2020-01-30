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

    before(async () => {
      result = await socialNetwork.createPost("This is my first post", {
        from: author
      });
      postCount = await socialNetwork.postCount();
    });

    it("creates posts", async () => {
      //sucess
      assert.equal(postCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(
        event.content,
        "This is my first post",
        "content is correct"
      );
      assert.equal(event.tipAmount, "0", "tip amount is correct");
      assert.equal(event.author, author, "author is correct");

      //Failure if post is empty
      await socialNetwork.createPost("", { from: author }).should.be.rejected;
    });

    it("List all the posts", async () => {
      const post = await socialNetwork.posts(postCount);
      assert.equal(post.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(post.content, "This is my first post", "content is correct");
      assert.equal(post.tipAmount, "0", "tip amount is correct");
      assert.equal(post.author, author, "author is correct");
    });

    it("Tip posts", async () => {
      //Track the author balance
      let oldAutherBalance;
      oldAutherBalance = await web3.eth.getBalance(author);
      oldAutherBalance = new web3.utils.BN(oldAutherBalance);

      result = await socialNetwork.tipPost(postCount, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether")
      });
      //sucess
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), "id is correct");
      assert.equal(
        event.content,
        "This is my first post",
        "content is correct"
      );
      assert.equal(
        event.tipAmount,
        "1000000000000000000",
        "tip amount is correct"
      );
      assert.equal(event.author, author, "author is correct");

      //Track the author recived funds
      let newAutherBalance;
      newAutherBalance = await web3.eth.getBalance(author);
      newAutherBalance = new web3.utils.BN(newAutherBalance);

      let tipAmount;
      tipAmount = web3.utils.toWei("1", "Ether");
      tipAmount = new web3.utils.BN(tipAmount);

      const expectedBalance = oldAutherBalance.add(tipAmount);

      assert.equal(newAutherBalance.toString(), expectedBalance.toString());

      //Failure: tries to tip a post that does not exist
      await socialNetwork.tipPost(99, {
        from: tipper,
        value: web3.utils.toWei("1", "Ether")
      }).should.be.rejected;
    });
  });
});
