export default function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0F4C3A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#0F4C3A] font-medium">Loading...</p>
      </div>
    </div>
  );
}