'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp, Brain, Code, Database, Eye, MessageSquare, Zap, Globe, Settings, Bot, Target, BarChart3, Cpu } from 'lucide-react'

interface Props { }

const StudyForAI = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const aiStudyItems = [
        // AI Fundamentals (4종)
        {
            id: 1,
            category: 'fundamentals',
            title: "Mathematics for AI/ML",
            description: "AI/ML을 위한 수학 기초 (선형대수, 통계, 미적분)",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "15-20일",
            techStack: ["Linear Algebra", "Statistics", "Calculus", "NumPy", "SciPy"],
            detailItems: [
                "선형대수 (벡터, 행렬, 고유값/고유벡터)",
                "확률론 및 통계학 기초",
                "미적분학 (편미분, 체인룰, 최적화)",
                "베이즈 정리 및 베이즈 추론",
                "정보 이론 (엔트로피, KL divergence)",
                "NumPy를 활용한 행렬 연산",
                "SciPy 통계 함수 활용",
                "Matplotlib을 통한 수학적 시각화",
                "최적화 이론 (Gradient Descent)",
                "수치 해석 및 근사 알고리즘"
            ]
        },
        {
            id: 2,
            category: 'fundamentals',
            title: "Python for AI/ML",
            description: "AI/ML을 위한 Python 프로그래밍",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "10-15일",
            techStack: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
            detailItems: [
                "Python 고급 문법 (데코레이터, 제너레이터)",
                "NumPy 배열 조작 및 브로드캐스팅",
                "Pandas 데이터 조작 및 전처리",
                "Matplotlib/Seaborn 데이터 시각화",
                "Jupyter Notebook 활용법",
                "객체 지향 프로그래밍 (OOP)",
                "함수형 프로그래밍 패턴",
                "멀티프로세싱 및 병렬 처리",
                "메모리 최적화 기법",
                "디버깅 및 프로파일링"
            ]
        },
        {
            id: 3,
            category: 'fundamentals',
            title: "Data Science Fundamentals",
            description: "데이터 사이언스 기초 및 EDA",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Pandas", "Seaborn", "Plotly", "Scikit-learn", "Feature Engineering"],
            detailItems: [
                "데이터 수집 및 정제 (Data Cleaning)",
                "탐색적 데이터 분석 (EDA)",
                "Feature Engineering 기법",
                "데이터 시각화 고급 기법",
                "결측치 및 이상치 처리",
                "데이터 분포 분석",
                "상관관계 분석",
                "차원 축소 (PCA, t-SNE)",
                "데이터 샘플링 기법",
                "A/B 테스트 설계"
            ]
        },
        {
            id: 4,
            category: 'fundamentals',
            title: "AI Ethics & Responsible AI",
            description: "AI 윤리 및 책임감 있는 AI 개발",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["AI Ethics", "Fairness", "Bias Detection", "Explainable AI"],
            detailItems: [
                "AI 편향성 (Bias) 이해 및 감지",
                "공정성 (Fairness) 지표 및 측정",
                "설명 가능한 AI (XAI) 기법",
                "개인정보 보호 및 데이터 프라이버시",
                "AI 거버넌스 및 규제",
                "인간-AI 상호작용 설계",
                "AI 투명성 및 해석가능성",
                "사회적 영향 평가",
                "AI 안전성 및 견고성",
                "윤리적 AI 개발 프레임워크"
            ]
        },
        // Machine Learning (5종)
        {
            id: 5,
            category: 'ml',
            title: "Supervised Learning",
            description: "지도학습 알고리즘 및 구현",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "15-20일",
            techStack: ["Scikit-learn", "Linear Regression", "SVM", "Random Forest", "XGBoost"],
            detailItems: [
                "선형/로지스틱 회귀 분석",
                "의사결정 트리 및 랜덤 포레스트",
                "Support Vector Machine (SVM)",
                "k-최근접 이웃 (k-NN)",
                "나이브 베이즈 분류기",
                "앙상블 방법 (Bagging, Boosting)",
                "XGBoost, LightGBM 활용",
                "하이퍼파라미터 튜닝",
                "교차 검증 (Cross Validation)",
                "모델 평가 지표 (정확도, F1, AUC)"
            ]
        },
        {
            id: 6,
            category: 'ml',
            title: "Unsupervised Learning",
            description: "비지도학습 알고리즘 및 클러스터링",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["K-means", "Hierarchical Clustering", "DBSCAN", "PCA", "t-SNE"],
            detailItems: [
                "K-means 클러스터링",
                "계층적 클러스터링",
                "DBSCAN 밀도 기반 클러스터링",
                "Gaussian Mixture Models",
                "주성분 분석 (PCA)",
                "독립 성분 분석 (ICA)",
                "t-SNE 및 UMAP 시각화",
                "이상 탐지 (Anomaly Detection)",
                "연관 규칙 학습",
                "클러스터 평가 지표"
            ]
        },
        {
            id: 7,
            category: 'ml',
            title: "Time Series Analysis",
            description: "시계열 분석 및 예측",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["ARIMA", "Prophet", "LSTM", "statsmodels", "Time Series"],
            detailItems: [
                "시계열 데이터 전처리",
                "정상성 (Stationarity) 검정",
                "ARIMA 모델링",
                "계절성 분해 및 트렌드 분석",
                "Prophet 예측 모델",
                "지수 평활법 (Exponential Smoothing)",
                "Vector Autoregression (VAR)",
                "LSTM/GRU 시계열 예측",
                "시계열 교차 검증",
                "예측 성능 평가"
            ]
        },
        {
            id: 8,
            category: 'ml',
            title: "Reinforcement Learning",
            description: "강화학습 기초 및 구현",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["Q-Learning", "Policy Gradient", "OpenAI Gym", "Stable Baselines3"],
            detailItems: [
                "MDP (Markov Decision Process) 이해",
                "Q-Learning 알고리즘",
                "SARSA 및 TD Learning",
                "Policy Gradient 방법",
                "Actor-Critic 알고리즘",
                "Deep Q-Network (DQN)",
                "OpenAI Gym 환경 활용",
                "Stable Baselines3 라이브러리",
                "멀티 에이전트 강화학습",
                "강화학습 게임 AI 구현"
            ]
        },
        {
            id: 9,
            category: 'ml',
            title: "Feature Engineering & Selection",
            description: "특성 공학 및 선택 기법",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Feature Selection", "Feature Scaling", "Encoding", "Scikit-learn"],
            detailItems: [
                "수치형 특성 스케일링 (정규화, 표준화)",
                "범주형 특성 인코딩 (One-hot, Label)",
                "특성 선택 기법 (Filter, Wrapper, Embedded)",
                "다항식 특성 생성",
                "상호작용 특성 생성",
                "타겟 인코딩",
                "특성 중요도 분석",
                "차원 축소를 통한 특성 추출",
                "특성 변환 파이프라인",
                "특성 엔지니어링 자동화"
            ]
        },
        // Deep Learning (4종)
        {
            id: 10,
            category: 'dl',
            title: "Neural Networks Fundamentals",
            description: "신경망 기초 및 역전파",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["TensorFlow", "PyTorch", "Keras", "Neural Networks", "Backpropagation"],
            detailItems: [
                "퍼셉트론 및 다층 퍼셉트론",
                "활성화 함수 (ReLU, Sigmoid, Tanh)",
                "역전파 알고리즘 구현",
                "손실 함수 및 최적화 알고리즘",
                "배치 정규화 (Batch Normalization)",
                "드롭아웃 및 정규화 기법",
                "TensorFlow/Keras 기초",
                "PyTorch 텐서 조작",
                "GPU 가속 학습",
                "모델 저장 및 로딩"
            ]
        },
        {
            id: 11,
            category: 'dl',
            title: "Convolutional Neural Networks",
            description: "합성곱 신경망 및 컴퓨터 비전",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["CNN", "ResNet", "Transfer Learning", "Image Processing", "OpenCV"],
            detailItems: [
                "합성곱 연산 및 필터 이해",
                "풀링 계층 및 특성 맵",
                "CNN 아키텍처 설계",
                "LeNet, AlexNet, VGG 구현",
                "ResNet 및 Skip Connection",
                "Transfer Learning 활용",
                "이미지 전처리 및 augmentation",
                "Object Detection (YOLO, R-CNN)",
                "Semantic Segmentation",
                "OpenCV를 통한 이미지 처리"
            ]
        },
        {
            id: 12,
            category: 'dl',
            title: "Recurrent Neural Networks",
            description: "순환 신경망 및 시퀀스 모델링",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["RNN", "LSTM", "GRU", "Attention", "Sequence Modeling"],
            detailItems: [
                "RNN 기본 구조 및 한계",
                "LSTM (Long Short-Term Memory)",
                "GRU (Gated Recurrent Unit)",
                "Bidirectional RNN",
                "Sequence-to-Sequence 모델",
                "Attention Mechanism",
                "텍스트 분류 및 감정 분석",
                "언어 모델링",
                "시계열 예측 (RNN vs LSTM)",
                "Encoder-Decoder 아키텍처"
            ]
        },
        {
            id: 13,
            category: 'dl',
            title: "Advanced Deep Learning",
            description: "고급 딥러닝 아키텍처",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Transformer", "GAN", "VAE", "Self-Attention", "BERT"],
            detailItems: [
                "Transformer 아키텍처",
                "Self-Attention Mechanism",
                "Multi-Head Attention",
                "Generative Adversarial Networks (GAN)",
                "Variational Autoencoders (VAE)",
                "BERT 및 GPT 이해",
                "Vision Transformer (ViT)",
                "Diffusion Models 기초",
                "Meta Learning",
                "Neural Architecture Search"
            ]
        },
        // NLP (4종)
        {
            id: 14,
            category: 'nlp',
            title: "Text Processing & Traditional NLP",
            description: "텍스트 처리 및 전통적 NLP",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["NLTK", "spaCy", "Regular Expressions", "Tokenization", "POS Tagging"],
            detailItems: [
                "텍스트 전처리 (정제, 정규화)",
                "토큰화 (Tokenization)",
                "형태소 분석 및 어간 추출",
                "품사 태깅 (POS Tagging)",
                "개체명 인식 (NER)",
                "정규 표현식 활용",
                "NLTK 및 spaCy 라이브러리",
                "TF-IDF 벡터화",
                "N-gram 모델링",
                "언어별 특성 처리 (한국어 NLP)"
            ]
        },
        {
            id: 15,
            category: 'nlp',
            title: "Word Embeddings & Language Models",
            description: "단어 임베딩 및 언어 모델",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Word2Vec", "GloVe", "FastText", "BERT", "Word Embeddings"],
            detailItems: [
                "Word2Vec (Skip-gram, CBOW)",
                "GloVe 글로벌 벡터",
                "FastText 하위 단어 정보",
                "문맥적 임베딩 (ELMo, BERT)",
                "Sentence Embeddings",
                "언어 모델 평가 지표",
                "임베딩 시각화 및 분석",
                "다국어 임베딩",
                "도메인 특화 임베딩",
                "임베딩 파인튜닝"
            ]
        },
        {
            id: 16,
            category: 'nlp',
            title: "Modern NLP with Transformers",
            description: "Transformer 기반 현대 NLP",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Hugging Face", "BERT", "GPT", "T5", "Fine-tuning"],
            detailItems: [
                "Hugging Face Transformers 라이브러리",
                "BERT 파인튜닝 (분류, QA)",
                "GPT 시리즈 이해 및 활용",
                "T5 Text-to-Text 모델",
                "RoBERTa, ELECTRA 고급 모델",
                "Few-shot Learning 기법",
                "Prompt Engineering",
                "모델 압축 및 증류",
                "다국어 Transformer 모델",
                "Custom Tokenizer 구축"
            ]
        },
        {
            id: 17,
            category: 'nlp',
            title: "Advanced NLP Applications",
            description: "고급 NLP 응용 분야",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Question Answering", "Summarization", "Translation", "Chatbot"],
            detailItems: [
                "질의응답 시스템 (QA) 구축",
                "텍스트 요약 (추출적/생성적)",
                "기계 번역 시스템",
                "대화형 AI 및 챗봇",
                "감정 분석 고급 기법",
                "텍스트 생성 및 창작",
                "정보 추출 (Relation Extraction)",
                "텍스트 분류 고도화",
                "멀티모달 NLP",
                "도메인 적응 기법"
            ]
        },
        // Computer Vision (3종)
        {
            id: 18,
            category: 'cv',
            title: "Image Classification & Recognition",
            description: "이미지 분류 및 인식",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["CNN", "Transfer Learning", "Image Augmentation", "OpenCV"],
            detailItems: [
                "이미지 전처리 및 augmentation",
                "CNN 기반 분류 모델",
                "Transfer Learning 활용",
                "Fine-tuning 전략",
                "Multi-class vs Multi-label 분류",
                "이미지 데이터셋 구축",
                "모델 해석 (Grad-CAM, LIME)",
                "실시간 이미지 분류",
                "모바일 최적화 (MobileNet)",
                "성능 평가 및 벤치마킹"
            ]
        },
        {
            id: 19,
            category: 'cv',
            title: "Object Detection & Segmentation",
            description: "객체 탐지 및 분할",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["YOLO", "R-CNN", "Mask R-CNN", "Semantic Segmentation"],
            detailItems: [
                "Object Detection 개념 및 평가",
                "YOLO 계열 모델 (v3, v4, v5, v8)",
                "R-CNN, Fast R-CNN, Faster R-CNN",
                "SSD (Single Shot Detector)",
                "Semantic Segmentation",
                "Instance Segmentation",
                "Mask R-CNN 구현",
                "Panoptic Segmentation",
                "3D Object Detection",
                "실시간 객체 탐지 최적화"
            ]
        },
        {
            id: 20,
            category: 'cv',
            title: "Advanced Computer Vision",
            description: "고급 컴퓨터 비전 기법",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Face Recognition", "Style Transfer", "GAN", "3D Vision"],
            detailItems: [
                "얼굴 인식 및 검증",
                "얼굴 감정 인식",
                "Style Transfer (Neural Style)",
                "GAN을 활용한 이미지 생성",
                "Super Resolution",
                "이미지 복원 및 노이즈 제거",
                "3D 컴퓨터 비전",
                "Depth Estimation",
                "Pose Estimation",
                "Video Analysis 및 Tracking"
            ]
        },
        // Generative AI (3종)
        {
            id: 21,
            category: 'genai',
            title: "Large Language Models",
            description: "대규모 언어 모델 활용",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["OpenAI API", "GPT", "Claude", "LangChain", "Vector Database"],
            detailItems: [
                "OpenAI API 활용 (GPT-3.5, GPT-4)",
                "Prompt Engineering 고급 기법",
                "Few-shot 및 Chain-of-Thought",
                "LangChain 프레임워크",
                "Vector Database (Pinecone, Weaviate)",
                "RAG (Retrieval Augmented Generation)",
                "Function Calling 구현",
                "Custom Fine-tuning",
                "LLM 평가 및 벤치마킹",
                "비용 최적화 전략"
            ]
        },
        {
            id: 22,
            category: 'genai',
            title: "Generative Models",
            description: "생성 모델 및 창작 AI",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Diffusion Models", "GAN", "VAE", "Stable Diffusion", "DALL-E"],
            detailItems: [
                "Diffusion Models 이론 및 구현",
                "Stable Diffusion 활용",
                "GAN 변형 모델들 (StyleGAN, CycleGAN)",
                "Variational Autoencoders (VAE)",
                "Text-to-Image 생성",
                "Image-to-Image 변환",
                "ControlNet 및 조건부 생성",
                "음성 합성 (TTS) 모델",
                "음악 생성 AI",
                "멀티모달 생성 모델"
            ]
        },
        {
            id: 23,
            category: 'genai',
            title: "AI Agents & Automation",
            description: "AI 에이전트 및 자동화",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["LangChain", "AutoGPT", "LangGraph", "Tool Calling", "Agent Framework"],
            detailItems: [
                "AI Agent 아키텍처 설계",
                "Tool Calling 및 Function Execution",
                "ReAct (Reasoning + Acting) 패턴",
                "Multi-Agent 시스템",
                "Memory 관리 전략",
                "Planning 및 Task Decomposition",
                "LangGraph를 통한 워크플로우",
                "Human-in-the-loop 시스템",
                "Agent 평가 및 모니터링",
                "Production Agent 배포"
            ]
        },
        // MLOps & Deployment (4종)
        {
            id: 24,
            category: 'mlops',
            title: "ML Pipeline & Workflow",
            description: "ML 파이프라인 및 워크플로우",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["MLflow", "Kubeflow", "Apache Airflow", "DVC", "Git"],
            detailItems: [
                "데이터 버전 관리 (DVC)",
                "실험 추적 (MLflow, Weights & Biases)",
                "ML Pipeline 설계",
                "Apache Airflow 워크플로우",
                "Kubeflow Pipelines",
                "모델 버전 관리",
                "Feature Store 구축",
                "CI/CD for ML",
                "데이터 검증 및 품질 관리",
                "재현 가능한 실험 환경"
            ]
        },
        {
            id: 25,
            category: 'mlops',
            title: "Model Deployment & Serving",
            description: "모델 배포 및 서빙",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["FastAPI", "Flask", "Docker", "Kubernetes", "TensorFlow Serving"],
            detailItems: [
                "REST API 개발 (FastAPI, Flask)",
                "모델 직렬화 및 로딩",
                "Docker 컨테이너화",
                "Kubernetes 배포",
                "TensorFlow Serving",
                "TorchServe 활용",
                "Batch vs Real-time Inference",
                "모델 성능 최적화",
                "A/B Testing for Models",
                "Blue-Green 배포 전략"
            ]
        },
        {
            id: 26,
            category: 'mlops',
            title: "Model Monitoring & Maintenance",
            description: "모델 모니터링 및 유지보수",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Model Monitoring", "Data Drift", "Prometheus", "Grafana"],
            detailItems: [
                "Model Drift 감지",
                "Data Drift 모니터링",
                "성능 지표 추적",
                "Prediction 로깅 및 분석",
                "알림 시스템 구축",
                "모델 재학습 자동화",
                "피드백 루프 구성",
                "장애 대응 전략",
                "비즈니스 메트릭 연동",
                "모델 거버넌스"
            ]
        },
        {
            id: 27,
            category: 'mlops',
            title: "Cloud ML Platforms",
            description: "클라우드 ML 플랫폼 활용",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["AWS SageMaker", "Google Cloud AI", "Azure ML", "Vertex AI"],
            detailItems: [
                "AWS SageMaker 활용",
                "Google Cloud Vertex AI",
                "Azure Machine Learning",
                "클라우드 AutoML 서비스",
                "Managed Jupyter Notebooks",
                "Serverless ML Inference",
                "클라우드 GPU/TPU 활용",
                "비용 최적화 전략",
                "Multi-cloud 전략",
                "클라우드 보안 설정"
            ]
        },
        // Real-world Projects (5종)
        {
            id: 28,
            category: 'projects',
            title: "AI Chatbot with RAG",
            description: "RAG 기반 AI 챗봇 개발",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["LangChain", "Vector DB", "FastAPI", "Streamlit", "OpenAI"],
            detailItems: [
                "Document 로딩 및 청킹",
                "Vector Database 구축",
                "Embedding 및 Similarity Search",
                "RAG Pipeline 구현",
                "Context-aware 응답 생성",
                "Chat History 관리",
                "Streamlit 웹 인터페이스",
                "FastAPI 백엔드 개발",
                "성능 최적화",
                "사용자 피드백 시스템"
            ]
        },
        {
            id: 29,
            category: 'projects',
            title: "Computer Vision App",
            description: "실시간 컴퓨터 비전 애플리케이션",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["OpenCV", "YOLO", "Streamlit", "TensorFlow", "WebRTC"],
            detailItems: [
                "실시간 객체 탐지",
                "웹캠 스트림 처리",
                "YOLO 모델 통합",
                "바운딩 박스 시각화",
                "다중 클래스 분류",
                "성능 최적화",
                "모바일 웹 지원",
                "배치 이미지 처리",
                "결과 저장 및 분석",
                "사용자 설정 인터페이스"
            ]
        },
        {
            id: 30,
            category: 'projects',
            title: "Recommendation System",
            description: "개인화 추천 시스템",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Collaborative Filtering", "Matrix Factorization", "Deep Learning", "Surprise"],
            detailItems: [
                "협업 필터링 구현",
                "Matrix Factorization (SVD)",
                "Content-based Filtering",
                "Deep Learning 추천 모델",
                "하이브리드 추천 시스템",
                "A/B Testing 프레임워크",
                "실시간 추천 API",
                "추천 성능 평가",
                "Cold Start 문제 해결",
                "추천 다양성 및 공정성"
            ]
        },
        {
            id: 31,
            category: 'projects',
            title: "Time Series Forecasting Platform",
            description: "시계열 예측 플랫폼",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Prophet", "LSTM", "Dashboard", "Plotly", "FastAPI"],
            detailItems: [
                "다중 시계열 데이터 처리",
                "Prophet 자동 예측",
                "LSTM 딥러닝 모델",
                "앙상블 예측 기법",
                "Interactive Dashboard",
                "예측 신뢰구간",
                "이상치 탐지",
                "실시간 예측 업데이트",
                "비즈니스 메트릭 연동",
                "예측 성능 모니터링"
            ]
        },
        {
            id: 32,
            category: 'projects',
            title: "MLOps Production Pipeline",
            description: "프로덕션 MLOps 파이프라인",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["MLflow", "Kubeflow", "Docker", "Kubernetes", "CI/CD"],
            detailItems: [
                "End-to-End ML Pipeline",
                "자동화된 모델 학습",
                "모델 검증 및 테스팅",
                "Continuous Deployment",
                "A/B Testing 인프라",
                "모델 모니터링 시스템",
                "Feature Store 구축",
                "데이터 품질 검증",
                "모델 재학습 트리거",
                "Production 로깅 시스템"
            ]
        }
    ]

    const categories = [
        { id: 'all', label: '전체', icon: <Brain className="h-4 w-4" /> },
        { id: 'fundamentals', label: 'AI 기초', icon: <Database className="h-4 w-4" /> },
        { id: 'ml', label: '머신러닝', icon: <BarChart3 className="h-4 w-4" /> },
        { id: 'dl', label: '딥러닝', icon: <Cpu className="h-4 w-4" /> },
        { id: 'nlp', label: '자연어처리', icon: <MessageSquare className="h-4 w-4" /> },
        { id: 'cv', label: '컴퓨터 비전', icon: <Eye className="h-4 w-4" /> },
        { id: 'genai', label: '생성형 AI', icon: <Bot className="h-4 w-4" /> },
        { id: 'mlops', label: 'MLOps', icon: <Settings className="h-4 w-4" /> },
        { id: 'projects', label: '실습 프로젝트', icon: <Target className="h-4 w-4" /> }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredItems = selectedCategory === 'all'
        ? aiStudyItems
        : aiStudyItems.filter(item => item.category === selectedCategory)

    const highPriority = filteredItems.filter(item => item.priority === 'High')
    const mediumPriority = filteredItems.filter(item => item.priority === 'Medium')
    const lowPriority = filteredItems.filter(item => item.priority === 'Low')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">🧠 AI/ML 마스터 종합 스터디</h1>
                <p className="text-xl text-gray-600">기초 수학부터 최신 LLM까지, AI 전문가 완성 로드맵</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 32개 학습 영역
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 12-18개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        320+ 핵심 기술
                    </span>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors ${selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category.icon}
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
                    <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
                    <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{lowPriority.length}</div>
                    <div className="text-sm text-gray-600">Low Priority</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">완료</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">400-600</div>
                    <div className="text-sm text-gray-600">총 학습일</div>
                </div>
            </div>

            {/* High Priority Section */}
            {highPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                        <Star className="h-6 w-6" />
                        <span>High Priority (필수 핵심) - {highPriority.length}개</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {highPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🎯 핵심 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Medium Priority Section */}
            {mediumPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-yellow-600">Medium Priority (심화 학습) - {mediumPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mediumPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🎯 핵심 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Low Priority Section */}
            {lowPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-green-600">Low Priority (전문 심화) - {lowPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {lowPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🎯 핵심 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Learning Path */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🗺️ AI 학습 로드맵 (2025)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">기초 수학 & Python 마스터</span>
                            <span className="text-sm text-gray-500">(1-2개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">머신러닝 핵심 알고리즘</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">딥러닝 & 신경망</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">NLP & 컴퓨터 비전 특화</span>
                            <span className="text-sm text-gray-500">(3-4개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">생성형 AI & LLM</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">MLOps & 프로덕션 배포</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2025 AI Trends */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">🚀 2025 AI 트렌드 & 필수 기술</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-800">Generative AI</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Multi-modal LLM (GPT-4V, Gemini)</li>
                                <li>• RAG 고도화 및 Agent</li>
                                <li>• Diffusion Models 실무 활용</li>
                                <li>• AI Code Generation</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-800">MLOps & Engineering</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• LLMOps 파이프라인</li>
                                <li>• Model Compression & Quantization</li>
                                <li>• Edge AI & Mobile Deployment</li>
                                <li>• Federated Learning</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-800">Specialized AI</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• AI for Science (Biology, Chemistry)</li>
                                <li>• Robotics & Embodied AI</li>
                                <li>• Autonomous Systems</li>
                                <li>• Quantum Machine Learning</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Project Portfolio */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-xl text-green-900">🛠️ AI 포트폴리오 프로젝트</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">기초 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• 영화 추천 시스템</li>
                                <li>• 이미지 분류기 (CNN)</li>
                                <li>• 감정 분석 챗봇</li>
                                <li>• 주식 가격 예측</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">고급 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• RAG 기반 AI 어시스턴트</li>
                                <li>• 실시간 객체 탐지 시스템</li>
                                <li>• End-to-End MLOps 파이프라인</li>
                                <li>• Multi-modal AI 애플리케이션</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 학습 진행 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>전체 진행률</span>
                            <span className="text-sm text-gray-500">0/32 완료 (총 320+ 핵심 기술)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            AI 전문가 여정을 시작하여 차세대 기술의 선두주자가 되어보세요! 🧠
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForAI