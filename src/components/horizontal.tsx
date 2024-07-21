'use client'

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Hero from "./sections/hero";
import About from "./sections/about";
import TechStack from "./sections/tech-stack";

const Horizontal = () => {
  return (
    <div className="bg-neutral-50">
      <Hero />
      <About />
      <div className="sticky top-0 z-10 mb-[50vh]">
        <HorizontalScrollCarousel />
      </div>
      <div className="relative z-20 min-h-screen flex items-center justify-center bg-neutral-500">
        <span className="text-white">Scroll up</span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
        <motion.div style={{ x }} className="flex">
          <TechStack />
        </motion.div>
      </div>
    </section>
  );
};


export default Horizontal;
