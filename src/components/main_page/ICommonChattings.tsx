"use client";
import { useQuery } from "@tanstack/react-query";
import { apiForGetCommonChattings } from "@/api/main/apiForCommonChattings";
import { useCommonChattings } from "@/hook/main/useCommonChattings";
import ChatContainer from "./ChatContainer";

interface ICommonChattingsProps {
    className?: string;
}

export default function ICommonChattings({ className }: ICommonChattingsProps) {
    useCommonChattings();  // 실시간 구독 설정

    const { data: chattingsData, refetch } = useQuery({
        queryKey: ["commonChattings"],
        queryFn: () => apiForGetCommonChattings(),
        refetchOnWindowFocus: false,  // 윈도우 포커스시 자동 재조회 비활성화
        staleTime: 0,  // 데이터를 항상 최신으로 취급
    });

    return (
        <ChatContainer
            className={className}
            messages={chattingsData?.data || []}
            onSuccess={refetch}
        />
    );
}