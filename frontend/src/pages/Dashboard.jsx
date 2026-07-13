import React from "react";
import HeroCard from "../components/dashboard/HeroCard";
import DonutCard from "../components/dashboard/DonutCard";
import StatCard from "../components/dashboard/StatCard";
import ActivityChartCard from "../components/dashboard/ActivityChartCard";
import DeviceTable from "../components/dashboard/DeviceTable";
import ActivityFeedCard from "../components/dashboard/ActivityFeedCard";
import { ACCENT, DANGER, FONT_SANS } from "../theme";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-5" style={{ fontFamily: FONT_SANS }}>
      <div className="col-span-12 lg:col-span-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <HeroCard />
          <DonutCard />
        </div>
        <DeviceTable />
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-5">
        <StatCard label="Open Faults" value="6" icon={AlertTriangle} tone={DANGER} progress={28} />
        <ActivityChartCard />
        <StatCard label="Pending Transfers" value="12" icon={ArrowRightLeft} tone={ACCENT} progress={54} />
      </div>

      <div className="col-span-12">
        <ActivityFeedCard />
      </div>
    </div>
  );
}