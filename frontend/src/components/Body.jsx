
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Clock, Star, TrendingUp } from "lucide-react"


const featuredPosts = [
  {
    title: "The Future of Web Development",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop",
    },
  },
  {
    title: "Mastering Digital Photography",
    category: "Art & Design",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop",
    },
  },
  {
    title: "Sustainable Living Guide",
    category: "Lifestyle",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    author: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop",
    },
  },
]

const categories = [
  { name: "Technology", count: 120, icon: TrendingUp },
  { name: "Art & Design", count: 85, icon: Star },
  { name: "Lifestyle", count: 95, icon: BookOpen },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function BodySection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-emerald-50 to-white py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-1/4 top-3/4 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Featured Posts Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold text-emerald-900 sm:text-4xl"
          >
            Featured Stories
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <span className="inline-block rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <img
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-emerald-700">{post.author.name}</span>
                    </div>
                    <div className="flex items-center text-emerald-600">
                      <Clock className="mr-1 h-4 w-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold text-emerald-900 sm:text-4xl"
          >
            Explore Categories
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white transition-shadow hover:shadow-lg"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/10" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <category.icon className="mb-4 h-8 w-8" />
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="mt-2 text-emerald-100">{category.count} articles</p>
                  </div>
                  <motion.div whileHover={{ x: 5 }} className="rounded-full bg-white/20 p-2">
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Section */}
        
      </div>
    </section>
  )
}

