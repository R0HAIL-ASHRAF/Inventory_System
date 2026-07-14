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
    <div className="space-y-5" style={{ fontFamily: FONT_SANS }}>
      {/* Row 1*/}
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <HeroCard />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <DonutCard />
        </div>
        <div className="col-span-6 lg:col-span-3 grid grid-rows-2 gap-5">
          <StatCard label="Open Faults" value="6" icon={AlertTriangle} tone={DANGER} progress={28} />
          <StatCard label="Pending Transfers" value="12" icon={ArrowRightLeft} tone={ACCENT} progress={54} />
        </div>
      </div>

      {/* Row 2*/}
      <div className="grid grid-cols-12 gap-5 items-stretch">
        <div className="col-span-12 lg:col-span-8">
          <DeviceTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ActivityChartCard />
        </div>
      </div>

      {/* Row 3*/}
      <ActivityFeedCard />
    </div>
  );
}