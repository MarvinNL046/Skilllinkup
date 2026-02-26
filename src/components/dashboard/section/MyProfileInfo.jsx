import DashboardNavigation from "../header/DashboardNavigation";
import ProfileDetails from "./ProfileDetails";

export default function MyProfileInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>My Profile</h2>
              <p className="text">Update your profile information and skills.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <ProfileDetails />
          </div>
        </div>
      </div>
    </>
  );
}
