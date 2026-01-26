import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

const NotificationSection = () => {
  return (
    <div id="notification" className="py-8 mb-20 md:mb-48">
      <Field orientation="horizontal" className=" px-5">
        <FieldContent>
          <FieldLabel htmlFor="switch-notification" className="text-lg">
            Notification
          </FieldLabel>
          <FieldDescription>Turn off all notifications</FieldDescription>
        </FieldContent>
        <Switch id="switch-notification" />
      </Field>
    </div>
  );
};

export default NotificationSection;
