import ActionBar from "@/components/ActionBar";
import { useState } from "react";

const Dashboard = () => {
  const [openServie, setOpenServie] = useState("view");

  return (
    <div className="h-full space-y-6 p-4">
      {/* Action Container */}
      <ActionBar setOpenService={setOpenServie} openService={openServie} />
      <div></div>
    </div>
  );
};

export default Dashboard;
