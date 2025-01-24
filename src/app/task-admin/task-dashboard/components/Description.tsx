interface DescriptionProps {
  description: string | null;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="p-4 bg-gray-50 border-t">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
      <p className="text-sm text-gray-600">{description || "No description available."}</p>
    </div>
  );
};

export default Description;