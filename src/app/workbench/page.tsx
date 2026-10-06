import { getWorkbenchData } from "@/actions/workbench";
import WorkbenchDashboard from "./WorkbenchDashboard";

export const dynamic = 'force-dynamic';

export default async function WorkbenchPage() {
  const data = await getWorkbenchData();
  return <WorkbenchDashboard data={data} />;
}
