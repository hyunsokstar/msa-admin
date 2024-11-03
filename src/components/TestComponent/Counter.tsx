// C:\Users\terec\msa-admin\src\components\TestComponent\Counter.tsx
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/store/useCounterStore';

const Counter = () => {
    const { count, increment, decrement, reset } = useCounterStore();

    return (
        <Card className="w-96">
            <CardHeader>
                <CardTitle className="text-center">Zustand Counter</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <div className="text-4xl font-bold">{count}</div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={decrement}
                            className="w-24"
                        >
                            감소
                        </Button>
                        <Button
                            variant="default"
                            onClick={increment}
                            className="w-24"
                        >
                            증가
                        </Button>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={reset}
                        className="w-full"
                    >
                        초기화
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default Counter;