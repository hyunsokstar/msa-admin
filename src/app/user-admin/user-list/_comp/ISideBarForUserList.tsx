// src/components/sidebar/ISideBarForUserList.tsx
import { Users, ChevronRight, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiForOrganizationAndUsers } from "@/hook/users/useApiForOrganizationAndUsers";
import { IOrganization } from "@/types/typeForOrganization";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ISideBarForUserListProps {
    onSelectOrganization: (orgId: string | null) => void;
    selectedOrgId: string | null;
}

const ISideBarForUserList = ({ onSelectOrganization, selectedOrgId }: ISideBarForUserListProps) => {
    const { data: organizationsWithUsers, isLoading } = useApiForOrganizationAndUsers();
    const [expandedOrgs, setExpandedOrgs] = useState<Set<string>>(new Set());

    const toggleExpand = (orgId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedOrgs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orgId)) {
                newSet.delete(orgId);
            } else {
                newSet.add(orgId);
            }
            return newSet;
        });
    };

    const getInitials = (name: string | null) => {
        if (!name) return 'UN';
        return name.substring(0, 2).toUpperCase();
    };

const renderOrganizationTree = (organizations: IOrganization[] = [], parentId: string | null = null, level: number = 0) => {
    return organizations
        .filter(org => org.parent_id === parentId)
        .map(org => {
            const isExpanded = expandedOrgs.has(org.id);
            const hasMembers = org.members.length > 0;

            return (
                <div key={org.id} className="w-full">
                    <div 
                        style={{ marginLeft: `${level * 16}px` }}
                        className="flex flex-col"
                    >
                        <div className="flex items-center w-full">
                            {hasMembers && (
                                <div
                                    onClick={(e) => toggleExpand(org.id, e)}
                                    className="p-1 hover:bg-orange-200 rounded cursor-pointer"
                                >
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </div>
                            )}
                            <button
                                onClick={() => onSelectOrganization(org.id)}
                                className={cn(
                                    "flex-1 text-left p-2 rounded-lg hover:bg-orange-100/50 flex items-center gap-2 text-sm",
                                    selectedOrgId === org.id && "bg-orange-100 text-orange-700"
                                )}
                            >
                                <Users className="h-4 w-4" />
                                <span>{org.name}</span>
                                {hasMembers && (
                                    <span className="text-xs text-gray-500">
                                        ({org.members.length})
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Members List */}
                        {isExpanded && hasMembers && (
                            <div className="ml-8 space-y-1 mt-1">
                                {org.members.map(member => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-2 p-2 rounded-lg text-sm text-gray-600"
                                    >
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={member.profile_image_url || ''} />
                                            <AvatarFallback className="bg-orange-100 text-orange-700 text-xs">
                                                {getInitials(member.full_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{member.full_name || member.email}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {renderOrganizationTree(organizations, org.id, level + 1)}
                </div>
            );
        });
};

    if (isLoading) {
        return (
            <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    조직도
                </h3>
                <div className="text-sm text-gray-600 animate-pulse">
                    로딩중...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-orange-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                조직도
            </h3>
            <div className="space-y-1">
                <button
                    onClick={() => onSelectOrganization(null)}
                    className={cn(
                        "w-full text-left p-2 rounded-lg hover:bg-orange-100/50 text-sm",
                        selectedOrgId === null && "bg-orange-100 text-orange-700"
                    )}
                >
                    전체 보기
                </button>
                {organizationsWithUsers && renderOrganizationTree(organizationsWithUsers)}
            </div>
        </div>
    );
};

export default ISideBarForUserList;