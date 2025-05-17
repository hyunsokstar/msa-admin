// src/components/AttitudeItem.tsx
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AttitudeItemProps {
    title: string;
    description: React.ReactNode;
}

const AttitudeItem: React.FC<AttitudeItemProps> = ({ title, description }) => (
    <Card className="mb-4">
        <div className="bg-blue-600 px-4 py-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <CardContent className="p-4 text-gray-700">{description}</CardContent>
    </Card>
);

export default AttitudeItem;