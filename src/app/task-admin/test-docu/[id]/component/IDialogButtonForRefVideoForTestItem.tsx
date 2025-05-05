// components/test/IDialogButtonForRefVideoForTestItem.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Film, Plus, Loader2, Play, Pause, X, Maximize2, Edit, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQueryClient } from '@tanstack/react-query';
import VideoUploader2 from '@/components/file-uploader/VideoUploader2';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import CommonSwitch from '@/components/common/CommonSwitch';
import { useApiForUpdateTestItemRefVideo } from '@/hook/useApiForUpdateTestItemRefVideo ';

interface IDialogButtonForRefVideoForTestItemProps {
    testItemId: string;
    targetId: string;
    videoUrl: string | null;
    onClick?: () => void;
    onVideoUpdated?: (newVideoUrl: string) => void;
}

const IDialogButtonForRefVideoForTestItem: React.FC<IDialogButtonForRefVideoForTestItemProps> = ({
    testItemId,
    targetId,
    videoUrl,
    onClick,
    onVideoUpdated
}) => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFullscreenPlayer, setIsFullscreenPlayer] = useState(true); // 기본값을 true로 설정
    const videoRef = useRef<HTMLVideoElement>(null);
    const updateVideoMutation = useApiForUpdateTestItemRefVideo();

    // 컴포넌트 모드 변경 시 효과
    useEffect(() => {
        // 보기 모드에서는 항상 전체화면 플레이어 사용
        if (!isEditMode) {
            setIsFullscreenPlayer(true);
        }
    }, [isEditMode]);

    // 다이얼로그 상태 변경 감지
    useEffect(() => {
        // 다이얼로그가 닫힐 때 편집 모드에서 보기 모드로 자동 전환
        if (!isDialogOpen && isEditMode) {
            setIsEditMode(false);
        }
    }, [isDialogOpen]);

    const handleUploadComplete = async (fileUrl: string) => {
        try {
            // Call the mutation to update the video
            await updateVideoMutation.mutateAsync({
                itemId: testItemId,
                videoUrl: fileUrl
            });
            
            // Manually update the cache to ensure UI updates immediately
            queryClient.invalidateQueries({ 
                queryKey: ['testItems']
            });
            
            queryClient.invalidateQueries({ 
                queryKey: ['testTarget']
            });
            
            // Notify parent component if callback provided
            if (onVideoUpdated) {
                onVideoUpdated(fileUrl);
            }
            
            // Close the dialog after successful update
            setIsDialogOpen(false);
            // Reset to preview mode after update
            setIsEditMode(false);
            // 미리보기를 자동으로 열어 업데이트된 비디오 표시
            setIsPreviewOpen(true);
        } catch (err) {
            // Error is already handled by the mutation hook
            console.error("Error details:", err);
        }
    };

    // 비디오 재생/일시정지 토글
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // 새 창에서 비디오 열기
    const openInNewTab = () => {
        if (videoUrl) {
            window.open(videoUrl, '_blank');
        }
    };

    // 비디오 대화상자 열기
    const openVideoDialog = () => {
        if (onClick && !isEditMode) {
            onClick();
        } else {
            if (isEditMode) {
                // 편집 모드에서는 업로드 다이얼로그 열기
                setIsDialogOpen(true);
            } else {
                // 보기 모드에서는 미리보기 열기
                setIsPreviewOpen(true);
            }
        }
    };

    // 비디오 미리보기 열기
    const openPreview = (e: React.MouseEvent) => {
        e.stopPropagation(); // 부모 클릭 이벤트 전파 방지
        if (!isEditMode) {
            setIsPreviewOpen(true);
        } else {
            setIsDialogOpen(true);
        }
    };

    // 편집 모드 토글
    const toggleEditMode = (checked: boolean) => {
        setIsEditMode(!checked); // 보기 모드가 checked=true, 편집 모드가 checked=false
        
        if (!checked) { // 편집 모드로 전환
            // 편집 모드로 전환 시 플레이어 전체화면 해제
            setIsFullscreenPlayer(false);
            if (isPreviewOpen) {
                // 편집 모드로 전환 시 미리보기 닫고 업로드 다이얼로그 열기
                setIsPreviewOpen(false);
                setIsDialogOpen(true);
            }
        } else { // 보기 모드로 전환
            // 보기 모드로 전환 시 플레이어 전체화면 설정
            setIsFullscreenPlayer(true);
            if (isDialogOpen) {
                // 업로드 다이얼로그 닫고 미리보기 열기
                setIsDialogOpen(false);
                setIsPreviewOpen(true);
            }
        }
    };

    // 모드 토글 버튼 렌더링 - 다이얼로그 내부 전용
    const renderDialogModeToggle = () => {
        if (!videoUrl) return null;
        
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center">
                            <CommonSwitch
                                id={`edit-mode-toggle-dialog-${testItemId}`}
                                checked={!isEditMode} // CommonSwitch에서는 checked가 true일 때 녹색(보기 모드)
                                onCheckedChange={toggleEditMode}
                                label={isEditMode ? "보기" : "편집"} // 현재 모드의 반대를 표시
                            />
                        </div>
                    </TooltipTrigger>
                    {/* <TooltipContent>
                        <p>{isEditMode ? '동영상 보기 모드로 전환' : '동영상 편집 모드로 전환'}</p>
                    </TooltipContent> */}
                </Tooltip>
            </TooltipProvider>
        );
    };

    return (
        <>
            {/* Clickable element (either preview or add button) */}
            <div className="flex items-center">
                {updateVideoMutation.isPending ? (
                    // Loading state
                    <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50">
                        <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
                    </div>
                ) : videoUrl ? (
                    // If we have a video, show the preview that's clickable
                    <div 
                        className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:border-red-400 transition-colors relative group bg-gray-50"
                        onClick={openVideoDialog}
                    >
                        {/* Video thumbnail (or fallback) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Film className="h-7 w-7 text-red-500 mb-1" />
                            <span className="text-xs text-red-500">동영상</span>
                        </div>

                        {/* Play button overlay on hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button 
                                className="bg-white bg-opacity-70 rounded-full p-1.5 hover:bg-opacity-90 transition-all"
                                onClick={openPreview}
                            >
                                {isEditMode ? (
                                    <Edit className="h-5 w-5 text-red-500" />
                                ) : (
                                    <Play className="h-5 w-5 text-red-500" />
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    // If no video, show a button to add one
                    <div
                        className="w-16 h-16 flex flex-col items-center justify-center border border-dashed border-red-400 rounded-md cursor-pointer hover:bg-red-50 transition-colors"
                        onClick={openVideoDialog}
                    >
                        <Plus className="h-4 w-4 text-red-500 mb-1" />
                        <Film className="h-5 w-5 text-red-500 mb-1" />
                        <span className="text-xs text-red-600">동영상</span>
                    </div>
                )}
            </div>

            {/* Upload/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-md p-6">
                    <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle>{videoUrl ? "참조 동영상 수정" : "참조 동영상 업로드"}</DialogTitle>
                        
                        {/* 다이얼로그 내 모드 토글 버튼 */}
                        {videoUrl && renderDialogModeToggle()}
                    </DialogHeader>
                    <div className="py-4">
                        <VideoUploader2
                            onUploadComplete={handleUploadComplete}
                            isUpdate={!!videoUrl}
                            initialVideo={videoUrl || undefined}
                        />
                    </div>
                    {updateVideoMutation.error && (
                        <p className="text-sm text-red-500 mt-2">
                            오류: {updateVideoMutation.error instanceof Error 
                                ? updateVideoMutation.error.message 
                                : '알 수 없는 오류가 발생했습니다'}
                        </p>
                    )}
                </DialogContent>
            </Dialog>

            {/* Video Preview Modal */}
            {isPreviewOpen && videoUrl && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                    <div className={`${isFullscreenPlayer ? 'w-full h-full flex items-center justify-center' : 'bg-white rounded-lg overflow-hidden max-w-4xl max-h-[95vh] w-full'}`}>
                        {/* 헤더 (보기 모드에서 플레이어 전체화면일 때는 상단 오버레이로 변경) */}
                        {isFullscreenPlayer ? (
                            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-3 flex justify-between items-center">
                                <h3 className="font-medium text-white">참조 동영상</h3>
                                <div className="flex space-x-2 items-center">
                                    {/* 오른쪽 상단에 다이얼로그로 이동 버튼 추가 */}
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors"
                                        onClick={() => {
                                            setIsPreviewOpen(false);
                                            setIsEditMode(true);
                                            setIsDialogOpen(true);
                                        }}
                                        title="편집 모드로 전환"
                                    >
                                        편집
                                    </button>
                                    
                                    <button
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                        onClick={openInNewTab}
                                        title="새 창에서 열기"
                                    >
                                        <Maximize2 className="h-5 w-5 text-white" />
                                    </button>
                                    <button
                                        className="p-1 hover:bg-white/20 rounded transition-colors"
                                        onClick={() => setIsPreviewOpen(false)}
                                        title="닫기"
                                    >
                                        <X className="h-5 w-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center p-3 border-b">
                                <h3 className="font-medium">테스트 참조 동영상</h3>
                                <div className="flex space-x-2 items-center">
                                    {/* 미리보기 모달 내 모드 토글 버튼 */}
                                    {renderDialogModeToggle()}
                                    
                                    <button
                                        className="p-1 hover:bg-gray-100 rounded"
                                        onClick={openInNewTab}
                                        title="새 창에서 열기"
                                    >
                                        <Maximize2 className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <button
                                        className="p-1 hover:bg-gray-100 rounded"
                                        onClick={() => setIsPreviewOpen(false)}
                                        title="닫기"
                                    >
                                        <X className="h-5 w-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {/* 비디오 컨테이너 */}
                        <div className={`flex items-center justify-center bg-black relative ${isFullscreenPlayer ? 'w-full h-full' : 'p-4'}`}>
                            <video 
                                ref={videoRef}
                                src={videoUrl} 
                                className={`${isFullscreenPlayer ? 'max-w-full max-h-screen' : 'max-w-full max-h-[70vh]'}`}
                                controls
                                controlsList="nodownload"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onEnded={() => setIsPlaying(false)}
                                autoPlay={isFullscreenPlayer} // 전체화면 모드에서 자동 재생
                            />
                            
                            {/* 재생/정지 오버레이 (선택사항) - 전체화면 모드에서는 사용 안함 */}
                            {!isFullscreenPlayer && (
                                <div 
                                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                    onClick={togglePlay}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    <div className="bg-black bg-opacity-40 rounded-full p-4">
                                        {isPlaying ? (
                                            <Pause className="w-8 h-8 text-white" />
                                        ) : (
                                            <Play className="w-8 h-8 text-white" />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IDialogButtonForRefVideoForTestItem;