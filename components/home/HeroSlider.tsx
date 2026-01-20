'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const images = [
  '/s1.png',
  '/s2.png',
  '/s3.png',
  '/s4.png',
  '/s1.png',
  '/s2.png',
  '/s3.png',
  '/s4.png'
]

const HeroSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (!containerRef.current || !slidesRef.current) return

    let trigger: ScrollTrigger

    // Horizontal stacking initial setup: left to right, not overlapping
    slidesRef.current.forEach((slide, idx) => {
      if (!slide) return
      gsap.set(slide, {
        xPercent: 100 * idx,
        zIndex: images.length - idx,
        scale: 1,
      })
    })

    const ctx = gsap.context(() => {
      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${window.innerWidth * (images.length - 1) * 0.7}`, // dynamic horizontal scroll
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => {
          // Horizontal slider: left to right
          const progress = self.progress
          slidesRef.current.forEach((slide, idx) => {
            if (!slide) return;

            // xPercent for left-to-right horizontal slider
            const xPerc = 100 * (idx - progress * (images.length - 1))
            // Only scale the active slide a little for focus
            const scaleVal = 1 - 0.15 * Math.abs(idx - progress * (images.length - 1))
            gsap.to(slide, {
              xPercent: xPerc,
              scale: scaleVal > 0.85 ? scaleVal : 0.85,
              zIndex: images.length - Math.abs(idx - progress * (images.length - 1)),
              duration: 0.4,
              ease: "power2.out"
            })
          })
        }
      })
    }, containerRef)

    return () => {
      ctx.revert();
      if (trigger) trigger.kill();
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="w-full relative py-10 overflow-hidden flex justify-center items-center"
      style={{ minHeight: 500 }}
    >
      <div className="relative w-full max-w-6xl flex items-center justify-center" style={{height: '35vw', minHeight: 320}}>
        {images.map((src, idx) => (
          <motion.div
            key={src}
            ref={el => (slidesRef.current[idx] = el)}
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-xl overflow-hidden"
            style={{
              width: '23vw',
              minWidth: 220,
              height: '35vw',
              minHeight: 320,
              boxShadow: idx === 0 ? "0px 8px 32px rgba(0,0,0,0.07)" : undefined
            }}
            initial={{
              x: 0,
              scale: 1
            }}
          >
            <Image
              src={src}
              alt={`Hero Slide ${idx + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 23vw"
              className="object-cover"
              loading={idx===0?'eager':'lazy'}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default HeroSlider