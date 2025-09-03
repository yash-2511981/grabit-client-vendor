import useVendorStore from "@/store/store";

const Dashboard = () => {
  const { vendor } = useVendorStore();
  console.log(vendor)

  return <div>DashBoard</div>;
};

export default Dashboard;
