export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700">❌ Payment Cancelled</h1>
      <p className="mt-4 text-gray-700">Your payment was not completed. Please try again.</p>
    </div>
  );
}
