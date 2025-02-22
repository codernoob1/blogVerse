import { motion } from "framer-motion"
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Github, href: "#" },
  { icon: Linkedin, href: "#" },
]

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Blog", "Documentation"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms", "Privacy", "Guidelines", "Licensing"],
  },
]

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-emerald-900 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-emerald-800/40 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">BlogVerse</h2>
            <p className="text-emerald-200">Empowering voices, connecting minds, and sharing stories that matter.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="rounded-full bg-emerald-800 p-2 text-emerald-200 transition-colors hover:bg-emerald-700 hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: columnIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-emerald-200 transition-colors hover:text-emerald-400">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 border-t border-emerald-800 pt-8 text-center text-emerald-200"
        >
          <p>&copy; 2024 BlogVerse. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

