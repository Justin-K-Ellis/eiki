import { describe, it, expect, vi, beforeEach } from "vitest";

import itemService from "@/services/Items.service";
import db from "@/db/index";

vi.mock("@/db/index", () => ({
  default: {
    select: vi.fn(),
  },
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
    vi.clearAllMocks();
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

    it("returns null when the option does not exist", async () => {
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      } as any);

      const result = await itemService.scoreAnswer(1, 999);

      expect(result).toBeNull();
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
