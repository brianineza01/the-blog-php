import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => {
    return (
        <Loader2
            className={cn("h-6 w-6 text-primary/60 animate-spin", className)}
        />
    );
};

export default Spinner;
