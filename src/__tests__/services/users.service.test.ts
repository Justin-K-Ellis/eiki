import { describe, it, expect, vi, beforeEach } from "vitest";

import usersService from "@/services/Users.service";
import db from "@/db/index";
import { CEFRLevelCountMap } from "@/types/types";

vi.mock("@/db/index", () => ({
  default: {
    insert: vi.fn(),
    select: vi.fn(),
  },
}));

// === Fixtures ===

const mockAttempt = {
  user_id: "user_123",
  passage_id: 1,
  correctly_answered: true,
  last_attempted_at: new Date(),
  total_attempts: 1,
};

// === Tests ===

describe("UsersService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getCompletionStats", () => {
    const mockSelectChain = (rows: { complete: number; cefrLevel: string }[]) =>
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          innerJoin: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              groupBy: vi.fn().mockResolvedValue(rows),
            }),
          }),
        }),
      } as any);

    it("returns a CEFRLevelCountMap with correct counts for each completed level", async () => {
      mockSelectChain([
        { cefrLevel: "A1", complete: 3 },
        { cefrLevel: "B2", complete: 1 },
      ]);

      const result = await usersService.getCompletionStats("user_123");

      expect(result).toBeInstanceOf(CEFRLevelCountMap);
      expect(result.get("A1")).toBe(3);
      expect(result.get("B2")).toBe(1);
    });

    it("returns an empty map when the user has no completed passages", async () => {
      mockSelectChain([]);

      const result = await usersService.getCompletionStats("user_123");

      expect(result).toBeInstanceOf(CEFRLevelCountMap);
      expect(result.size).toBe(0);
    });

    it("does not include levels with no completions", async () => {
      mockSelectChain([{ cefrLevel: "C1", complete: 2 }]);

      const result = await usersService.getCompletionStats("user_123");

      expect(result.has("A1")).toBe(false);
      expect(result.has("C1")).toBe(true);
    });
  });

  describe("updatePassageAttempts", () => {
    it("returns the upserted user passage attempt record", async () => {
      vi.mocked(db.insert).mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          onConflictDoUpdate: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([mockAttempt]),
          }),
        }),
      } as any);

      const result = await usersService.updatePassageAttempts(
        "user_123",
        1,
        true,
      );

      expect(result).toEqual(mockAttempt);
    });
  });
});
