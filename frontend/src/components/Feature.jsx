"use client"

import { motion } from "framer-motion"
import { BookOpen, Compass, Users, Zap } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Rich Content Library",
    description: "Access thousands of articles across various categories and topics.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join discussions and connect with readers and writers worldwide.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Enjoy seamless reading experience with optimized performance.",
  },
  {
    icon: Compass,
    title: "Personalized Discovery",
    description: "Get recommendations tailored to your reading preferences.",
  },
]

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-emerald-50 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,emerald-100_50%,transparent_100%)] opacity-40" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">
            Everything you need to create and consume great content
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-lg text-emerald-700">
            Our platform provides all the tools and features you need to make your blogging experience exceptional.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-block rounded-lg bg-emerald-100 p-3 text-emerald-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-emerald-900">{feature.title}</h3>
              <p className="text-emerald-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-center sm:p-12"
        >
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Stay Updated with Our Newsletter</h2>
          <p className="mx-auto mb-8 max-w-2xl text-emerald-100">
            Get the latest articles, resources, and insights delivered directly to your inbox. Join our community of
            readers and never miss an update.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-2 border-transparent bg-white/10 px-4 py-2 text-white placeholder-emerald-200 backdrop-blur-sm transition-colors focus:border-white/30 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-white px-6 py-2 font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

