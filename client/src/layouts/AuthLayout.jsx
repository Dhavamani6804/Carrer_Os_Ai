function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Logo & Branding */}

                <div className="text-center mb-10">

                    <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                        CareerOS
                    </h1>

                    <p className="mt-3 text-slate-600 text-lg">
                        AI Career Operating System
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Build • Learn • Get Hired
                    </p>

                </div>

                {children}

            </div>

        </div>
    );
}

export default AuthLayout;