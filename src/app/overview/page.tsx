import { getOverviewKPIs, getFunnelData, getHiringHealth } from "@/actions/overview";
import OverviewDashboard from "./OverviewDashboard";

export const dynamic = 'force-dynamic';

export default async function OverviewPage() {
  const [kpis, funnel, health] = await Promise.all([
    getOverviewKPIs(),
    getFunnelData(),
    getHiringHealth()
  ]);

  return <OverviewDashboard kpis={kpis} funnel={funnel} health={health} />;
}
