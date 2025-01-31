const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="max-w-4xl space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Communication Hub
        </h1>

        <p className="text-xl text-gray-600">
          Connect with your team and manage conversations seamlessly through our
          integrated communication platform
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
             Gpt-Page
            </h3>
            <p className="text-gray-500">
            Discover and create custom versions of ChatGPT that combine instructions, extra knowledge, and any combination of skills.
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">
              Email Management
            </h3>
            <p className="text-gray-500">
             Send your message on this email form to me
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Secure & Reliable
            </h3>
            <p className="text-gray-500">
              Enterprise-grade security with end-to-end encryption and
              compliance features
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                1. Choose a tab above
              </span>
            </div>
            <div className="flex items-center">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
                2. Start communicating
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
