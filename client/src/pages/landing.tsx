import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                BioHacker
              </span>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">Features</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-500 hover:text-gray-900">Testimonials</a>
              <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-gray-500 hover:text-gray-900">FAQ</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/home">
                <Button variant="ghost" className="text-sm">Sign In</Button>
              </Link>
              <Link to="/home">
                <Button className="text-sm bg-black hover:bg-gray-800 text-white rounded-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent"
          >
            Optimize your life.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
          >
            BioHacker integrates cutting-edge technology with the science of biohacking to help you achieve your optimal state of being.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mt-10"
          >
            <Link to="/home">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-6 text-base">
                Try BioHacker Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Powerful. Intuitive. Revolutionary.</h2>
            <p className="mt-4 text-xl text-gray-500">Everything you need to optimize your performance.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Health Dashboard</h3>
              <p className="text-gray-500 text-center">Real-time insights into your biomarkers and health metrics.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Protocol Builder</h3>
              <p className="text-gray-500 text-center">Create and track custom biohacking protocols for optimal results.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Data Analysis</h3>
              <p className="text-gray-500 text-center">Advanced analytics to understand patterns and optimize performance.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Community</h3>
              <p className="text-gray-500 text-center">Connect with other biohackers to share insights and experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center space-y-10 md:space-y-0 md:space-x-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">BioHack Score™</h2>
              <p className="text-gray-500 mb-6">Our proprietary algorithm analyzes multiple biomarkers to generate your personalized BioHack Score™, giving you a comprehensive overview of your current state.</p>
              <ul className="space-y-3">
                {["Advanced biometric tracking", "Daily check-ins", "Progress visualization", "Personalized insights"].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
                <div className="bg-white rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="BioHack Score Dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Loved by biohackers worldwide</h2>
            <p className="mt-4 text-xl text-gray-500">Join thousands of users optimizing their performance.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "BioHacker has transformed my approach to health optimization. My energy levels and focus have improved dramatically.",
                author: "Alex Chen",
                role: "Software Engineer"
              },
              {
                quote: "The protocol tracking features helped me stick to my routines. I've achieved more in 3 months than the previous year.",
                author: "Sarah Johnson",
                role: "Fitness Coach"
              },
              {
                quote: "As someone new to biohacking, this platform made it accessible and data-driven. The community support is fantastic.",
                author: "Michael Rodriguez",
                role: "Health Researcher"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                <svg className="w-8 h-8 text-gray-400 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.667 0v9.333H5.333V0h9.334zm12 0v9.333h-9.334V0h9.334zM14.667 12v9.333H5.333V12h9.334zm12 0v9.333h-9.334V12h9.334zM14.667 24v8H5.333v-8h9.334zm12 0v8h-9.334v-8h9.334z"></path>
                </svg>
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to optimize your life?</h2>
            <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto">Join thousands of biohackers who have taken control of their health and performance.</p>
            <Link to="/home">
              <Button className="bg-white hover:bg-gray-100 text-gray-900 rounded-full px-8 py-6 text-base shadow-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
                BioHacker
              </h3>
              <p className="text-gray-500">Optimize your performance through data-driven biohacking.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Updates", "Beta Program"].map((item, i) => (
                  <li key={i}><a href="#" className="text-gray-500 hover:text-gray-900">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "Guides", "API Reference", "Community"].map((item, i) => (
                  <li key={i}><a href="#" className="text-gray-500 hover:text-gray-900">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                  <li key={i}><a href="#" className="text-gray-500 hover:text-gray-900">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 BioHacker. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies"].map((item, i) => (
                <a key={i} href="#" className="text-gray-500 hover:text-gray-900 text-sm">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;