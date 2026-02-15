"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const industryProjects = [
  {
    id: 1,
    industry: "Travel",
    title: "Easy Booking for Dream Trips",
    description: "Triply is a hassle-free & effective tour solution for travelers. It's an all-inclusive booking and planning website that helps people make their dream trips easier.",
    stats: [
      { label: "Pages in Projects", value: "40+" },
      { label: "Retention Growth", value: "36%" }
    ],
    author: {
      name: "Shubho Al-Faroque",
      role: "Triply CEO",
      image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67bfffa4c7cf7ce8c1000112_Zantrik.avif"
      
    },
    image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758594e31e0312a925f_e0482580c600f74a17f23e4f9a90e82e_1.avif",
    link: "https://www.designmonks.co/projects/triply-plan-book-travel",
    colorClass: "bg-purple-50",
    Color: "bg-purple-200"
  },
  {
    id: 2,
    industry: "Restaurant",
    title: "Transform Your Dining",
    description: "At Plate, we bring you a handpicked selection of premium restaurants that offer not just meals, but memorable dining experiences, you'll cherish.",
    stats: [
      { label: "Location", value: "France" },
      { label: "Project Duration", value: "5 Months" }
    ],
    author: {
      name: "Neil Saidi",
      role: "Plate CEO",
      image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67bfffa4bb3423877d7e9573_Klub.avif"
    },
    image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7759bb3dd367d1496be0_7bc437d91a35f0cfd064cdc379817e74_2.avif",
    link: "https://www.designmonks.co/projects/food-ordering-mobile-app-design",
    colorClass: "bg-yellow-50",
    Color: "bg-yellow-200"
  },
  {
    id: 3,
    industry: "SaaS",
    title: "Reducing Carbon Footprints",
    description: "Yenex is a smart and sustainable energy platform. It empowers users with distributed energy solutions to reduce carbon footprints effortlessly.",
    stats: [
      { label: "Project timeline", value: "2.5 Months" },
      { label: "Customer Acquisition", value: "40%" }
    ],
    author: {
      name: "Ted Nash",
      role: "Yenex CEO",
      image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67bfffa4029650aa984d4193_Yenex.avif"
    },
    image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758837d0dffb8e32f63_137e4404fe981fb7e0f2f0db1f9ec8e1_3.avif",
    link: "https://www.designmonks.co/projects/navigating-the-future-of-distributed-energy-systems",
    colorClass: "bg-blue-50",
    Color: "bg-blue-200"
  },
  {
    id: 4,
    industry: "Healthcare",
    title: "Revolutionize Fitness Goals",
    description: "Fitmate transforms fitness in Australia with flexible gym access, personalized schedules, and AI-driven insights to solve common workout limitations for users.",
    stats: [
      { label: "Project scope", value: "Mobile App" },
      { label: "Project Duration", value: "2 Months" }
    ],
    author: {
      name: "Omar",
      role: "Fitmate CEO",
      image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67326b39a997e70f0c610c88_Photo%20(1).avif"
    },
    image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac775942997040149279e4_4e1a024419bc26a83fde290b2ebc5fcf_4.avif",
    link: "https://www.designmonks.co/projects/enhancing-fitness-for-australians",
    colorClass: "bg-teal-50",
    Color: "bg-teal-200"
  },
  {
    id: 5,
    industry: "Vehicle Maintenance Platform",
    title: "Simplifying Vehicle Care",
    description: "Zantrik is an innovative vehicle maintenance app. We revamped it with a fresh design, gamification, and intuitive features to boost user engagement.",
    stats: [
      { label: "Project Duration", value: "8 Weeks" },
      { label: "Work Scope", value: "Mobile App" }
    ],
    author: {
      name: "Shubho Al-Farooque",
      role: "Zantrik CEO",
      image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67bfffa4c7cf7ce8c1000112_Zantrik.avif"
    },
    image: "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7758b9d04d9f75e7bc48_0f92202ed3fd271cc358161c2617e175_5.avif",
    link: "https://www.designmonks.co/projects/zantrik-intuitive-vehicle-management-solution",
    colorClass: "bg-purple-50",
    Color: "bg-purple-200"
  }
];

export default function IndustryWins() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [activeIndex, setActiveIndex] = useState(industryProjects.length - 1);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const activeIndexTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
          
          // Increase threshold to prevent jittering
          if (scrollDiff > 15) {
            if (currentScrollY > lastScrollY.current) {
              setScrollDirection('down');
            } else {
              setScrollDirection('up');
            }
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              // Debounce active index changes to prevent jittering
              if (activeIndexTimeout.current) {
                clearTimeout(activeIndexTimeout.current);
              }
              
              activeIndexTimeout.current = setTimeout(() => {
                setActiveIndex((prevIndex) => {
                  // Only update if there's a significant change to prevent jittering
                  if (Math.abs(prevIndex - index) >= 1 || entry.intersectionRatio > 0.6) {
                    return index;
                  }
                  return prevIndex;
                });
              }, 50);
            }
          });
        },
        {
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
          rootMargin: '-80px 0px -80px 0px',
        }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
      if (activeIndexTimeout.current) {
        clearTimeout(activeIndexTimeout.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1899px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-center text-center"
        >
          {/* Top Tag */}
          <div className="mb-6">
            <div className="inline-block px-6 py-2 border-2 border-[#5CF7B8] rounded-full bg-[#FEFCF6]">
              <span className="text-base font-medium text-[#7ED6A6]">Success Across Industries</span>
            </div>
          </div>
          {/* Main Title */}
          <div className="flex flex-col items-center">
            <h2 className="flex flex-col md:flex-row items-center justify-center gap-2 text-[2rem] md:text-[2.5rem] font-bold">
              <span className="text-[#58D49A] italic font-semibold md:mr-2" style={{
                fontFamily: 'Nunito, Arial, sans-serif', // use playful rounded font if available
                fontStyle: 'italic',
                fontWeight: 700,
                letterSpacing: '-1px'
              }}>
                Delivering
              </span>
              <span className="text-black" style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 900
              }}>
                Success
              </span>
            </h2>
          </div>
          {/* Sub Description */}
          <div className="mt-6">
            <p className="text-base md:text-lg text-[#313135] font-normal max-w-2xl mx-auto">
              Helping businesses achieve measurable growth and lasting impact<br />
              across diverse industries
            </p>
          </div>
        </motion.div>

        {/* Project Cards Container */}
        <div className="relative" style={{ minHeight: '200vh' }}>
          {industryProjects.map((project, index) => {
            const shouldStickDown = scrollDirection === 'down' && index <= activeIndex;
            
            const wasStacked = index <= activeIndex;
            const shouldStickUp = scrollDirection === 'up' && wasStacked;
            
            const shouldStick = shouldStickDown || shouldStickUp;
            
            const baseTopOffset = 100;
            let stackOffset = 0;
            if (shouldStickDown) {
              stackOffset = baseTopOffset + (index * 100);
            } else if (shouldStickUp) {
              stackOffset = baseTopOffset + (index * 100);
            }            
            const zIndex = index + 1;
            let scaleValue = 1;
            if (shouldStickDown) {
              scaleValue = Math.max(0.97 - index * 0.02, 0.9);
            } else if (shouldStickUp) {
              scaleValue = Math.max(0.97 - index * 0.02, 0.9);
            }
            let translateY = 0;
            if (shouldStickUp) {
              const cardsToUnstack = activeIndex - index;
              translateY = cardsToUnstack * 150; 
            }
            const isLastCard = index === industryProjects.length - 1;
            const shouldSmoothLastCard = isLastCard && activeIndex === index;            
            return (
              <motion.div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-4"
                style={{
                  position: shouldStick ? 'sticky' : 'relative',
                  top: shouldStick ? `${stackOffset}px` : 'auto',
                  zIndex: zIndex,
                  transition: isLastCard && shouldSmoothLastCard 
                    ? 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
                    : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: `scale(${scaleValue}) translateY(${translateY}px)`,
                  opacity: shouldStick ? Math.min(0.92 + index * 0.015, 1) : 1,
                  willChange: 'transform, opacity, top',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <Link
                  href={project.link}
                  target="_blank"
                  className="block group max-w-5xl mx-auto"
                >
                  <div className={`${project.colorClass} ${project.Color} rounded-md overflow-hidden transition-all duration-300 shadow`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-6">
                      {/* Left Content */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-700 mb-1">
                            {project.industry}
                          </h3>
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            {project.title}
                          </h4>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {project.description}
                          </p>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {project.stats.map((stat, statIndex) => (
                            <div key={statIndex}>
                              <p className="text-xs text-gray-600 mb-0.5">{stat.label}</p>
                              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Author Info */}
                        <div className={`${project.colorClass} rounded-xl p-2.5 flex items-center justify-between group-hover:opacity-90 transition-all`}>
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image
                                src={project.author.image}
                                alt={project.author.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-xs text-gray-900">{project.author.name}</div>
                              <div className="text-xs text-gray-600">{project.author.role}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-700 group-hover:translate-x-2 transition-transform">
                            <span className="text-xs font-medium">View Project</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Right Image */}
                      <div className="relative h-[250px] lg:h-[340px] rounded-md overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* See All Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="relative inline-block group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            
            {/* Button Content */}
            <div className="relative justify-center bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-700 hover:to-purple-800 text-white text-lg px-4 py-3 rounded shadow-lg shadow-purple-500/50 flex items-center gap-3">
              <span className="text-center text-sm">See All Projects</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

