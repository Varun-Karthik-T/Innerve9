pragma solidity ^0.8.18;

contract IssueManagement {
    // Structure to store issue details
    struct Issue {
        uint issueId;
        string issueName;
        string description;
        string dateOfComplaint;
        uint approvalVotes;
        uint denialVotes;
        Location location;
        address creator;
        bool resolved;
    }

    // Structure to store location details
    struct Location {
        uint accuracy;
        int altitude;
        int latitude;
        int longitude;
    }

    // Array to store issues
    Issue[] public issues;

    // Events
    event IssueCreated(uint issueId, string issueName, string description, string dateOfComplaint, address creator);
    event IssueResolved(uint issueId);

    // Function to create an issue
    function createIssue(
        uint _issueId,
        string memory _issueName,
        string memory _description,
        string memory _dateOfComplaint,
        uint _approval,
        uint _denial,
        uint _accuracy,
        int _altitude,
        int _latitude,
        int _longitude
    ) public {

        issues.push(Issue({
            issueId: _issueId,
            issueName: _issueName,
            description: _description,
            dateOfComplaint: _dateOfComplaint,
            approvalVotes: _approval,
            denialVotes: _denial,
            location: Location({
                accuracy: _accuracy,
                altitude: _altitude,
                latitude: _latitude,
                longitude: _longitude
            }),
            creator: msg.sender,
            resolved: false
        }));
        emit IssueCreated(_issueId, _issueName, _description, _dateOfComplaint, msg.sender);
    }

    // Function to resolve an issue
    function resolveIssue(uint _issueId) public {
        Issue storage issue = issues[_issueId];
        require(!issue.resolved, "Issue already resolved");
        issue.resolved = true;
        emit IssueResolved(_issueId);
    }

    function getIssueById(uint _issueId) public view returns (
        uint issueId,
        string memory issueName,
        string memory description
    ) {
        for (uint i = 0; i < issues.length; i++) {
            if (issues[i].issueId == _issueId) {
                return (
                    issues[i].issueId,
                    issues[i].issueName,
                    issues[i].description
                );
            }
        }
    }
}