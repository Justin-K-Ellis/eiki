import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

import { CEFRLevel } from "@/db/schema";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";
import { currentUser } from "@clerk/nextjs/server";
import getRoundedNum from "@/lib/getRoundedNum";

export default async function Dashboard() {
  const levels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const user = await currentUser();
  if (!user) {
    return <p>User not found!</p>;
  }
  const name =
    user.firstName ?? user.fullName ?? user.emailAddresses.toString();

  const compStatsP = levels.map(async (level) => {
    const totalPassageCount = await itemService.getNumOfPassagesByCEFR(level);
    const completedCount = await usersService.getNumOfCompletedPassagesByCEFR(
      user!.id,
      level,
    );
    return {
      level: level,
      complete: completedCount,
      total: totalPassageCount,
    };
  });

  const compStats = await Promise.all(compStatsP);
  const totalComplete = compStats.reduce((a, b) => a + b.complete, 0);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold">{name}&apos; Dashboard</h1>
      <div className="shadow p-4 my-4">
        <p className="text-2xl md:text-3xl">
          Total lessons completed: {totalComplete}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Level</TableHead>
            <TableHead>Complete</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {compStats.map((stats) => (
            <TableRow key={stats.level}>
              <TableCell className="font-medium">{stats.level}</TableCell>
              <TableCell>{stats.complete}</TableCell>
              <TableCell>{stats.total}</TableCell>
              <TableCell className="text-right">
                <span>
                  <Progress
                    value={getRoundedNum(stats.complete, stats.total)}
                  />
                </span>
                {getRoundedNum(stats.complete, stats.total)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
