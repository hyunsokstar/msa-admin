import { apiForSendMessage } from '@/api/apiForChat';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useApiForSendMessageForChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, content }: { roomId: string; content: string }) =>
      apiForSendMessage(roomId, content),
    onSuccess: (data, variables) => {
      // 메시지 전송 성공 시 해당 채팅방의 메시지 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['messages', variables.roomId] });
    },
  });
};

export default useApiForSendMessageForChatRoom;