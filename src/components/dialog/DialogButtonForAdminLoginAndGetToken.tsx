import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Lock } from 'lucide-react';

interface IDialogButtonForAdminLoginAndGetTokenProps {
  onTokenReceived?: (token: string) => void;
  triggerButtonText?: string;
}

const defaultLoginBody = {
  userId: "admin",
  password: "Admin123"
};

export const DialogButtonForAdminLoginAndGetToken = ({ 
  onTokenReceived,
  triggerButtonText = "Admin Login"
}: IDialogButtonForAdminLoginAndGetTokenProps) => {
  const [userId, setUserId] = useState(defaultLoginBody.userId);
  const [password, setPassword] = useState(defaultLoginBody.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'https://api.stg.dankkume.com/api/users/v1/manager/auth/login',
          method: 'POST',
          body: { userId, password }
        })
      });
      
      const data = await response.json();
      
      // 응답 구조에 맞게 수정
      if (data?.data?.access?.token) {
        onTokenReceived?.(data.data.access.token);
        setOpen(false);
      } else {
        setError('로그인 실패: 토큰을 받지 못했습니다');
      }
    } catch (error) {
      setError(`로그인 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Lock className="h-4 w-4 mr-2" />
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>관리자 로그인</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">아이디</label>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디 입력"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleLogin}
            disabled={loading || !userId || !password}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButtonForAdminLoginAndGetToken;