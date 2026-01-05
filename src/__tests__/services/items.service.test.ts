import { describe, it, expect } from "vitest";
import itemService from "@/services/Items.service";

describe("the items service", () => {
  describe("database querying", () => {
    describe("title list querying", async () => {
      const titleData = await itemService.getItemList(1);

      it("should not be empty", () => {
        expect(titleData).not.toEqual([]);
      });

      it("first element should include a number (id)", () => {
        const data = titleData[0];
        expect(typeof data.id).toBe("number");
      });

      it("first element should include a string (title)", () => {
        const data = titleData[0];
        expect(typeof data.title).toBe("string");
      });
    });
  });
});
