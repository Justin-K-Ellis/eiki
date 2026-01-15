import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
  currentUser: vi.fn(),
}));

vi.mock("@/services/Items.service", () => ({
  default: {
    scoreAnswer: vi.fn(),
  },
}));

vi.mock("@/services/Users.service", () => ({
  default: {
    updatePassageAttempts: vi.fn(),
  },
}));

import { scoreAnswer } from "../../lib/actions";
import { auth, currentUser } from "@clerk/nextjs/server";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("scoreAnswer", () => {
  it("returns null when not authenticated", async () => {
    (auth as any).mockResolvedValue({ isAuthenticated: false });

    const result = await scoreAnswer(1, 2);
    expect(result).toBeNull();
    expect((itemService as any).scoreAnswer).not.toHaveBeenCalled();
  });

  it("returns null when there is no current user", async () => {
    (auth as any).mockResolvedValue({ isAuthenticated: true });
    (currentUser as any).mockResolvedValue(null);

    const result = await scoreAnswer(5, 6);
    expect(result).toBeNull();
    expect((itemService as any).scoreAnswer).not.toHaveBeenCalled();
  });

  it("returns true for a correct answer and updates attempts", async () => {
    (auth as any).mockResolvedValue({ isAuthenticated: true });
    (currentUser as any).mockResolvedValue({ id: "user-1" });
    (itemService as any).scoreAnswer.mockResolvedValue(true);
    (usersService as any).updatePassageAttempts.mockResolvedValue(undefined);

    const res = await scoreAnswer(11, 22);
    expect(res).toBe(true);
    expect((itemService as any).scoreAnswer).toHaveBeenCalledWith(22, 11);
    expect((usersService as any).updatePassageAttempts).toHaveBeenCalledWith(
      "user-1",
      22,
      true
    );
  });

  it("returns null when itemService throws an error", async () => {
    (auth as any).mockResolvedValue({ isAuthenticated: true });
    (currentUser as any).mockResolvedValue({ id: "user-2" });
    (itemService as any).scoreAnswer.mockRejectedValue(new Error("boom"));

    const res = await scoreAnswer(3, 4);
    expect(res).toBeNull();
    expect(usersService.updatePassageAttempts).not.toHaveBeenCalled();
  });
});
