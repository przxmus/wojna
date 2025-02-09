const Unsupported = () => {
  return (
    <div>
      <div className="flex h-screen w-screen items-center justify-center backdrop-blur">
        <p className="text-center text-3xl font-bold text-red-500 drop-shadow-lg">
          Twoja wielkość ekranu nie jest wspierana!
        </p>
      </div>
    </div>
  );
};

export default Unsupported;
