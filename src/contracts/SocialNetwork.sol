pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "CAN Social Network";
    }

    function createPost(string memory _content) public {
        require(bytes(_content).length > 0, "Content can not be empty!");
        postCount++;
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        //Trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);

    }

    function tipPost(uint256 _id) public payable {
        //Make sure the id is valid
        require(_id > 0 && _id <= postCount, "Post ID must be valid!");

        //Fetch the post
        Post memory _post = posts[_id];

        //Fetch the author
        address payable _author = _post.author;

        //Pay the author
        address(_author).transfer(msg.value);

        //Increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;

        //Update the post
        posts[_id] = _post;

        //Trigger an event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}
