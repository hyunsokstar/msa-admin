import ICommonChattings from "@/components/main_page/ICommonChattings";
import IUserListWithLoginStatus from "@/components/main_page/IUserListWithLoginStatus";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 pb-6 flex flex-col">
      {/* 상단 4개 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card className="p-6 h-40 flex items-center justify-center">
          <h3 className="text-lg font-medium">영역 1</h3>
        </Card>
        <Card className="p-6 h-40 flex items-center justify-center">
          <h3 className="text-lg font-medium">영역 2</h3>
        </Card>
        <Card className="p-6 h-40 flex items-center justify-center">
          <h3 className="text-lg font-medium">영역 3</h3>
        </Card>
        <Card className="p-6 h-40 flex items-center justify-center">
          <h3 className="text-lg font-medium">영역 4</h3>
        </Card>
      </div>

      {/* 하단 2개 영역 */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-4 min-h-0 mb-4">
        <div className="md:col-span-4 h-full">
          <ICommonChattings className="h-full w-full" />
        </div>
        <div className="md:col-span-3 h-full">
          <IUserListWithLoginStatus className="h-full" />
        </div>
      </div>
    </div>
  );
}