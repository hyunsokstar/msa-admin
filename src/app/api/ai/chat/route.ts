// C:\Users\terec\msa-admin\src\app\api\ai\chat\route.ts
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Anthropic 클라이언트 초기화
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let { model, messages } = body;

        // 요청 모델 검증
        if (!messages) {
            return NextResponse.json(
                { error: '메시지가 필요합니다.' },
                { status: 400 }
            );
        }

        // 기본 모델을 Claude로 설정 (모델이 지정되지 않았거나 gpt로 시작하는 경우)
        if (!model || model.startsWith('gpt')) {
            model = 'claude-3-sonnet-20240229'; // 기본 Claude 모델로 설정
        }

        // Anthropic API 호출
        try {
            const systemMessage = messages.find((m: any) => m.role === 'system')?.content || '';
            const userMessages = messages.filter((m: any) => m.role !== 'system').map((m: any) => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content,
            }));

            const response = await anthropic.messages.create({
                model: model,
                max_tokens: 1000,
                temperature: 0.7,
                system: systemMessage,
                messages: userMessages,
            });

            // Check for the type of content block and extract text accordingly
            const contentBlock = response.content[0];
            const messageContent = contentBlock.type === 'text'
                ? contentBlock.text
                : JSON.stringify(contentBlock);

            return NextResponse.json({
                content: messageContent,
            });
        } catch (anthropicError: any) {
            console.error('Anthropic API 오류:', anthropicError);

            // 사용자에게 보여줄 오류 메시지 정제
            let errorMessage = '요청 처리 중 오류가 발생했습니다.';
            if (anthropicError.status === 401) {
                errorMessage = 'API 인증 오류가 발생했습니다. API 키를 확인하세요.';
            } else if (anthropicError.message) {
                errorMessage = `Anthropic API 오류: ${anthropicError.message}`;
            }

            return NextResponse.json({ error: errorMessage }, { status: 500 });
        }
    } catch (error: any) {
        console.error('일반 오류:', error);
        return NextResponse.json(
            { error: error.message || '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}