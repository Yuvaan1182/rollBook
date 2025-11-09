import { BottomNav } from "@/components/navbar/BottomNav";
import TopNav from "@/components/navbar/TopNav";
import Login from "@/features/auth/components/login/Login";
import { Route, Routes } from "react-router-dom";
// import Login from "@/features/auth/components/login/Login";

const App = () => {
  return (
    <div className="h-screen bg-accent flex items-center justify-center flex-col">
      {/* header  */}
      <TopNav />
      {/* main  */}
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/services" element={<services />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
      {/* @footer - Bottom Nav (shown only on mobile screens) */}
      <BottomNav />
    </div>
  );
};

export default App;
