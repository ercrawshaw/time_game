import { describe, expect, it } from "vitest";

import {
  getAlienRank,
  getNextAlien,
} from "./index";

describe("getAlienRank", () => {
  it("returns no rank for a score of zero", () => {
    expect(getAlienRank(0, 60)).toBeNull();
    expect(getAlienRank(0, 120)).toBeNull();
    expect(getAlienRank(0, 300)).toBeNull();
    expect(getAlienRank(0, null)).toBeNull();
  });

  it("returns no rank for invalid scores", () => {
    expect(getAlienRank(-3, 60)).toBeNull();
    expect(getAlienRank(undefined, 60)).toBeNull();
    expect(getAlienRank(NaN, 60)).toBeNull();
  });

  describe("60 second mode", () => {
    it("gives Zib for the lowest scoring score", () => {
      expect(getAlienRank(1, 60)).toBe("zib");
    });

    it("gives Zib just below the Nova threshold", () => {
      expect(getAlienRank(3, 60)).toBe("zib");
    });

    it("gives Nova at exactly the threshold", () => {
      expect(getAlienRank(4, 60)).toBe("nova");
    });

    it("gives Orbit at exactly the threshold", () => {
      expect(getAlienRank(7, 60)).toBe("orbit");
    });

    it("gives Cosmo at exactly the threshold", () => {
      expect(getAlienRank(10, 60)).toBe("cosmo");
    });

    it("gives Cosmo one below the Chronox threshold", () => {
      expect(getAlienRank(12, 60)).toBe("cosmo");
    });

    it("gives Chronox at exactly the threshold", () => {
      expect(getAlienRank(13, 60)).toBe("chronox");
    });

    it("stays on Chronox above the threshold", () => {
      expect(getAlienRank(99, 60)).toBe("chronox");
    });
  });

  describe("120 second mode", () => {
    it("gives Zib below the Nova threshold", () => {
      expect(getAlienRank(6, 120)).toBe("zib");
    });

    it("gives Nova at exactly the threshold", () => {
      expect(getAlienRank(7, 120)).toBe("nova");
    });

    it("gives Orbit at exactly the threshold", () => {
      expect(getAlienRank(13, 120)).toBe("orbit");
    });

    it("gives Cosmo at exactly the threshold", () => {
      expect(getAlienRank(19, 120)).toBe("cosmo");
    });

    it("gives Cosmo one below the Chronox threshold", () => {
      expect(getAlienRank(25, 120)).toBe("cosmo");
    });

    it("gives Chronox at exactly the threshold", () => {
      expect(getAlienRank(26, 120)).toBe("chronox");
    });
  });

  describe("300 second mode", () => {
    it("gives Zib below the Nova threshold", () => {
      expect(getAlienRank(15, 300)).toBe("zib");
    });

    it("gives Nova at exactly the threshold", () => {
      expect(getAlienRank(16, 300)).toBe("nova");
    });

    it("gives Orbit at exactly the threshold", () => {
      expect(getAlienRank(31, 300)).toBe("orbit");
    });

    it("gives Cosmo at exactly the threshold", () => {
      expect(getAlienRank(46, 300)).toBe("cosmo");
    });

    it("gives Cosmo one below the Chronox threshold", () => {
      expect(getAlienRank(65, 300)).toBe("cosmo");
    });

    it("gives Chronox at exactly the threshold", () => {
      expect(getAlienRank(66, 300)).toBe("chronox");
    });
  });

  describe("unlimited mode", () => {
    it("gives Zib below the Nova threshold", () => {
      expect(getAlienRank(9, null)).toBe("zib");
    });

    it("gives Nova at exactly the threshold", () => {
      expect(getAlienRank(10, null)).toBe("nova");
    });

    it("gives Orbit at exactly the threshold", () => {
      expect(getAlienRank(20, null)).toBe("orbit");
    });

    it("gives Cosmo at exactly the threshold", () => {
      expect(getAlienRank(35, null)).toBe("cosmo");
    });

    it("gives Cosmo one below the Chronox threshold", () => {
      expect(getAlienRank(49, null)).toBe("cosmo");
    });

    it("gives Chronox at exactly the threshold", () => {
      expect(getAlienRank(50, null)).toBe("chronox");
    });

    it("treats an unknown time limit as unlimited", () => {
      expect(getAlienRank(10, 999)).toBe("nova");
    });
  });
});

describe("getNextAlien", () => {
  it("returns nothing when there is no rank", () => {
    expect(getNextAlien(null, 60)).toBeNull();
  });

  it("returns nothing once Chronox is earned", () => {
    expect(getNextAlien("chronox", 60)).toBeNull();
    expect(getNextAlien("chronox", null)).toBeNull();
  });

  it("returns the next rank and required score", () => {
    expect(getNextAlien("cosmo", 60)).toEqual({
      rank: "chronox",
      name: "Chronox",
      requiredScore: 13,
    });
  });

  it("uses the thresholds for the chosen time limit", () => {
    expect(getNextAlien("zib", 300)).toEqual({
      rank: "nova",
      name: "Nova",
      requiredScore: 16,
    });
  });

  it("falls back to unlimited thresholds", () => {
    expect(getNextAlien("orbit", null)).toEqual({
      rank: "cosmo",
      name: "Cosmo",
      requiredScore: 35,
    });
  });
});
