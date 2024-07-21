import { easeInOut, motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const PARAGRAPH = "Soy federico luna un desarrollador web con 3 años de experiencia en el desarrollo de aplicaciones web, me especializo en el desarrollo de aplicaciones web con tecnologias como React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, entre otras tecnologias. Me gusta aprender nuevas tecnologias y mejorar mis habilidades como desarrollador web."

const About = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "end end"]
  })

  const words = PARAGRAPH.split(" ")
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      ref={container}
    >
      <p
        className="max-w-5xl text-black font-semibold text-3xl leading-1 flex flex-wrap"
      >
        {
          words.map((word, i) => {
            const start = i / words.length
            const end = start + (1 / words.length)
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })
        }
      </p>
    </section>
  )
}

const Word = ({ children, progress, range }:
  {
    children: string, progress: MotionValue, range: number[]
  }) => {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="inline-block mr-5">
      {
        children.split("").map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step)
          return <Char key={`c_${i}`} progress={progress} range={[start, end]}>{char}</Char>
        })
      }
    </span>
  )
}

const Char = ({ children, progress, range }:
  { children: string, progress: MotionValue, range: number[] }) => {
  const opacity = useTransform(
    progress,
    range,
    [0, 1],
    { ease: easeInOut }
  )
  return (
    <span>
      <span className="absolute opacity-20">
        {children}
      </span>
      <motion.span
        className="inline-block"
        style={{ opacity: opacity }}>
        {children}
      </motion.span>
    </span>
  )
}

export default About