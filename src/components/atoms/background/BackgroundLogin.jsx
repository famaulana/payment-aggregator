export const BackgroundLogin = ({ children }) => {
  return (
    <div
      className="inset-x-0 top-0 z-0 h-full w-full -ml-16 bg-cover skew-x-10"
      style={{
        backgroundImage: "url('./img/curved6.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      {children}
    </div>
  );
};
