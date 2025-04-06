import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import { lookInSession } from "./common/session";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import UserAuthForm from "./pages/UserAuthForm";

export const UserContext = createContext({});

function App() {

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <div className="flex flex-col min-h-screen bg-[#FFFFFF06]">

        <div className="navbar bg-[#dfdfb0] z-50">
          <div className="w-full max-w-7xl mx-auto flex">
            <Navbar />
          </div>
        </div>

        <main className="flex-1 w-full max-w-7xl px-4 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserAuthForm type='login' />} />
            <Route path="/register" element={<UserAuthForm type='register' />} />
          </Routes>
        </main>

        <div className="footer bg-[#dfdfb0] mt-8">
          <div className="w-full max-w-7xl mx-auto">
            <Footer />
          </div>
        </div>

      </div>
    </UserContext.Provider>
  );
}

export default App;
