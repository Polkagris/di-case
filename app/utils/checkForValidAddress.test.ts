import { checkForValidAddress } from "../utils/checkForValidAddress";
import { checkAddress } from "../queries/checkAddress";
import { streetNumberSearch } from "../queries/streetNumberSearch";

jest.mock("../queries/checkAddress");
jest.mock("../queries/streetNumberSearch");

const mockCheckAddress = checkAddress as jest.MockedFunction<
  typeof checkAddress
>;
const mockStreetNumberSearch = streetNumberSearch as jest.MockedFunction<
  typeof streetNumberSearch
>;

describe("Check validate address function", () => {
  it("returns one result when matching streetname and streetnumber is found", async () => {
    // simulates matching street name that results in streetIds
    mockCheckAddress.mockResolvedValue({
      streets: [{ streetIds: [123] }],
    });
    // streetIds as parameter for streetNumberSearch query
    mockStreetNumberSearch.mockResolvedValue({
      streetNumbers: [
        { streetNo: 10, entrance: "A" },
        { streetNo: 10, entrance: "B" },
      ],
    });
    const result = await checkForValidAddress("Akersgata", "Oslo", 10, "B");

    expect(result).toHaveLength(1);
  });
});
