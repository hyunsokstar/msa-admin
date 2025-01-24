'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck } from 'lucide-react';

export default function PublicProfile({ params }: { params: Promise<{ userId: string }> }) {
  const resolvedParams = React.use(params);
  
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 lg:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>User ID: {resolvedParams.userId}</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <h3 className="text-lg font-semibold">Unknown User</h3>
                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-sm text-muted-foreground">일반 사용자</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}