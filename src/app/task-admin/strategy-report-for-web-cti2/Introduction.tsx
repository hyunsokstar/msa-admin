import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Server, Monitor, BarChart3, Database, Globe, Settings, Users, Zap, FileText, Code } from 'lucide-react';

const Introduction = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">CTI 고도화 현황</h1>
        <p className="text-xl text-gray-600">현재 프로젝트 구성 및 아키텍처 분석</p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3"></div>
      </div>

      {/* 현 프로젝트 구성 */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-3">
          현 프로젝트 구성
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 프로젝트 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Server className="h-6 w-6" />
                메인 프로젝트
              </CardTitle>
              <CardDescription>웹 애플리케이션 서버</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Code className="h-3 w-3 mr-1" />
                    Spring Framework
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Globe className="h-3 w-3 mr-1" />
                    JSP
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Database className="h-3 w-3 mr-1" />
                    MyBatis
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <Server className="h-3 w-3 mr-1" />
                    Tomcat
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Database className="h-3 w-3 mr-1" />
                    MariaDB
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Redis
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 퍼스널 실적 Tool */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Monitor className="h-6 w-6" />
                퍼스널 실적 Tool
              </CardTitle>
              <CardDescription>CTI Task Master 데스크탑 앱</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Settings className="h-3 w-3 mr-1" />
                    Tauri
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Vite
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Code className="h-3 w-3 mr-1" />
                    React
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
                    <FileText className="h-3 w-3 mr-1" />
                    Tailwind CSS
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    <Users className="h-3 w-3 mr-1" />
                    ShadCN UI
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Database className="h-3 w-3 mr-1" />
                    Zustand
                  </Badge>
                </div>
              </div>
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  상담사 개인 상태 표시 및 실시간 업무 추적
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 레포팅 Tool */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <BarChart3 className="h-6 w-6" />
                레포팅 Tool
              </CardTitle>
              <CardDescription>데이터 분석 및 리포트 생성</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  <Clock className="h-3 w-3 mr-1" />
                  개발 예정
                </Badge>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    실적 데이터 시각화 및 분석 도구
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Introduction;