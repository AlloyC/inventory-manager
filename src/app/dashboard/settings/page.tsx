import ProfileSettingsSection from "../component/ProfileSettingsSection";
import NotificationSection from "../component/NotificationSection";
import ThemeSection from "../component/ThemeSection";

const page = () => {
  return (
    <div className="border">
      <ProfileSettingsSection />
      <ThemeSection />
      {/* <NotificationSection /> */}
    </div>
  );
};

export default page;
