import extractGridAreaNames from "../../src/util/extractGridAreaNames";

test("passing nothing gives you an empty list", () => {
  expect(extractGridAreaNames()).toEqual([]);
});

test("passing an empty object gives you an empty list", () => {
  expect(extractGridAreaNames({})).toEqual([]);
});

test("passing an empty definition gives you an empty list", () => {
  const gridTemplateAreas = {
    layout: [],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual([]);
});

test("single grid area", () => {
  const gridTemplateAreas = {
    layout: ["abc"],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual(["abc"]);
});

test("deduplicates names", () => {
  const gridTemplateAreas = {
    layout: ["abc abc"],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual(["abc"]);
});

test("multiple areas", () => {
  const gridTemplateAreas = {
    layout: ["abc def"],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual(["abc", "def"]);
});

test("multiple rows", () => {
  const gridTemplateAreas = {
    layout: ["abc", "def"],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual(["abc", "def"]);
});

test("excludes . (empty cell)", () => {
  const gridTemplateAreas = {
    layout: ["abc abc", "def ."],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual(["abc", "def"]);
});

test("multiple layouts", () => {
  const gridTemplateAreas = {
    default: ["abc abc", "def ."],
    large: ["abc abc abc", "def hij hij"],
  };

  expect(extractGridAreaNames(gridTemplateAreas)).toEqual([
    "abc",
    "def",
    "hij",
  ]);
});
