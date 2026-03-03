import itemService from "@/services/Items.service";

export default async function Dashboard() {
  const count = await itemService.getNumOfPassagesByCEFR("A1");

  return <div>There are {count} passages in A1.</div>;
}
