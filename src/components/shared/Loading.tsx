const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-8 border-border rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-8 border-primary rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;
