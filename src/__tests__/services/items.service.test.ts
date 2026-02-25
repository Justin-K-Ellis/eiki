import { describe, it, expect, vi, beforeEach } from "vitest";

import itemService from "@/services/Items.service";
import db from "@/db/index";
import { auth, currentUser } from "@clerk/nextjs/server";

vi.mock("@/db/index", () => ({
  default: {
    select: vi.fn(),
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
  currentUser: vi.fn(),
}));

// === Fixtures ===

const mockPassage = {
  id: 1,
  title: "Test Passage",
  body: "Test body",
  readability_score: 5.0,
  created_at: new Date(),
  ja_translation: "テスト",
  cefr_level: "A1" as const,
  unit: 1,
};

const mockOptions = [
  { id: 1, text: "Option A", is_answer_key: true, passage_id: 1 },
  { id: 2, text: "Option B", is_answer_key: false, passage_id: 1 },
];

// === Tests ===

describe("ItemService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getItemList", () => {
    it("throws when the user is not authenticated", async () => {
      vi.mocked(auth).mockResolvedValue({ isAuthenticated: false } as any);

      await expect(itemService.getItemList(1)).rejects.toThrow(
        "User not authenticated.",
      );
    });

    it("returns progress data for attempted passages and defaults for unattempted ones", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          leftJoin: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              orderBy: vi.fn().mockResolvedValue([
                {
                  id: 1,
                  title: "Passage One",
                  correctlyAnswered: true,
                  totalAttempts: 3,
                },
                {
                  id: 2,
                  title: "Passage Two",
                  correctlyAnswered: null,
                  totalAttempts: null,
                },
              ]),
            }),
          }),
        }),
      } as any);
      vi.mocked(auth).mockResolvedValue({ isAuthenticated: true } as any);
      vi.mocked(currentUser).mockResolvedValue({ id: "user_123" } as any);

      const result = await itemService.getItemList(1);

      expect(result).toEqual([
        {
          id: 1,
          title: "Passage One",
          correctlyAnswered: true,
          totalAttempts: 3,
        },
        {
          id: 2,
          title: "Passage Two",
          correctlyAnswered: false,
          totalAttempts: 0,
        },
      ]);
    });

    it("returns default progress for all passages when the user has no attempts", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          leftJoin: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              orderBy: vi.fn().mockResolvedValue([
                {
                  id: 1,
                  title: "Passage One",
                  correctlyAnswered: null,
                  totalAttempts: null,
                },
                {
                  id: 2,
                  title: "Passage Two",
                  correctlyAnswered: null,
                  totalAttempts: null,
                },
              ]),
            }),
          }),
        }),
      } as any);
      vi.mocked(auth).mockResolvedValue({ isAuthenticated: true } as any);
      vi.mocked(currentUser).mockResolvedValue({ id: "user_123" } as any);

      const result = await itemService.getItemList(1);

      expect(result).toEqual([
        {
          id: 1,
          title: "Passage One",
          correctlyAnswered: false,
          totalAttempts: 0,
        },
        {
          id: 2,
          title: "Passage Two",
          correctlyAnswered: false,
          totalAttempts: 0,
        },
      ]);
    });
  });

  describe("scoreAnswer", () => {
    it("returns true when the selected option is the answer key", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([{ isAnswerKey: true }]),
        }),
      } as any);

      const result = await itemService.scoreAnswer(1, 1);

      expect(result).toBe(true);
    });

    it("returns false when the selected option is not the answer key", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([{ isAnswerKey: false }]),
        }),
      } as any);

      const result = await itemService.scoreAnswer(1, 2);

      expect(result).toBe(false);
    });

    it("throws when the option does not exist", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      } as any);

      await expect(itemService.scoreAnswer(1, 999)).rejects.toThrow("Option id does not match passage id.");
    });
  });

  describe("getItem", () => {
    it("returns the passage and its options", async () => {
      vi.mocked(db.select)
        // First call: fetches the passage
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([mockPassage]),
          }),
        } as any)
        // Second call: fetches the options
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              orderBy: vi.fn().mockResolvedValue(mockOptions),
            }),
          }),
        } as any);

      const result = await itemService.getItem(1);

      expect(result).toEqual({ passage: mockPassage, options: mockOptions });
    });
  });
});
