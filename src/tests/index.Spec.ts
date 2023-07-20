import countries from "../index";

it("should get basic data on the country canada", async () => {
  const data = await countries.getCountry("canada");
  expect(data).toEqual({
    capital: "Ottawa",
    region: "Americas",
    numericCode: "124",
  });
});

it("should get the countries in the region NAFTA", async () => {
  const data = await countries.getRegionCountries("nafta");
  expect(data).toEqual(["Ottawa", "Mexico City", "Washington, D.C."]);
});

it("should get capitals of NAFTA countries", async () => {
  const data = await countries.getRegionCapitals("nafta");
  expect(data).toEqual(["Ottawa", "Mexico City", "Washington, D.C."]);
});
