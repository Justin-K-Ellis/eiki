import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { UserButton } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";

import { CEFRLevel, cefrEnum } from "@/db/schema";
import itemService from "@/services/Items.service";
import usersService from "@/services/Users.service";
import { currentUser } from "@clerk/nextjs/server";
import getRoundedNum from "@/lib/getRoundedNum";

export default async function Dashboard() {
  // User stuff
  const user = await currentUser();
  if (!user) {
    return <p>User not found!</p>;
  }
  const userName =
    user.firstName ??
    user.fullName ??
    user.emailAddresses[0].emailAddress ??
    "User";

  // internationalization stuff
  const t = await getTranslations("Dashboard");
  const titleMsg = t("title", { name: userName });
  const manageAccountMsg = t("manageAccount");
  const summaryTitleMsg = t("summaryTitle");
  const levelDescMsg = t("level");
  const completeMsg = t("complete");
  const totalMsg = t("total");
  const progressMsg = t("progress");

  // level & completion data
  const levels: CEFRLevel[] = cefrEnum.enumValues;

  const [userCompStats, totalPassageCounts] = await Promise.all([
    usersService.getCompletionStats(user.id),
    itemService.getNumOfPassagesByCEFR(),
  ]);

  const compStats = levels.map((level) => {
    const complete = userCompStats.get(level) ?? 0;
    const total = totalPassageCounts.get(level) ?? 0;
    return {
      level: level,
      complete: complete,
      total: total,
      percentDone: getRoundedNum(complete, total),
    };
  });

  const totalComplete = compStats.reduce((acc, stat) => acc + stat.complete, 0);

  return (
    <div>
      <div id="account" className="flex justify-around">
        <h1 className="text-2xl md:text-3xl font-bold">{titleMsg}</h1>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center w-1/3">
          <p className="text-sm text-zinc-600 text-center">
            {manageAccountMsg}
          </p>
          <UserButton />
        </div>
      </div>
      <div className="shadow p-4 my-4">
        <p className="text-2xl md:text-3xl">
          {summaryTitleMsg}
          {totalComplete}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{levelDescMsg}</TableHead>
            <TableHead>{completeMsg}</TableHead>
            <TableHead>{totalMsg}</TableHead>
            <TableHead className="text-right">{progressMsg}</TableHead>
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
                  <Progress value={stats.percentDone} />
                </span>
                {stats.percentDone}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
