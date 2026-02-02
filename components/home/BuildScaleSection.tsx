export default function BuildScaleSection() {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-black px-4">
        <div className="text-center">
          <h1 className="
            text-[32px] sm:text-[44px] lg:text-[64px]
            font-extrabold leading-tight
            bg-gradient-to-r from-emerald-300 via-lime-300 to-yellow-300
            bg-clip-text text-transparent
          ">
            Let’s build what your <br />
            users will love and your <br />
            business will grow with
          </h1>
  
          <div className="mt-10 flex items-center justify-center gap-4 text-gray-200 text-sm sm:text-base">
            <span>Build Smarter</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            <span>Launch Stronger</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
            <span>Scale Faster</span>
          </div>
        </div>
      </section>
    )
  }
  