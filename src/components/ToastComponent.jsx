import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ToastComponent({ message }) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "sdsadds",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
