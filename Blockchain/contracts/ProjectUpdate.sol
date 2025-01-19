// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProjectUpdate {
    struct Update {
        string referenceId;   
        string contractorId;   
        uint256 amountUsed;    
        string selectedOption;  
        bool status;           
    }

  
    mapping(string => Update[]) public projectUpdates;


    function addUpdate(
        string memory _referenceId,
        string memory _contractorId,
        uint256 _amountUsed,
        string memory _selectedOption,
        bool _status
    ) public {
        Update memory newUpdate = Update({
            referenceId: _referenceId,
            contractorId: _contractorId,
            amountUsed: _amountUsed,
            selectedOption: _selectedOption,
            status: _status
        });

        projectUpdates[_referenceId].push(newUpdate);
    }

   
    function getUpdatesByReferenceId(string memory _referenceId)
        public
        view
        returns (Update[] memory)
    {
        return projectUpdates[_referenceId];
    }
}
