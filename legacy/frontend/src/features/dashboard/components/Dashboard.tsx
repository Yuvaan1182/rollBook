const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 p-4">
      <div className="bg-primary-foreground p-4 rounded-md lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        Test Text
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">Test Text</div>
      <div className="bg-primary-foreground p-4 rounded-md">Test Text</div>
      <div className="bg-primary-foreground p-4 rounded-md">Test Text</div>
      <div className="bg-primary-foreground p-4 rounded-md lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        Test Text
      </div>
      <div className="bg-primary-foreground p-4 rounded-md">Test Text</div>
    </div>
  );
};

export default Dashboard;
