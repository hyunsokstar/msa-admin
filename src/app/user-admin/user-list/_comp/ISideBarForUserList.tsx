import { Users, ChevronRight, ChevronDown, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiForOrganizationAndUsers } from "@/hook/users/useApiForOrganizationAndUsers";
import { IOrganization } from "@/types/typeForOrganization";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ISideBarForUserListProps {
  onSelectOrganization: (orgId: string | null) => void;
  selectedOrgId: string | null;
}

const ISideBarForUserList = ({
  onSelectOrganization,
  selectedOrgId,
}: ISideBarForUserListProps) => {
  const { data: organizationsWithUsers, isLoading } =
    useApiForOrganizationAndUsers();
  const [expandedOrgs, setExpandedOrgs] = useState<Set<string>>(new Set());

  // expandedOrgs 초기화 로직 (2단 메뉴까지만 펼쳐지도록)
  useEffect(() => {
    if (organizationsWithUsers) {
      const topLevelOrgs = organizationsWithUsers.filter(
        (org) => org.parent_id === null
      );
      const secondLevelOrgs = organizationsWithUsers.filter((org) =>
        topLevelOrgs.some((topOrg) => topOrg.id === org.parent_id)
      );
      setExpandedOrgs(
        new Set([
          ...topLevelOrgs.map((org) => org.id),
          ...secondLevelOrgs.map((org) => org.id),
        ])
      );
    }
  }, [organizationsWithUsers]);

  const toggleExpand = (orgId: string) => {
    setExpandedOrgs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orgId)) {
        newSet.delete(orgId);
      } else {
        newSet.add(orgId);
      }
      return newSet;
    });
  };

  // 부서 클릭 핸들러 (자동 열림/닫힘)
  const handleOrgClick = (org: IOrganization) => {
    toggleExpand(org.id);
  };

  // "해당 부서만 보기" 버튼 클릭 핸들러
  const handleViewOrg = (
    orgId: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    onSelectOrganization(orgId);
  };

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "UN";
    return name.substring(0, 2).toUpperCase();
  };

  const renderOrganizationTree = (
    organizations: IOrganization[] = [],
    parentId: string | null = null,
    level: number = 0
  ) => {
    return organizations
      .filter((org) => org.parent_id === parentId)
      .map((org) => {
        const isExpanded = expandedOrgs.has(org.id);
        const hasMembers = org.members.length > 0;
        const hasChildren = organizations.some(
          (child) => child.parent_id === org.id
        );
        const hasExpandableContent = hasMembers || hasChildren;

        return (
          <div key={org.id} className="w-full">
            <div
              style={{ marginLeft: `${level * 16}px` }}
              className="flex flex-col"
            >
              <div
                className={cn(
                  "flex items-center w-full rounded-lg hover:bg-gray-50 cursor-pointer",
                  selectedOrgId === org.id && !hasChildren && "bg-blue-50" // 변경된 부분: 자식 유무에 따른 조건 추가
                )}
                onClick={() => handleOrgClick(org)} // 부서 클릭 시 자동 열림/닫힘
              >
                <div className="p-1">
                  {hasExpandableContent ? (
                    isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )
                  ) : (
                    <div className="w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "flex-1 flex items-center gap-2 p-2 text-sm",
                    selectedOrgId === org.id && !hasChildren && "text-blue-700" // 변경된 부분: 자식 유무에 따른 조건 추가
                  )}
                >
                  <Users className="h-4 w-4" />
                  <span>{org.name}</span>
                  {hasMembers && (
                    <span className="text-xs text-gray-400">
                      ({org.members.length})
                    </span>
                  )}
                </div>
                {/* "해당 부서만 보기" 버튼 추가 */}
                {!hasChildren && (
                  <Button
                    size={"sm"}
                    className="p-1 cursor-pointer hover:bg-gray-200 rounded"
                    onClick={(e) => handleViewOrg(org.id, e)}
                  >
                    보기
                  </Button>
                )}
              </div>

              {/* Members List */}
              {isExpanded && hasMembers && (
                <div className="ml-8 space-y-1 mt-1">
                  {org.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.profile_image_url || ""} />
                        <AvatarFallback className="bg-blue-50 text-blue-700 text-xs">
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
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          조직도
        </h3>
        <div className="text-sm text-gray-500 animate-pulse">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Users className="h-5 w-5" />
        조직도
      </h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelectOrganization(null)}
          className={cn(
            "w-full text-left p-2 rounded-lg hover:bg-gray-50 text-sm transition-colors",
            selectedOrgId === null && "bg-blue-50 text-blue-700"
          )}
        >
          전체 보기
        </button>
        {/* 최상위 레벨 렌더링 */}
        {organizationsWithUsers &&
          organizationsWithUsers
            .filter((org) => org.parent_id === null)
            .map((org) => (
              <div key={org.id}>
                <div
                  className={cn(
                    "flex items-center w-full rounded-lg hover:bg-gray-50 cursor-pointer",
                    selectedOrgId === org.id &&
                      !organizationsWithUsers.some(
                        (child) => child.parent_id === org.id
                      ) &&
                      "bg-blue-50"
                  )}
                  onClick={() => handleOrgClick(org)}
                >
                  <div className="p-1">
                    {org.members.length > 0 ||
                    organizationsWithUsers.some(
                      (child) => child.parent_id === org.id
                    ) ? (
                      expandedOrgs.has(org.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )
                    ) : (
                      <div className="w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "flex-1 flex items-center gap-2 p-2 text-sm",
                      selectedOrgId === org.id &&
                        !organizationsWithUsers.some(
                          (child) => child.parent_id === org.id
                        ) &&
                        "text-blue-700"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span>{org.name}</span>
                    {org.members.length > 0 && (
                      <span className="text-xs text-gray-400">
                        ({org.members.length})
                      </span>
                    )}
                  </div>
                </div>
                {/* 하위 조직 렌더링 (2단까지만 펼쳐짐) */}
                {expandedOrgs.has(org.id) &&
                  renderOrganizationTree(organizationsWithUsers, org.id, 1)}
              </div>
            ))}
      </div>
    </div>
  );
};

export default ISideBarForUserList;