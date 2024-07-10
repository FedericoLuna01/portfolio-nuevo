import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cloud1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const cloudUp = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const cloud3 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const cloud4 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "800%"]);
  const textY2 = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="pl-header p-5 h-screen">
      <div ref={ref} className="w-full h-full rounded-3xl overflow-hidden relative select-none pointer-events-none"
      >
        <motion.div
          className="absolute inset-0  bg-gradient-to-tr from-blue-300 to-sky-400"
        />
        <motion.img
          src='/02.webp'
          className="absolute top-10 right-20 z-40"
          width={500}
          height={500}
          style={{
            y: cloud1,
          }}
        />
        <motion.img
          src='/02.webp'
          className="absolute bottom-16 left-24 z-40 "
          width={800}
          height={800}
          style={{
            y: cloud1,
          }}
        />
        <motion.img
          src='/63.webp'
          className="absolute top-0 -left-20 z-40"
          width={800}
          height={800}
          style={{
            y: cloudUp,
          }}
        />
        <motion.img
          src='/64.webp'
          className="absolute bottom-0 -left-10 z-20"
          width={800}
          height={800}
        />
        <motion.img
          src='/94.webp'
          className="absolute top-0 -right-20 z-20"
          width={800}
          height={800}
          style={{
            y: cloudUp,
          }}
        />
        <motion.img
          src='/80.webp'
          className="absolute -bottom-10 -right-20 z-10"
          width={800}
          height={800}
          style={{
            y: cloud4,
          }}
        />
        <motion.img
          src='/05.webp'
          className="absolute -bottom-10 -right-20 z-40 opacity-80"
          width={800}
          height={800}
          style={{
            y: cloud1,
          }}
        />
        <motion.img
          src='/33.webp'
          className="absolute top-52 left-96 z-40"
          width={1000}
          height={1000}
          style={{
            y: cloud3,
          }}
        />
        <motion.h1 style={{ y: textY }} className="text-black absolute top-10 left-10 text-9xl uppercase font-bold z-30">
          Federico Luna
        </motion.h1>
        <motion.h1 style={{ y: textY2 }} className="text-black absolute bottom-10 right-10  text-9xl uppercase font-bold z-30">
          FullStack <br /><span>Developer</span>
        </motion.h1>
      </div>
    </div>
  )
}

export default Hero