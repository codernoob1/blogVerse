import { motion } from 'framer-motion'

export default function Hero() {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="bg-white pt-20">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff93f3] to-[#89fca6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <motion.div 
          className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.div 
            className="hidden sm:mb-8 sm:flex sm:justify-center"
            variants={childVariants}
          >
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all duration-200">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-emerald-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
              variants={childVariants}
            >
              Discover Stories That
              Inspire & Enlighten
            </motion.h1>
            <motion.p 
              className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
              variants={childVariants}
            >
              Explore a world of thoughtful insights, creative ideas, and compelling stories crafted to spark your imagination and broaden your horizons.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              variants={childVariants}
            >
              <a
                href="#"
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-200">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ff93f3] to-[#89fca6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}