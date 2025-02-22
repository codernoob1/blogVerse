import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/useAuth.js';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Explore', to: '/explore' },
  { name: 'Profile', to: '/profile' },
  { name: 'Company', to: '/createPost' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.header 
      className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">BlogVerse</span>
            <img
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <motion.div 
          className="hidden lg:flex lg:gap-x-12"
          variants={navVariants}
        >
          {navigation.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Link 
                to={item.to} 
                className="text-sm/6 font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm/6 font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-200"
            >
              Log out <span aria-hidden="true">→</span>
            </button>
          ) : (
            <Link 
              to="/signup" 
              className="text-sm/6 font-semibold text-gray-900 hover:text-emerald-600 transition-colors duration-200"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">BlogVerse</span>
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <motion.div 
            className="mt-6 flow-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    to="/signup"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
}