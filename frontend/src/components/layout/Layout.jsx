import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { CREAM } from "../../theme";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full" style={{ backgroundColor: CREAM }}>
      <Topbar />

      <div className="flex flex-1 min-w-0">
        <Sidebar />
        <main className="flex-1 p-6 relative z-10">{children}</main>
      </div>
    </div>
  );
}