"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, BookOpen, LayoutDashboard, Shield, ShoppingCart, Users, PlayCircle, Layout } from 'lucide-react';
import { useApiForDashboard } from '@/hook/useApiForDashboard';
import { useApiForSearch } from '@/hook/useApiForSearch';
import { DialogButtonForApiTest } from './DialogButtonForApiTest';
import { DialogButtonForGetApiTest } from './DialogButtonForGetApiTest';

interface ApiSpec {
 id: string;
 endpoint: string;
 method: string;
 service_name?: string;
 description?: string;
 request_body_schema?: any;
}

const getMethodColor = (method: string) => {
   switch (method) {
     case 'GET': return 'bg-blue-500';
     case 'POST': return 'bg-green-500';
     case 'PUT': return 'bg-yellow-500';
     case 'DELETE': return 'bg-red-500';
     case 'PATCH': return 'bg-purple-500';
     default: return 'bg-gray-500';
   }
};

const MSADashboard = () => {
const services = [
  { id: 'LMS', name: 'LMS', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'CMS', name: 'CMS', icon: LayoutDashboard, color: 'bg-purple-500' },
  { id: 'ADMIN', name: 'Admin', icon: Shield, color: 'bg-red-500' },
  { id: 'SHOPPING_MALL', name: 'Shopping Mall', icon: ShoppingCart, color: 'bg-green-500' },
  { id: 'USER', name: 'User', icon: Users, color: 'bg-yellow-500' },
  { id: 'BOARD', name: 'Board', icon: Layout, color: 'bg-indigo-500' }  // 추가된 부분
];

 const [selectedService, setSelectedService] = useState(services[0].id);
 const { data, isLoading, error } = useApiForDashboard();
 const { searchTerm, setSearchTerm, filteredSpecs } = useApiForSearch(data?.specs);

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;

 return (
   <div className="container mx-auto p-6 space-y-6">
     {/* 서비스 카드 */}
     <div className="grid grid-cols-5 gap-4">
       {services.map(service => (
         <Card 
           key={service.id}
           className={`cursor-pointer hover:shadow-md transition-shadow ${
             selectedService === service.id ? 'ring-1 ring-primary shadow-md' : ''
           }`}
           onClick={() => setSelectedService(service.id)}
         >
           <CardContent className="pt-6">
             <div className="flex flex-col items-center text-center">
               <div className={`${service.color} p-3 rounded-full mb-3`}>
                 <service.icon className="h-6 w-6 text-white" />
               </div>
               <h3 className="font-semibold">{service.name}</h3>
               <p className="text-sm text-gray-500">
                 {data?.stats[service.id] || 0} APIs
               </p>
             </div>
           </CardContent>
         </Card>
       ))}
     </div>

     {/* 검색 */}
     <div className="flex gap-4">
       <div className="relative flex-1">
         <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
         <Input 
           placeholder="Search APIs across all services..." 
           className="pl-8"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
     </div>

     {/* API 목록 */}
     <Card>
       <CardContent className="pt-6 space-y-4">
         {filteredSpecs
           ?.filter(spec => spec.service_name === selectedService)
           .map(spec => (
             <div key={spec.id} className="border rounded-lg p-4 hover:bg-gray-50">
               <Dialog>
                 <DialogTrigger asChild>
                   <div className="flex items-center justify-between cursor-pointer">
                     <div className="flex items-center gap-2">
                       <Badge className={getMethodColor(spec.method)}>
                         {spec.method}
                       </Badge>
                       <span className="font-mono font-medium">{spec.endpoint}</span>
                       <Badge variant="outline">
                         {services.find(s => s.id === spec.service_name)?.name}
                       </Badge>
                     </div>
                     <DialogButtonForApiTest spec = {spec} />
                     <DialogButtonForGetApiTest spec = {spec} />
                   </div>
                 </DialogTrigger>
               </Dialog>
               <p className="text-gray-600 mt-2">{spec.description}</p>
             </div>
           ))}
         {filteredSpecs?.filter(spec => spec.service_name === selectedService).length === 0 && (
           <div className="text-center text-gray-500 py-4">
             No APIs found for this service
           </div>
         )}
       </CardContent>
     </Card>
   </div>
 );
};

export default MSADashboard;