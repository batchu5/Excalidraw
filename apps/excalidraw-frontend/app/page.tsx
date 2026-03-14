"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Move3D, 
  MoveRight, 
  Pencil, 
  Square,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const navigate = useRouter()
  const { scrollY } = useScroll();
  
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const router = useRouter();

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 400);
  };

  const handleInputChange = ( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Background Grid */}
      <div className={cn(
        "fixed inset-0 z-0",
        "[background-size:40px_40px]",
        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
        "bg-black",
        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
      )}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      </div>

      {/* Navbar */}
      <motion.div 
        className="flex z-50 fixed justify-center top-6 w-full px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-full max-w-2xl flex justify-between bg-neutral-900/80 backdrop-blur-md border border-[#262626] py-3 md:py-4 rounded-full px-4 md:px-6">
          <motion.div 
            className="text-amber-100 text-xl md:text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sketchzy
          </motion.div>
          
          <div className="flex gap-2 md:gap-4">
            <motion.div 
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              
              <Button onClick = {() => {navigate.push("/signin")}} variant={"outline"} size="sm" className="bg-amber-300 hover:bg-amber-400 text-black border-amber-400 transition-colors duration-200">
                Sign in
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button onClick = {() => {navigate.push("/signup")}} variant={"outline"} size="sm" className="bg-amber-300 hover:bg-amber-400 text-black border-amber-400 transition-colors duration-200">
                Sign up
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 flex pt-32 md:pt-40 pb-20 justify-center text-white px-4"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="text-center max-w-4xl">
          <motion.p 
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-[#fca311] to-pink-400 leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {"Sketch Out Loud!"}
          </motion.p>
          
          <motion.p 
            className="text-base md:text-lg font-mono text-pink-200 mt-4 md:mt-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {"Intuitive drawing. Real-time collaboration. Zero distractions."}
          </motion.p>
          
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(252, 163, 17, 0.3)"
              }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button size={"lg"} className="bg-amber-300 hover:bg-amber-400 text-black font-semibold px-8 py-6 text-lg transition-colors duration-200" onClick={() => {router.push("/signup")}}>
                View Demo <MoveRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Video Section */}
      <motion.div 
        className="relative z-10 flex justify-center px-4 pb-20"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl w-full"
        >
          <div className="flex justify-center rounded-2xl overflow-hidden shadow-2xl">
            <video 
              width="100%" 
              height="auto" 
              autoPlay 
              loop 
              muted 
              className="rounded-2xl w-full max-w-4xl"
            >
              <source src="/images/canvas.mp4" />
              {"Your browser doesnt support video playback"}
            </video>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 bg-neutral-800/90 backdrop-blur-sm p-6 md:p-8 lg:p-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl text-amber-100 font-bold mb-4">
            Everything you need to create
          </p>
          <p className="font-mono text-pink-100 text-lg md:text-xl max-w-2xl mx-auto">
            {"Powerful tools designed for simplicity, creativity, and collaboration"}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Pencil,
              title: "Freehand Drawing",
              description: "Draw naturally with smooth, responsive pen tools",
              delay: 0.1
            },
            {
              icon: Square,
              title: "Shapes & Elements",
              description: "Add rectangles, circles, arrows, and text elements",
              delay: 0.2
            },
            {
              icon: Move3D,
              title: "Infinite Canvas",
              description: "Pan and zoom on an unlimited drawing space",
              delay: 0.3
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              className="bg-amber-100 w-full h-auto min-h-[160px] rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:border-2 hover:border-dashed hover:border-neutral-800"
            >
              <motion.div>
                <feature.icon className="w-9 h-9 bg-amber-300 rounded p-2 mb-3"/>
              </motion.div>
              <p className="text-xl md:text-2xl font-bold mb-2">{feature.title}</p>
              <p className="text-sm md:text-base font-serif text-neutral-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="relative z-10 bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 md:p-8 lg:p-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-3xl md:text-5xl text-amber-100 font-bold mb-4">
              {"Lets Create Together"}
            </p>
            <p className="font-mono text-pink-200 text-lg md:text-xl">
              {"Ready to start sketching? Get in touch with us today."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-amber-100 mb-6">Get in Touch</h3>
              
              {[
                { icon: Mail, label: "Email", value: "hello@sketchzy.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Location", value: "San Francisco, CA" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-neutral-800/50 backdrop-blur-sm border border-amber-300/20 hover:border-amber-300/40 transition-all duration-300"
                >
                  <motion.div
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon className="w-6 h-6 text-amber-300" />
                  </motion.div>
                  <div>
                    <p className="text-amber-100 font-semibold">{contact.label}</p>
                    <p className="text-pink-200">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <div className="text-amber-100 font-semibold">Name</div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-neutral-800/50 border border-amber-300/20 text-white placeholder-pink-200/60 focus:border-amber-300 focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <div className="text-amber-100 font-semibold">Email</div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-lg bg-neutral-800/50 border border-amber-300/20 text-white placeholder-pink-200/60 focus:border-amber-300 focus:outline-none transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <div className="text-amber-100 font-semibold">Message</div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full p-4 rounded-lg bg-neutral-800/50 border border-amber-300/20 text-white placeholder-pink-200/60 focus:border-amber-300 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="w-full bg-amber-300 hover:bg-amber-400 text-black font-semibold py-4 transition-all duration-300 hover:shadow-lg hover:shadow-amber-300/30"
                  >
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>


      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-amber-300 hover:bg-amber-400 text-black p-3 rounded-full shadow-lg transition-all duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0, 
          opacity: showScrollTop ? 1 : 0 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onViewportEnter={() => window.addEventListener('scroll', handleScroll)}
        onViewportLeave={() => window.removeEventListener('scroll', handleScroll)}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}