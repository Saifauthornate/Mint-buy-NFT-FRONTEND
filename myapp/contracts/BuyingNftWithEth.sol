// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNft is ERC721 {
    
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	uint public price= 1 ether;
	constructor()  ERC721("AuthorNate", "ANT"){
	
	}

	function mintNFT(address payable to ) public returns(uint256){
		
		require(_tokenIds.current()<=100,"Limit Crossed");
		uint256 newTokenId = _tokenIds.current();

		_mint(to, newTokenId);

		// _setTokenURI(newTokenId,_tokenURI);
		_tokenIds.increment();
		
		return newTokenId;
	}
	
	function buyNFT(uint256 tokenId) public payable {

            require (msg.value==price,"Increase Your Bid");
			payable(ownerOf(tokenId)).transfer(price);
          
			_transfer(ownerOf(tokenId) , msg.sender , tokenId);	
	}
	 
}

//	0xD65955759a7E060466D49b371B3a92a181b5aBF7