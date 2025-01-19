import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  // 드래그 중인 아이템에 대한 스타일 변경을 위함
  isDragging?: boolean;
}

export function TaskCardForDashBoard({
  id,
  title,
  description,
  isDragging = false
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortingDragging
  } = useSortable({ id });

  // 실제 마우스로 끌고 있는 "Overlay"가 아닌,
  // 리스트 내 원본 카드의 드래깅 상태
  // (isSortingDragging는 DnD Kit이 제공하는 boolean)
  // isDragging prop은 상위에서 custom으로 내려준 것
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // 아래와 같이 하시면 "원본 위치 카드"가 반투명
    // 단, Overlay는 별도라 원본 카드가 반투명해져도 문제 없음
    opacity: isSortingDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        // 드래그 가능한 영역
        {...listeners}
        className="bg-white cursor-move hover:shadow-md transition-all duration-200 border-none shadow-sm hover:scale-[1.02]"
      >
        <CardHeader className="p-3 pb-1">
          <h3 className="font-medium text-gray-800">{title}</h3>
        </CardHeader>
        <CardContent className="p-3 pt-0 text-sm text-gray-600">
          {description}
        </CardContent>
      </Card>
    </div>
  );
}
