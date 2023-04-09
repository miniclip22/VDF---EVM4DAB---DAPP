// This test checks that the OrganisationFactory contract can create a new Organisation contract with the correct parameters and that the getOrganisations function returns an array of all created organisations.

const OrganisationFactory = artifacts.require("OrganisationFactory");
const Organisation = artifacts.require("Organisation");

contract("OrganisationFactory", (accounts) => {
  let organisationFactory;
  let organisationAddress;

  beforeEach(async () => {
    organisationFactory = await OrganisationFactory.new();
  });

  xit("should create a new organisation", async () => {
    const identifier = "org1";
    const customerName = "Customer 1";
    const alternativeIds = ["id1", "id2"];

    const result = await organisationFactory.createNewOrganisation(
      identifier,
      customerName,
      alternativeIds,
      { from: accounts[0] }
    );

    // Check that the OrganisationCreated event was emitted with the correct parameters
    assert.equal(result.logs[0].event, "OrganisationCreated");
    assert.equal(
      result.logs[0].args.organisationAddress,
      result.receipt.contractAddress
    );

    // Get the organisation address from the event
    organisationAddress = result.logs[0].args.organisationAddress;

    // Check that the organisation was created with the correct parameters
    const organisation = await Organisation.at(organisationAddress);
    assert.equal(await organisation.identifier(), identifier);
    assert.equal(await organisation.organisationName(), customerName);
    assert.deepEqual(await organisation.alternativeIds(), alternativeIds);
    assert.equal(await organisation.viewOwner(), accounts[0]);
  });

  xit("should return an array of created organisations", async () => {
    const result1 = await organisationFactory.createNewOrganisation(
      "org1",
      "Customer 1",
      ["id1", "id2"],
      { from: accounts[0] }
    );

    const result2 = await organisationFactory.createNewOrganisation(
      "org2",
      "Customer 2",
      ["id3", "id4"],
      { from: accounts[0] }
    );

    const organisations = await organisationFactory.getOrganisations();

    // Check that the array contains the correct number of organisations
    assert.equal(organisations.length, 2);

    // Check that the organisation addresses are correct
    assert.equal(organisations[0], result1.logs[0].args.organisationAddress);
    assert.equal(organisations[1], result2.logs[0].args.organisationAddress);
  });
});
