import { useState } from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import { NAV_ITEMS } from "@/data/data"

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants: Variants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.8 } },
  }

  const hamburgerVariants: Variants = {
    open: (i: number) => ({
      pathLength: 0,
      opacity: 0.5,
      transition: { duration: 0.5, delay: i * 0.1 }
    }),
    closed: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.1 }
    }),
  };

  const crossVariants: Variants = {
    open: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    closed: {
      pathLength: 0,
      opacity: .5,
      transition: { duration: 0.5 }
    },
  }

  const backdropVariants: Variants = {
    open: { opacity: 1, backdropFilter: "blur(10px)", transition: { duration: 0.5 } },
    closed: { opacity: 0, backdropFilter: "none", transition: { duration: 0.5 } },
  }

  return (
    <>
      <button onClick={toggleMenu}>
        <AnimatePresence initial={false} mode="wait">
          {!isOpen ? (
            <motion.svg
              key="hamburger"
              initial="open"
              animate="closed"
              exit="open"
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.line
                variants={hamburgerVariants}
                custom={0}
                y1="1.5" x2="20" y2="1.5" stroke="black" strokeWidth="3"
              />
              <motion.line
                variants={hamburgerVariants}
                custom={1}
                y1="10.5" x2="24" y2="10.5" stroke="black" strokeWidth="3"
              />
              <motion.line
                variants={hamburgerVariants}
                custom={2}
                y1="19.5" x2="18" y2="19.5" stroke="black" strokeWidth="3"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="cross"
              initial="closed"
              animate="open"
              exit="closed"
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.line
                variants={crossVariants}
                y1="-1.5" x2="27.7633" y2="-1.5"
                transform="matrix(0.697305 -0.716775 0.697305 0.716775 2.64056 22.9)"
                stroke="black"
                strokeWidth="3"
              />
              <motion.line
                variants={crossVariants}
                y1="-1.5" x2="27.7633" y2="-1.5"
                transform="matrix(0.697305 0.716775 -0.697305 0.716775 0 3.10001)"
                stroke="black"
                strokeWidth="3"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-neutral-200 bg-opacity-50 -z-40"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.nav
        className="fixed top-0 left-0 -z-30 w-96 h-screen bg-neutral-100 p-4 pl-24 pt-5 space-y-5"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        {NAV_ITEMS.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            className="block text-neutral-800 text-3xl font-bold relative w-fit group"
          >
            <span className="block absolute w-0 h-[3px] bottom-0 bg-sky-300 -z-10 transition-all duration-200 group-hover:w-full origin-left" aria-hidden="true"></span>
            {item.label}
          </motion.a>
        ))}
      </motion.nav>
    </>
  )
}

export default Menu

