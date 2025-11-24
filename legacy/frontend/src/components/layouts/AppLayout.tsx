import AppSideBar from "../navbar/AppSideBar";
import WebTopNavBar from "../navbar/WebTopNavBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <AppSideBar />
      <main className="flex-1 flex flex-col">
        <WebTopNavBar />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
