// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IssueManager {
    struct Issue {
        string id;
        string issue_type;
        string description;
        string date_of_complaint;
        string status;
        Location location;
    }

    struct Location {
        int256 latitude;
        int256 longitude;
    }

    mapping(string => Issue) private issues;


    event IssueCreated(string id, string description);


    function createIssue(
        string memory _id,
        string memory _issue_type,
        string memory _description,
        string memory _date_of_complaint,
        string memory _status,
        int256 _latitude,
        int256 _longitude
    ) public returns (string memory) {
     
        if (bytes(issues[_id].id).length > 0) {
            return "already exists";
        }

    
        issues[_id] = Issue(
            _id,
            _issue_type,
            _description,
            _date_of_complaint,
            _status,
            Location(_latitude, _longitude)
        );

        emit IssueCreated(_id, _description);
        return "Issue created successfully";
    }


    function getIssue(string memory _id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            int256,
            int256
        )
    {
        require(bytes(issues[_id].id).length > 0, "Issue not found");

        Issue memory issue = issues[_id];
        return (
            issue.id,
            issue.issue_type,
            issue.description,
            issue.date_of_complaint,
            issue.status,
            issue.location.latitude,
            issue.location.longitude
        );
    }
}
