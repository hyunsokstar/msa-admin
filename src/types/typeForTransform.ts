// src/types/typeForTransform.ts
export interface TransformStyle {
  id: number;
  name: string;
  trans_format: string;
  description: string;
  placeholder: string;
  created_at: string;
}

export interface TransformInputs {
  name: string;
  method: string;
  endpoint: string;
}

// src/types/typeForTransform.ts
export interface TransformStyle {
 id: number;
 name: string;
 trans_format: string;
 description: string;
 placeholder: string;
 created_at: string;
}

export interface TransformInputs {
 name: string;
 method: string;
 endpoint: string;
}

// CodeTransformFormat은 TransformStyle과 동일한 구조를 가집니다
export type CodeTransformFormat = TransformStyle;

// 생성 시 사용할 입력 타입 (id와 created_at 제외)
export type CodeTransformFormatInput = Omit<CodeTransformFormat, 'id' | 'created_at'>;


export interface TransformTemplate {
  id: number;
  title: string;
  url: string;
  method: string;
  description: string;
  is_completed: boolean;
}

export interface TransformStyle {
  id: number;
  name: string;
  trans_format: string;
  description: string;
  placeholder: string;
  created_at: string;
}

export interface TransformInputs {
  name: string;
  method: string;
  endpoint: string;
}