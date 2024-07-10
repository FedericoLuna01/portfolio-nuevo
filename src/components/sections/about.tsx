import { motion, useScroll, useTransform, Variants } from "framer-motion"
import { useEffect, useRef } from "react"

const PARAGRAPH = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam aliquid dolores accusamus neque error, corrupti, iste eos aspernatur commodi incidunt quas debitis? Dolorem laboriosam ab sunt"

const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center center']
  })

  const words = PARAGRAPH.split(' ');

  // const variants: Variants = {
  //   hidden: {
  //     opacity: 0,
  //     y: -20
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0
  //   }
  // }

  return (
    <section className="h-[200vh] text-black p-5 pl-header flex justify-center relative"
      ref={ref}

    >
      <div
        className="sticky top-[20vh] h-fit mt-[40vh]"
      >
        <motion.p
          className="max-w-3xl text-3xl font-medium flex flex-wrap leading-tight"
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: 0.1,
            bounce: 0
          }}
        // style={{
        //   opacity: scrollYProgress
        // }}
        >
          {words.map((word, index) => (
            <Word key={index} index={index} word={word} scrollYProgress={scrollYProgress} words={words} />
          )
          )}
        </motion.p>
      </div>
    </section>
  )
}

export default About

const Word = ({ index, word, scrollYProgress, words }: {
  index: number,
  word: string,
  scrollYProgress: any,
  words: string[]
}) => {
  const opacity = useTransform(scrollYProgress, [index / words.length, (index + 1) / words.length], [0, 1])
  const y = useTransform(scrollYProgress, [index / words.length, (index + 1) / words.length], [-10, 0])
  const letters = word.split('')

  return (
    <motion.span
      className="inline-block mr-3"
    // style={{
    //   opacity,
    //   y
    // }}
    >
      {
        letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              opacity,
              y
            }}
          >
            {letter}
          </motion.span>
        ))
      }
      {/* {word}{' '} */}
    </motion.span>
  )
}
