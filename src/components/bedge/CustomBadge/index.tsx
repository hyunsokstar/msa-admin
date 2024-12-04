// src/components/ui/custom-badge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomBadgeProps {
    variant?: "status" | "priority" | "category" | "type";
    value: string;
    className?: string;
}

export const CustomBadge = ({
    variant = "status",
    value,
    className,
}: CustomBadgeProps) => {
    const getVariantStyles = () => {
        const styles = {
            // Status styles
            "status-Open": "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
            "status-In Progress": "bg-sky-100 text-sky-800 hover:bg-sky-100",
            "status-Closed": "bg-slate-100 text-slate-800 hover:bg-slate-100",
            
            // Priority styles
            "priority-High": "bg-rose-100 text-rose-800 hover:bg-rose-100",
            "priority-Medium": "bg-amber-100 text-amber-800 hover:bg-amber-100",
            "priority-Low": "bg-blue-100 text-blue-800 hover:bg-blue-100",
            
            // Category styles
            "category-shop": "bg-purple-100 text-purple-800 hover:bg-purple-100",
            "category-cms": "bg-teal-100 text-teal-800 hover:bg-teal-100",
            "category-lms": "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
            "category-user": "bg-orange-100 text-orange-800 hover:bg-orange-100",
            
            // Issue type styles
            "type-Bug": "bg-red-100 text-red-800 hover:bg-red-100",
            "type-Feature": "bg-violet-100 text-violet-800 hover:bg-violet-100",
            "type-Enhancement": "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
        };

        const key = `${variant}-${value}` as keyof typeof styles;
        return styles[key] || "bg-gray-100 text-gray-800 hover:bg-gray-100";
    };

    return (
        <Badge
            variant="secondary"
            className={cn(getVariantStyles(), className)}
        >
            {value}
        </Badge>
    );
};