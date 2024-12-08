"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle, CheckCircle2, Circle, Clock, AlertTriangle, Music, MessageSquare, Bookmark, Volume2 } from 'lucide-react';

type Priority = 'high' | 'medium' | 'low';
type Status = 'todo' | 'in-progress' | 'completed' | 'blocked';
type Category = 'frontend' | 'backend' | 'design' | 'testing';

interface Todo {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  dueDate: string;
}

const DevTodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "API 엔드포인트 구현",
      description: "사용자 인증 관련 REST API 개발",
      priority: "high",
      status: "in-progress",
      category: "backend",
      dueDate: "2024-12-15"
    },
    {
      id: 2,
      title: "로그인 페이지 UI 개선",
      description: "반응형 디자인 적용 및 유효성 검사 추가",
      priority: "medium",
      status: "todo",
      category: "frontend",
      dueDate: "2024-12-20"
    }
  ]);

  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id' | 'status'>>({
    title: "",
    description: "",
    priority: "medium",
    category: "frontend",
    dueDate: ""
  });

  const getPriorityColor = (priority: Priority) => {
    const colors = {
      high: 'text-red-500',
      medium: 'text-yellow-500',
      low: 'text-green-500'
    };
    return colors[priority] || 'text-gray-500';
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-green-500" />;
      case 'in-progress': return <Clock className="text-blue-500" />;
      case 'blocked': return <AlertTriangle className="text-red-500" />;
      default: return <Circle className="text-gray-500" />;
    }
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos([...todos, {
      id: todos.length + 1,
      ...newTodo,
      status: 'todo'
    }]);
    setNewTodo({
      title: "",
      description: "",
      priority: "medium",
      category: "frontend",
      dueDate: ""
    });
  };

  const handleStatusChange = (id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const statusMap: Record<Status, Status> = {
          'todo': 'in-progress',
          'in-progress': 'completed',
          'completed': 'todo',
          'blocked': 'todo'
        };
        return { ...todo, status: statusMap[todo.status] };
      }
      return todo;
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 p-6">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleAddTodo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Task 제목"
                  className="w-full p-2 border rounded"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="설명"
                  className="w-full p-2 border rounded"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
                />
                <select
                  className="w-full p-2 border rounded"
                  value={newTodo.priority}
                  onChange={(e) => setNewTodo({...newTodo, priority: e.target.value as Priority})}
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <select
                  className="w-full p-2 border rounded"
                  value={newTodo.category}
                  onChange={(e) => setNewTodo({...newTodo, category: e.target.value as Category})}
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="design">Design</option>
                  <option value="testing">Testing</option>
                </select>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({...newTodo, dueDate: e.target.value})}
                  required
                />
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  <PlusCircle size={20} />
                  새 Task 추가
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {todos.map(todo => (
            <Card key={todo.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button onClick={() => handleStatusChange(todo.id)}>
                        {getStatusIcon(todo.status)}
                      </button>
                      <h3 className="text-xl font-semibold">{todo.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{todo.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className={`px-3 py-1 rounded-full ${getPriorityColor(todo.priority)} bg-opacity-10`}>
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {todo.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        Due: {todo.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 오른쪽 사이드바 */}
      <div className="w-80 border-l p-4 space-y-4">
        {/* 프로필 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/api/placeholder/40/40"
                alt="Profile" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">terecal@daum.net</h3>
                <p className="text-sm text-gray-500">Developer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 즐겨찾기 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Bookmark size={16} />
              즐겨찾기
            </h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm hover:text-blue-500">Jenkins Dashboard</a>
              <a href="#" className="block text-sm hover:text-blue-500">Figma 디자인</a>
              <a href="#" className="block text-sm hover:text-blue-500">Jira 보드</a>
            </div>
          </CardContent>
        </Card>

        {/* 음악 플레이어 */}
        <Card>
          {/* <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music size={16} />
                  <span className="text-sm font-medium">현재 재생중</span>
                </div>
                <Volume2 size={16} className="text-gray-500" />
              </div>
              <div className="text-sm">
                <p className="font-medium">lofi coding beats</p>
                <p className="text-gray-500 text-xs">Ambient Music</p>
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full w-1/3"></div>
              </div>
            </div>
          </CardContent> */}
        </Card>

        {/* 접속자 정보 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">접속자 (3)</h3>
            <div className="space-y-2">
              {[
                { name: "terecal", status: "online" },
                { name: "Jane Cooper", status: "online" },
                { name: "Robert Fox", status: "away" }
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative">
                    <img 
                      src="/api/placeholder/32/32"
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></span>
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 챗봇 링크 */}
        <Card className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          <CardContent className="p-4">
            <a href="#" className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span>ChatBot 문의하기</span>
            </a>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DevTodoApp;