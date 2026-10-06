import { getDataQualityMetrics } from "@/actions/data-quality";
import DataQualityDashboard from "./DataQualityDashboard";

export const dynamic = 'force-dynamic';

export default async function DataQualityPage() {
  const data = await getDataQualityMetrics();
  return <DataQualityDashboard data={data} />;
}
