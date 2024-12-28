import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, LayoutDashboard, ShoppingCart, Users, Layout } from "lucide-react";

interface ServiceData {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface IServiceCardsForFilteringMultiApiTestListProps {
  selectedService: string;
  onServiceChange: (serviceId: string) => void;
  specs?: any[];
}

export const services: ServiceData[] = [
  { id: "ALL", name: "All Services", icon: Layout, color: "bg-gray-500" },
  { id: "LMS", name: "LMS", icon: BookOpen, color: "bg-blue-500" },
  { id: "CMS", name: "CMS", icon: LayoutDashboard, color: "bg-purple-500" },
  { id: "SHOPPING_MALL", name: "Shopping Mall", icon: ShoppingCart, color: "bg-green-500" },
  { id: "USER", name: "User", icon: Users, color: "bg-yellow-500" },
  { id: "BOARD", name: "Board", icon: Layout, color: "bg-indigo-500" },
];

const IServiceCardsForFilteringMultiApiTestList: React.FC<IServiceCardsForFilteringMultiApiTestListProps> = ({ 
  selectedService, 
  onServiceChange,
  specs 
}) => {
  return (
    <div className="grid grid-cols-7 gap-4 mb-6 p-3">
      {services.map((service) => (
        <Card
          key={service.id}
          className={`cursor-pointer hover:shadow-md transition-shadow ${
            selectedService === service.id ? "ring-1 ring-primary shadow-md" : ""
          }`}
          onClick={() => onServiceChange(service.id)}
        >
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center text-center">
              <div className={`${service.color} p-2 rounded-full mb-2`}>
                <service.icon className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold">{service.name}</h3>
              <p className="text-xs text-gray-500">
                {service.id === 'ALL' 
                  ? specs?.length || 0 
                  : specs?.filter(spec => spec.service_name === service.id).length || 0} APIs
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IServiceCardsForFilteringMultiApiTestList;