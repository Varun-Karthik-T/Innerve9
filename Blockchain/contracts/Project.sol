pragma solidity ^0.8.0;

contract Project{

    struct Bid {
        string contractorId;
        string organisationChain;
        string referenceId;   
        uint256 bidAmount;
        uint256 panelId;
    }

    mapping(string => mapping(string => Bid)) private bids; 
    event BidSubmitted(string contractorId, string referenceId, uint256 bidAmount, uint256 panelId);

 
    function submitBid(
        string memory contractorId,
        string memory organisationChain,
        string memory referenceId,
        uint256 bidAmount,
        uint256 panelId
    ) public {
        require(bidAmount > 0, "Bid amount should be greater than zero");

    
        bids[contractorId][referenceId] = Bid(
            contractorId,
            organisationChain,
            referenceId,
            bidAmount,
            panelId
        );

        emit BidSubmitted(contractorId, referenceId, bidAmount, panelId);
    }

    function getBid(string memory contractorId, string memory referenceId) public view returns (
        string memory, string memory, string memory, uint256, uint256
    ) {
        Bid memory bid = bids[contractorId][referenceId];
        return (bid.contractorId, bid.organisationChain, bid.referenceId, bid.bidAmount, bid.panelId);
    }
}
