import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Creat{pending ? "ing" : "e"} Team
    </Button>
  );
};