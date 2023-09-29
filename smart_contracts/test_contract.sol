// SPDX-License-Identifier: Own

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Donation Tool
 * @dev Implements voting process along with vote delegation
 */
contract EmitContract {
    address private  owner;
    event DonationEvent(address indexed _from, uint256 _value, string _msg);
    constructor() {
       owner = msg.sender;
    }

    function donation(string memory message) public payable{
        // Allow charging the Smart Contract with amounts below 0.00016 ether without triggering the event.
        // This measure is in place to prevent spam during livestreams.
        require(msg.value >0);
        if(msg.value >= 0.00016 ether){
        emit DonationEvent(msg.sender,msg.value,message);
        }
    }

    function payout() public{
        require(msg.sender == owner,"No permissions to do this!");
        payable(owner).transfer(address(this).balance);
    }
}