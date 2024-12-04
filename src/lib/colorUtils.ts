// src/utils/colorUtils.ts

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Open":
            return "bg-green-100 text-green-800";
        case "In Progress":
            return "bg-blue-100 text-blue-800";
        case "Closed":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-800";
        case "Medium":
            return "bg-yellow-100 text-yellow-800";
        case "Low":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getCategoryColor = (category: string) => {
    switch (category) {
        case "shop":
            return "bg-purple-100 text-purple-800";
        case "cms":
            return "bg-emerald-100 text-emerald-800";
        case "lms":
            return "bg-indigo-100 text-indigo-800";
        case "user":
            return "bg-orange-100 text-orange-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};
