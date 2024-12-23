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
            
            // Priority styles - 모두 green 색상 사용
            "priority-High": "bg-green-100 text-green-800 hover:bg-green-100",
            "priority-Medium": "bg-green-100 text-green-800 hover:bg-green-100",
            "priority-Low": "bg-green-100 text-green-800 hover:bg-green-100",
        
            // Issue type styles - 모두 yellow 색상 사용
            "type-Bug": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            "type-Feature": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            "type-Enhancement": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",

            // Status styles - 모두 pink 색상 사용
            "status-Open": "bg-pink-100 text-pink-800 hover:bg-pink-100",
            "status-In Progress": "bg-pink-100 text-pink-800 hover:bg-pink-100",
            "status-Closed": "bg-pink-100 text-pink-800 hover:bg-pink-100",

        };

        const key = `${variant}-${value}` as keyof typeof styles;
        return styles[key] || "bg-blue-100 text-blue-800 hover:bg-blue-100";
    };

    return (
        <Badge
            variant="secondary"
            className={cn(
                "w-20 min-w-[5rem] text-center justify-center", // 너비를 22로 조정
                getVariantStyles(),
                className
            )}
        >
            {value}
        </Badge>
    );
};