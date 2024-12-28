  "use client";

  import React, { useState } from "react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Search, BookOpen, LayoutDashboard, ShoppingCart, Users, Layout } from "lucide-react";
  import { useApiForDashboard } from "@/hook/useApiForDashboard";
  import { useApiForSearch } from "@/hook/useApiForSearch";
  import IDialogButtonForCreateApiSpec from "@/components/dialog/IDialogButtonForCreateApiSpec";
  import ICardForApiSpecList from "./ICardForApiSpecList";
  import MethodFilterToggle from "./MethodFilterToggle";
  import IFilterFormForCategorysForApiSpec from "./IFilterFormForCategorysForApiSpec";

  const MSADashboard = () => {
    const services = [
      { id: "LMS", name: "LMS", icon: BookOpen, color: "bg-blue-500" },
      { id: "CMS", name: "CMS", icon: LayoutDashboard, color: "bg-purple-500" },
      { id: "SHOPPING_MALL", name: "Shopping Mall", icon: ShoppingCart, color: "bg-green-500" },
      { id: "USER", name: "User", icon: Users, color: "bg-yellow-500" },
      { id: "BOARD", name: "Board", icon: Layout, color: "bg-indigo-500" },
    ];

    const [selectedService, setSelectedService] = useState(services[0].id);
    const [selectedMethods, setSelectedMethods] = useState<Set<string>>(new Set(["GET", "POST", "PUT", "DELETE", "PATCH"]));
    const [category1, setCategory1] = useState("");
    const [category2, setCategory2] = useState("");
    
    const { data, isLoading, error } = useApiForDashboard();
    const { searchTerm, setSearchTerm, filteredSpecs } = useApiForSearch(data?.specs);

    const handleMethodToggle = (method: string) => {
      setSelectedMethods(prev => {
        const newSet = new Set(prev);
        if (newSet.has(method)) {
          newSet.delete(method);
        } else {
          newSet.add(method);
        }
        return newSet;
      });
    };

    const getMethodColor = (method: string) => {
      switch (method) {
        case "GET":
          return "bg-blue-500";
        case "POST":
          return "bg-green-500";
        case "PUT":
          return "bg-yellow-500";
        case "DELETE":
          return "bg-red-500";
        case "PATCH":
          return "bg-purple-500";
        default:
          return "bg-gray-500";
      }
    };

    // Filter specs by selected methods and categories
    const methodFilteredSpecs = filteredSpecs?.filter(spec => 
      selectedMethods.has(spec.method)
    ) ?? [];

    // Apply category filters
    const categoryFilteredSpecs = methodFilteredSpecs.filter(spec => {
      const matchCategory1 = !category1 || spec.category1?.toLowerCase().includes(category1.toLowerCase());
      const matchCategory2 = !category2 || spec.category2?.toLowerCase().includes(category2.toLowerCase());
      return matchCategory1 && matchCategory2;
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;

    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-5 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                selectedService === service.id ? "ring-1 ring-primary shadow-md" : ""
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`${service.color} p-3 rounded-full mb-3`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-500">{data?.stats[service.id] || 0} APIs</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
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

        <div className="flex justify-between items-center mt-2">
          <MethodFilterToggle 
            selectedMethods={selectedMethods}
            onMethodToggle={handleMethodToggle}
          />
          <IFilterFormForCategorysForApiSpec
            category1={category1}
            category2={category2}
            onCategory1Change={setCategory1}
            onCategory2Change={setCategory2}
          />
          <IDialogButtonForCreateApiSpec />
        </div>

        <ICardForApiSpecList
          specs={categoryFilteredSpecs}
          services={services}
          selectedService={selectedService}
          getMethodColor={getMethodColor}
        />
      </div>
    );
  };

  export default MSADashboard;