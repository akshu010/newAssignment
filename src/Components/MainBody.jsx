/* eslint-disable no-unused-vars */
import { useState } from "react";
import ChatApp from "./ChatApp";
import EmailApp from "./EmailApp";
import MainPage from "./MainPage";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";


const MainBody = () => {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const tabs = [
    { name: "Chat", component: ChatApp },
    { name: "Email", component: EmailApp },
  ];

  const ActiveComponent = activeTab !== null ? tabs[activeTab].component : null;
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleSignOut}
        className="absolute right-32 top-10 rounded-2xl bg-green-600  text-white border border-black cursor-pointer p-2"
      >
        Sign Out
      </button>
      <div className="flex flex-col h-[calc(100vh-100px)]">
        <div className="flex space-x-4 border-b border-gray-200 pb-2">
          {tabs.map((t, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === index
                  ? "bg-white text-blue-600 border border-b-0 border-gray-200 cursor-pointer shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 cursor-pointer hover:text-gray-700"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-b-lg shadow-sm overflow-hidden">
          <div className="h-full p-6">
            {activeTab === null ? <MainPage /> : <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;


