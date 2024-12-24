"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IDialogButtonForDeleteApiSpec } from "@/app/board/free-board/IDialogButtonForDeleteApiSpec";
import { DialogButtonForGetApiTest } from "./DialogButtonForGetApiTest";
import { DialogButtonForPostApiTest } from "./DialogButtonForPostApiTest";
import IDialogButtonForUpdateApiSpec from "@/app/board/free-board/IDialogButtonForUpdateApiSpec";

interface ApiSpec {
  id: string;
  endpoint: string;
  method: string;
  service_name?: string;
  description?: string;
  title: string;
}

interface Service {
  id: string;
  name: string;
  color: string;
}

interface ICardForApiSpecListProps {
  specs: ApiSpec[];
  services: Service[];
  selectedService: string;
  getMethodColor: (method: string) => string;
}

const ICardForApiSpecList: React.FC<ICardForApiSpecListProps> = ({
  specs,
  services,
  selectedService,
  getMethodColor,
}) => {
  const filteredSpecs = specs.filter(
    (spec) => spec.service_name === selectedService
  );

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {filteredSpecs.map((spec) => (
        <div key={spec.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
                <Badge
                className={cn("w-16 justify-center", getMethodColor(spec.method))}
                >
                {spec.method}
                </Badge>
                <span className="font-mono font-medium flex-1">{spec.endpoint}</span>
                <Badge variant="outline" className="w-24 justify-center">
                {services.find((s) => s.id === spec.service_name)?.name}
                </Badge>
            </div>
            <div className="flex items-center gap-3">
                <IDialogButtonForUpdateApiSpec spec={spec} />
                <IDialogButtonForDeleteApiSpec spec={spec} />
                {spec.method === "GET" ? (
                <DialogButtonForGetApiTest spec={spec} />
                ) : (
                <DialogButtonForPostApiTest spec={spec} />
                )}
            </div>
            </div>
            <h4 className="text-lg font-bold mt-3">{spec.title}</h4> {/* title 추가 */}
            <p className="text-gray-600 mt-3">{spec.description}</p>
        </div>
        ))}

        {filteredSpecs.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No APIs found for this service
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ICardForApiSpecList;
