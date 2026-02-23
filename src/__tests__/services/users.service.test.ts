import { describe, it, expect, vi, beforeEach } from "vitest";

import usersService from "@/services/Users.service";
import db from "@/db/index";

vi.mock("@/db/index", () => ({
  default: {
    insert: vi.fn(),
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
