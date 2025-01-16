const IssueManagement = artifacts.require("IssueManagement");

contract("IssueManagement", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await IssueManagement.new(); // Deploy a new instance before each test
  });

  it("should create and fetch multiple issues", async () => {
    // Sample issue details for the first issue
    const issueName1 = "Road Damage";
    const description1 = "Road damage near Adyar.";
    const dateOfComplaint1 = "2025-01-10";
    const location1 = {
      accuracy: 100,
      altitude: -63,
      altitudeAccuracy: 100,
      heading: 0,
      latitude: 128396614,
      longitude: 801552797,
      speed: 0,
    };

    // Sample issue details for the second issue
    const issueName2 = "Water Leakage";
    const description2 = "Water leakage near Main Street.";
    const dateOfComplaint2 = "2025-02-15";
    const location2 = {
      accuracy: 90,
      altitude: 5,
      altitudeAccuracy: 20,
      heading: 0,
      latitude: 128396616,
      longitude: 801552799,
      speed: 0,
    };

    // Sample issue details for the third issue
    const issueName3 = "Street Light Fault";
    const description3 = "Street light not working near Park Street.";
    const dateOfComplaint3 = "2025-03-20";
    const location3 = {
      accuracy: 95,
      altitude: 20,
      altitudeAccuracy: 10,
      heading: 0,
      latitude: 128396617,
      longitude: 801552800,
      speed: 0,
    };

    // Create the first issue
    await instance.createIssue(
      issueName1,
      description1,
      dateOfComplaint1,
      location1.accuracy,
      location1.altitude,
      location1.altitudeAccuracy,
      location1.heading,
      location1.speed,
      location1.latitude,
      location1.longitude,
      { from: accounts[0] }
    );

    // Create the second issue
    await instance.createIssue(
      issueName2,
      description2,
      dateOfComplaint2,
      location2.accuracy,
      location2.altitude,
      location2.altitudeAccuracy,
      location2.heading,
      location2.speed,
      location2.latitude,
      location2.longitude,
      { from: accounts[1] }
    );

    // Create the third issue
    await instance.createIssue(
      issueName3,
      description3,
      dateOfComplaint3,
      location3.accuracy,
      location3.altitude,
      location3.altitudeAccuracy,
      location3.heading,
      location3.speed,
      location3.latitude,
      location3.longitude,
      { from: accounts[2] }
    );

    // Fetch and print the details of each issue
    for (let i = 0; i < 3; i++) {
      const issue = await instance.issues(i);
      console.log(`Issue ${i} ID:`, issue.issueId.toNumber());
      console.log(`Issue ${i} Name:`, issue.issueName);
      console.log(`Issue ${i} Description:`, issue.description);
      console.log(`Issue ${i} Date of Complaint:`, issue.dateOfComplaint);
      console.log(`Issue ${i} Creator:`, issue.creator);
      console.log(`Issue ${i} Location Accuracy:`, issue.location.accuracy);
      console.log(`Issue ${i} Location Altitude:`, issue.location.altitude);
      console.log(`Issue ${i} Location Altitude Accuracy:`, issue.location.altitudeAccuracy);
      console.log(`Issue ${i} Location Heading:`, issue.location.heading);
      console.log(`Issue ${i} Location Latitude:`, issue.location.latitude);
      console.log(`Issue ${i} Location Longitude:`, issue.location.longitude);
      console.log(`Issue ${i} Location Speed:`, issue.location.speed);
    }

    // Verify the details of each issue
    const issue1 = await instance.issues(0);
    assert.equal(issue1.issueId.toNumber(), 0, "First issue ID should match");
    assert.equal(issue1.issueName, issueName1, "First issue name should match");
    assert.equal(issue1.description, description1, "First issue description should match");
    assert.equal(issue1.dateOfComplaint, dateOfComplaint1, "First issue date should match");
    assert.equal(issue1.creator, accounts[0], "First issue creator should match");

    const issue2 = await instance.issues(1);
    assert.equal(issue2.issueId.toNumber(), 1, "Second issue ID should match");
    assert.equal(issue2.issueName, issueName2, "Second issue name should match");
    assert.equal(issue2.description, description2, "Second issue description should match");
    assert.equal(issue2.dateOfComplaint, dateOfComplaint2, "Second issue date should match");
    assert.equal(issue2.creator, accounts[1], "Second issue creator should match");

    const issue3 = await instance.issues(2);
    assert.equal(issue3.issueId.toNumber(), 2, "Third issue ID should match");
    assert.equal(issue3.issueName, issueName3, "Third issue name should match");
    assert.equal(issue3.description, description3, "Third issue description should match");
    assert.equal(issue3.dateOfComplaint, dateOfComplaint3, "Third issue date should match");
    assert.equal(issue3.creator, accounts[2], "Third issue creator should match");
  });
});