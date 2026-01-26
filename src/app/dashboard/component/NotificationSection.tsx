import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

const NotificationSection = () => {
  return (
    <Field orientation="horizontal" className="max-w-sm">
      <FieldContent>
        <FieldLabel htmlFor="switch-notification">Notification</FieldLabel>
        <FieldDescription>Turn off all notifications</FieldDescription>
      </FieldContent>
      <Switch id="switch-notification" />
    </Field>
  );
};

export default NotificationSection;
