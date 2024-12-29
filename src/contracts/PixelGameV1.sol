// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PixelGameV1 is ERC721, Ownable, ReentrancyGuard {
    // Constants matching frontend
    uint256 public constant GRID_SIZE = 32;
    uint256 public constant DEFAULT_PIXELS = 35;
    uint256 public constant PIXELS_PER_AD = 5;

    // Added to track total supply
    uint256 private _totalSupply;

    struct Pixel {
        address owner;
        uint32 color;
        uint256 lastUpdate;
    }

    struct User {
        uint256 availablePixels;
        uint256 lastAdReward;
        bool isRegistered;
    }

    // Main state variables
    mapping(uint256 => Pixel) public pixels;  // position => Pixel
    mapping(address => User) public users;    // user address => User data
    
    // Events
    event UserRegistered(address indexed user);
    event PixelUpdated(uint256 indexed position, address indexed owner, uint32 color);
    event AdRewardClaimed(address indexed user);
    event CanvasMinted(uint256 indexed tokenId);

    constructor() ERC721("PixelGame", "PIXEL") Ownable(msg.sender) {
        _totalSupply = 0;
    }

    // Added totalSupply function
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // User registration
    function register() external {
        require(!users[msg.sender].isRegistered, "Already registered");
        
        users[msg.sender] = User({
            availablePixels: DEFAULT_PIXELS,
            lastAdReward: 0,
            isRegistered: true
        });

        emit UserRegistered(msg.sender);
    }

    // Claim pixels for watching ad
    function claimAdReward() external {
        require(users[msg.sender].isRegistered, "Not registered");
        require(block.timestamp >= users[msg.sender].lastAdReward + 1 days, "Too soon for new ad reward");
        
        users[msg.sender].availablePixels += PIXELS_PER_AD;
        users[msg.sender].lastAdReward = block.timestamp;
        
        emit AdRewardClaimed(msg.sender);
    }

    // Update pixel color
    function updatePixel(uint256 x, uint256 y, uint32 color) external {
        require(users[msg.sender].isRegistered, "Not registered");
        require(x < GRID_SIZE && y < GRID_SIZE, "Position out of bounds");
        require(users[msg.sender].availablePixels > 0, "No pixels available");

        uint256 position = y * GRID_SIZE + x;
        
        // Update pixel data
        pixels[position] = Pixel({
            owner: msg.sender,
            color: color,
            lastUpdate: block.timestamp
        });

        users[msg.sender].availablePixels--;
        
        emit PixelUpdated(position, msg.sender, color);
    }

    // Get pixel data
    function getPixel(uint256 x, uint256 y) external view returns (Pixel memory) {
        require(x < GRID_SIZE && y < GRID_SIZE, "Position out of bounds");
        return pixels[y * GRID_SIZE + x];
    }

    // Get user data
    function getUserData(address user) external view returns (User memory) {
        return users[user];
    }

    // Mint canvas as NFT
    function mintCanvas() external nonReentrant {
        require(users[msg.sender].isRegistered, "Not registered");
        
        _totalSupply++;
        uint256 tokenId = _totalSupply;
        _mint(msg.sender, tokenId);
        
        emit CanvasMinted(tokenId);
    }

    // Get all pixels for rendering
    function getAllPixels() external view returns (Pixel[] memory) {
        Pixel[] memory allPixels = new Pixel[](GRID_SIZE * GRID_SIZE);
        
        for(uint256 i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            allPixels[i] = pixels[i];
        }
        
        return allPixels;
    }

    // Emergency functions
    function resetUser(address user) external onlyOwner {
        users[user].availablePixels = DEFAULT_PIXELS;
        users[user].lastAdReward = 0;
    }
}