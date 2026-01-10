export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ellipse Gradient Background */}
      <div
        className="absolute rounded-full"
        style={{
          width: "1700px",
          height: "585px",
          top: "-454px",
          left: "110px",
          backgroundColor: "#BBFF68",
          opacity: 0.28,
          filter: "blur(400px)",
          zIndex: 0,
        }}
      />
      
      <div className="relative z-10">
        {/* Page content will go here */}
      </div>
    </div>
  );
}
