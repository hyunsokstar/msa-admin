// /app/login/LoginFormFallback.tsx
export default function LoginFormFallback() {
  return (
    <div className="w-full max-w-[400px] space-y-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="space-y-4 mt-8">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex justify-between mt-4">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl mt-4"></div>
        </div>
      </div>
    </div>
  );
}