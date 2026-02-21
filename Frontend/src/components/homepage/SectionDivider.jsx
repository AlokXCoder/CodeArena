import { Swords } from "lucide-react";
import { cn } from "../../lib/utils";

export default function SectionDivider({ className }) {
    return (
        <div className={cn("relative w-full overflow-hidden py-4", className)}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-osu/50 to-transparent" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-osu/40 to-transparent blur-md" />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-black p-1.5 rounded-full">
                    <Swords className="text-osu w-8 h-8 opacity-80" />
                </div>
            </div>
        </div>
    );
}
