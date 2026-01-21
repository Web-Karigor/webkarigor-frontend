"use client";

import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "UI/UX",
    titleHighlight: "Design",
    description:
      "UI/UX Design, App Design, Website Design, Dashboard Design, Wireframing & Prototyping, Interaction Design, and Product Design.",
    link: "/services/ui-ux",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/679a9c4888217669122eebaf_3d41798d228903d42862a148dd56aeb1_Project%20Cards%20%2810%29%20%281%29.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78087a5b72120cc3e5db_d1a5f14e5e5fc69f2dbac575600f06f4_Project%20Cards-6.avif"
    ]
  },
  {
    title: "Web",
    titleHighlight: "Development",
    description:
      "Frontend Development, Backend Development, Full Stack Solutions, Mobile App Development, Custom Web Applications, API Integration.",
    link: "/services/web-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78084947770a14f1eb7c_d1cec41f22346c1c941376236623384b_Project%20Cards.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089c9a93e810fbfa6e_Project%20Cards-1.avif"
    ]
  },
  {
    title: "Logo &",
    titleHighlight: "Branding",
    description:
      "Logo Design, Full Branding, Business Branding, 3d logo, Custom Logo, Visual Identity, Brand Strategy, Social Media Branding, and Brand Guidelines.",
    link: "/services/logo-branding",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac7809638da68108df9847_Project%20Cards-4.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78089a0d6cfed1675211_Project%20Cards-5.avif"
    ]
  },
  {
    title: "Webflow &",
    titleHighlight: "Framer",
    description:
      "Custom Webflow Websites, Webflow Plugin, Framer Prototypes, Framer Material, Framer App, CMS Integration, Rapid Development.",
    link: "/services/framer-design",
    images: [
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac780912dabe81710b65ed_8e70a34a4056237eca17e1209cecdebe_Project%20Cards-2.avif",
      "https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ac78088c2757d4cdf75977_Project%20Cards-3.avif"
    ]
  }
];

export default function Services() {
  return (
    <section className="section-padding">
      <div className="global-padding">
        <div className="container-1899px">
          <div className="section-services-content">
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

            <div className="service-c-flex">
              <div className="services-content-left">
                <div className="services-card-left-c-wrap">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`services-cl-content is-${["one", "two", "three", "four"][index]}`}
                    >
                      <div className="services-c-title-block">
                        <h3 className="services-left-c-title">
                          {service.title}{" "}
                          <span className="service-left-title-pd">{service.titleHighlight}</span>
                        </h3>
                      </div>
                      <div className="services-c-middle-line"></div>
                      <div className="services-c-text-block-2">
                        <p className="services-left-text-2">{service.description}</p>
                      </div>
                      <Link href={service.link} className="services-c-link-block-2 w-inline-block">
                        <div className="services-c-link-text">See More</div>
                        <div className="services-c-link-arrow-block">
                          <Image
                            loading="lazy"
                            src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67326d59201cc3b185432b90_CTA%20Arrow.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="services-c-link-arrow"
                            unoptimized
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="services-content-right">
                {services.map((service, gridIndex) => (
                  <div key={gridIndex} className="services-right-image-block">
                    {service.images.map((imageUrl, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`services-img-box ${imgIndex === 1 ? "is-two" : ""}`}
                      >
                        <Image
                          loading={gridIndex === 0 ? "eager" : "lazy"}
                          src={imageUrl}
                          alt=""
                          width={400}
                          height={300}
                          className="services-r-image"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <style jsx>{`
        .section-padding {
          padding: 4rem 1rem;
        }
        @media (min-width: 640px) {
          .section-padding { padding: 5rem 1.5rem; }
        }
        @media (min-width: 768px) {
          .section-padding { padding: 6rem 2rem; }
        }
        @media (min-width: 1024px) {
          .section-padding { padding: 7rem 2rem; }
        }

        .global-padding { padding: 0 1rem; }
        @media (min-width: 640px) {
          .global-padding { padding: 0 1.5rem; }
        }
        @media (min-width: 768px) {
          .global-padding { padding: 0 2rem; }
        }

        .container-1899px {
          max-width: 1899px;
          margin: 0 auto;
          width: 100%;
        }

        .section-services-content { width: 100%; }
        .services-title-block { margin-bottom: 4rem; }
        .section-tag-block { margin-bottom: 1rem; }
        .section-tag_text {
          display: inline-block;
          padding: 0.5rem 1rem;
          border: 1px solid #22c55e;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .section-title-wrap { margin-top: 1rem; }
        .service-c-flex {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .service-c-flex {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }
        .services-content-left {
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 2rem;
        }
        @media (max-width: 1023px) {
          .services-content-left {
            position: relative;
            top: 0;
          }
        }
        .services-card-left-c-wrap {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .services-cl-content {
          position: relative;
          min-height: 200px;
        }
        @media (min-width: 1024px) {
          .services-cl-content {
            min-height: 250px;
          }
        }
        .services-c-title-block { margin-bottom: 1rem; }
        .services-left-c-title {
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .services-left-c-title { font-size: 2.25rem; }
        }
        .service-left-title-pd {
          font-style: italic;
          font-family: serif;
        }
        .services-c-middle-line {
          width: 100%;
          height: 1px;
          background-color: #9333ea;
          margin: 1.5rem 0;
        }
        .services-c-text-block-2 { margin-bottom: 1.5rem; }
        .services-left-text-2 {
          font-size: 1rem;
          line-height: 1.6;
        }
        .services-c-link-block-2 {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-weight: 500;
          transition: transform 0.2s;
        }
        .services-c-link-block-2:hover {
          transform: translateX(4px);
        }
        .services-c-link-text {
          font-size: 0.875rem;
        }
        .services-c-link-arrow-block {
          display: flex;
          align-items: center;
        }
        .services-c-link-arrow {
          width: 20px;
          height: 20px;
        }
        .services-content-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .services-content-right { gap: 4rem; }
        }
        .services-right-image-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          position: relative;
          min-height: 200px;
        }
        @media (min-width: 768px) {
          .services-right-image-block {
            gap: 1.5rem;
            min-height: 250px;
          }
        }
        @media (min-width: 1024px) {
          .services-right-image-block {
            min-height: 300px;
          }
        }
        .services-img-box {
          border-radius: 8px;
          overflow: hidden;
          padding: 1px;
        }
        .services-img-box.is-two {
          margin-top: 2rem;
        }
        @media (min-width: 768px) {
          .services-img-box.is-two {
            margin-top: 3rem;
          }
        }
        .services-r-image {
          width: 100%;
          height: auto;
          min-height: 200px;
          object-fit: cover;
          object-position: top;
          border-radius: 7px;
          display: block;
        }
        @media (min-width: 768px) {
          .services-r-image {
            min-height: 250px;
          }
        }
        @media (min-width: 1024px) {
          .services-r-image {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
