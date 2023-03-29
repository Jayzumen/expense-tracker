"use client";

const NotLoggedIn = () => {
  return (
    <div className="flex flex-col gap-4 pt-20 text-center">
      <h2 className="text-4xl font-semibold">You are not logged in</h2>
      <p className="text-xl font-semibold">Please sign in to continue</p>
    </div>
  );
};

export default NotLoggedIn;
