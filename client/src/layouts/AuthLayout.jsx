function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            CareerOS
          </h1>

          <p className="text-gray-500 mt-2">
            AI Career Assistant
          </p>
        </div>

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;