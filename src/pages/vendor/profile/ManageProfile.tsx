import AccountSettings from "./components/AccountSettings";
import Notifications from "./components/Notifications";
import ViewOrEditBankDetails from "./components/ViewOrEditBankDetails";
import ViewOrEditDocument from "./components/ViewOrEditDocument";
import ViewOrEditProfile from "./components/ViewOrEditProfile";

const ManageProfile = () => {
  return (
    <div className="h-screen space-y-6 px-2 sm:p-4 flex flex-col overflow-x-hidden app-background relative">
      <div className="flex flex-col gap-2  max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Profile Overview</h1>
        <p className="text-muted-foreground">Manage Your Buisness Details</p>
      </div>
      <div className="overflow-y-auto hide-scrollbar p-2">
        <div className="flex flex-col gap-3">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
            <div className="col-span-2">
              <ViewOrEditProfile />
            </div>
            <div className="col-span-1">
              <ViewOrEditDocument />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 col-span-2">
              <ViewOrEditBankDetails />
              <Notifications />
            </div>
            <div className="col-span-1">
              <AccountSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
