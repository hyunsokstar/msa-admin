// /src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];  // 'files'로 변경
    const promptText = formData.get('promptText') as string;

    if (!files.length) {
        return NextResponse.json({ message: 'No files provided' }, { status: 400 });
    }

    try {
        // Process all files to base64
        const imageContents = await Promise.all(
            files.map(async (file) => {
                const fileBuffer = await file.arrayBuffer();
                const fileBase64 = Buffer.from(fileBuffer).toString('base64');
                return {
                    type: 'image',
                    source: {
                        type: 'base64',
                        media_type: file.type,
                        data: fileBase64
                    }
                };
            })
        );

        // Construct message content with text and all images
        const messageContent = [
            {
                type: 'text',
                text: promptText
            },
            ...imageContents
        ];

        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: 'claude-3-opus-20240229',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'user',
                        content: messageContent
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.ANTHROPIC_API_KEY,  // NEXT_PUBLIC_ 제거
                    'anthropic-version': '2023-06-01'
                }
            }
        );

        if (!response.data.content || response.data.content.length === 0) {
            throw new Error('No content in response');
        }

        return NextResponse.json({ 
            answer: response.data.content[0].text,
            messageId: response.data.id
        });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({
            message: 'Error processing request',
            details: error.response?.data || error.message
        }, { status: error.response?.status || 500 });
    }
}

// 파일 크기 제한 설정
export const config = {
    api: {
        bodyParser: false,
        responseLimit: '50mb',
    },
};