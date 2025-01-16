const ApprovedContract = artifacts.require("ApprovedContract");

function getWinnerDetails() {
  return {
    issueId: 1,
    contractorId: 101,
    projectId: 4,
    contractorName: "Jane Doe",
    tenure: 365,
    amount: 1000000,
    location: "New York, USA",
    verifiedBy: "Verifier",
    approvedBy: "Approver"
  };
}

contract("ApprovedContract", (accounts) => {
  let biddingInstance;
  const [owner, verifiedBy, approvedBy] = accounts;

  beforeEach(async () => {
    biddingInstance = await ApprovedContract.new();
  });

  it("should deploy the contract", async () => {
    const address = await biddingInstance.address;
    assert.notEqual(address, 0x0, "Contract was not deployed successfully");
  });

  it("should set and retrieve the winner details correctly", async () => {
    const {
      issueId,
      contractorId,
      projectId,
      contractorName,
      tenure,
      amount,
      location,
      verifiedBy,
      approvedBy
    } = getWinnerDetails();

    await biddingInstance.setWinner(issueId, contractorId, projectId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

    const winner = await biddingInstance.getWinner();

    assert.equal(winner.issueId, issueId, "Issue ID does not match");
    assert.equal(winner.contractorId, contractorId, "Contractor ID does not match");
    assert.equal(winner.projectId, projectId, "Project ID does not match");
    assert.equal(winner.name, contractorName, "Contractor name does not match");
    assert.equal(winner.tenure, tenure, "Tenure does not match");
    assert.equal(winner.amount, amount, "Amount does not match");
    assert.equal(winner.location, location, "Location does not match");
    assert.equal(winner.verifiedBy, verifiedBy, "Verified by does not match");
    assert.equal(winner.approvedBy, approvedBy, "Approved by does not match");
  });

  it("should not allow setting the winner twice", async () => {
    const {
      issueId,
      contractorId,
      projectId,
      contractorName,
      tenure,
      amount,
      location,
      verifiedBy,
      approvedBy
    } = getWinnerDetails();

    await biddingInstance.setWinner(issueId, contractorId, projectId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });

    try {
      await biddingInstance.setWinner(issueId, contractorId, projectId, contractorName, tenure, amount, location, verifiedBy, approvedBy, { from: owner });
      assert.fail("Should not allow setting the winner twice");
    } catch (error) {
      assert(error.message.includes("Winner is already set!"), "Expected winner already set error");
    }
  });
});