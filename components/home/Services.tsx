"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Application Development",
    highlight: "And Design",
    subtitle: "Fast, scalable, and secure solutions for modern businesses.",
    desc:
      "From concept to deployment, we develop custom web applications engineered for performance and reliability. Our team transforms complex workflows into smooth digital operations, ensuring your platform grows as your business evolves.",
    link: "/services/ui-ux",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/679a9c4888217669122eebaf_3d41798d228903d42862a148dd56aeb1_Project%20Cards%20%2810%29%20%281%29.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78087a5b72120cc3e5db_d1a5f14e5e5fc69f2dbac575600f06f4_Project%20Cards-6.avif"
    ]
  },
  {
    title: "Mobile App",
    highlight: "Development",
    subtitle: "Seamless mobile experiences that connect with people.",
    desc:
      "",
    link: "/services/web-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78084947770a14f1eb7c_d1cec41f22346c1c941376236623384b_Project%20Cards.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089c9a93e810fbfa6e_Project%20Cards-1.avif"
    ]
  },
  {
    title: "Branding & Digital",
    highlight: "Identity",
    subtitle: "Meaningful brands built to inspire confidence.",
    desc:
      "Logo Design, Brand Identity, Visual Strategy, Social Media Branding.",
    link: "/services/logo-branding",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7809638da68108df9847_Project%20Cards-4.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089a0d6cfed1675211_Project%20Cards-5.avif"
    ]
  },
  {
    title: "Product Strategy & ",
    highlight: "Consultation",
    subtitle: "Expert guidance to turn ideas into scalable products.",
    desc:
      "Webflow, Framer Prototypes, CMS Integration, Rapid Landing Pages.",
    link: "/services/framer-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac780912dabe81710b65ed_8e70a34a4056237eca17e1209cecdebe_Project%20Cards-2.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78088c2757d4cdf75977_Project%20Cards-3.avif"
    ]
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* GSAP smooth scrub */
  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5
    });
  }, []);

  /* Framer scroll */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  /* Make scroll slow & buttery */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 22,
    mass: 1.2
  });

  return (
    <section ref={sectionRef} className="relative py-4">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="services-title-block text-center">
              <div className="section-tag-block mb-6">
                <div className="inline-block px-6 py-2 border-2 border-[#62F7B3] rounded-full bg-[#FEFCF6]">
                  <span className=" text-[#62F7B3] font-medium">Services</span>
                </div>
              </div>
              <div className="section-title-wrap mb-5">
                <h2 className="flex flex-col md:flex-row items-center justify-center gap-2 text-[2rem] md:text-[2.5rem] font-bold">
                  <span className="text-[#58D49A] italic font-semibold md:mr-2" style={{ fontFamily: 'Nunito, Arial, sans-serif', fontStyle: 'italic', fontWeight: 700, letterSpacing: '-1px' }}>
                    We Work to
                  </span>
                  <span className="text-black" style={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 900, textDecoration: 'underline', textUnderlineOffset: '0.18em' }}>
                    Build Brands
                  </span>
                </h2>
              </div>
              <div className="mt-3">
                <p className="text-base md:text-lg text-[#313135] font-normal max-w-2xl mx-auto">
                  From idea to execution, we help build brands through modern software, intuitive<br />
                  design, and strategic product thinking that drives real business results.
                </p>
              </div>
            </div>

        {services.map((service, i) => {
          const start = i / services.length;
          const end = (i + 1) / services.length;

          const rawOpacity = useTransform(
            smoothProgress,
            [start, start + 0.15, end - 0.15, end],
            [0, 10, 10, 0]
          );

          const opacity = useSpring(rawOpacity, {
            stiffness: 30,
            damping: 20
          });

          const rawY = useTransform(
            smoothProgress,
            [start, end],
            [100, -100]
          );

          const y = useSpring(rawY, {
            stiffness: 30,
            damping: 22
          });

          return (
            <motion.div
              key={i}
              style={{ opacity }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-[70vh] items-center"
            >
              {/* LEFT */}
              <motion.div style={{ y }}>
                <h3 className="text-4xl font-bold mb-4">
                  {service.title}{" "}
                  <span className="italic">{service.highlight}</span>
                </h3>

                <p className="text-[28px] text-gray-600 max-w-4xl mb-6">
                  {service.subtitle}
                </p>

                <p className="text-lg text-gray-600 max-w-4xl mb-6">
                  {service.desc}
                </p>

                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 font-medium"
                >
                  See More →
                </Link>
              </motion.div>

              {/* RIGHT */}
              <motion.div style={{ y }} className="grid grid-cols-2 gap-6">
                {service.images.map((img, j) => (
                  <div key={j} className={j === 1 ? "mt-20" : ""}>
                    <Image
                      src={img}
                      alt=""
                      width={520}
                      height={420}
                      className="rounded-xl object-cover w-full"
                      unoptimized
                    />
                  </div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
