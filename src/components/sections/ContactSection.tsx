"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Github, Phone } from "lucide-react"

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "srih8991@gmail.com",
      href: "mailto:srih8991@gmail.com",
      description: "Best for project inquiries and collaboration",
      color: "text-portfolio-purple"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8309012139",
      href: "tel:+918309012139",
      description: "For urgent consultations",
      color: "text-portfolio-cyan"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/sriharsha-velicheti",
      href: "https://linkedin.com/in/sriharsha-velicheti-0794351b2",
      description: "Professional networking and connections",
      color: "text-blue-500"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/sriharsha8991",
      href: "https://github.com/sriharsha8991",
      description: "View my code and contributions",
      color: "text-gray-700"
    }
  ]

  const services = [
    "🤖 Custom AI Development",
    "🏥 Healthcare AI Solutions", 
    "🎯 AI Strategy & Consulting",
    "💼 Business Process Automation"
  ]

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              Let&apos;s Build Something Intelligent Together
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with AI? Let&apos;s discuss your project and turn your vision into reality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold font-heading mb-6">Get In Touch</h3>
              
              <div className="grid gap-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="block"
                    >
                      <Card className="glass-card hover:shadow-lg hover:shadow-portfolio-purple/10 transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-full bg-muted/50 ${method.color}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-lg">{method.label}</h4>
                              <p className="text-muted-foreground text-sm mb-1">{method.description}</p>
                              <p className="font-mono text-sm text-portfolio-cyan break-all">{method.value}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.a>
                  )
                })}
              </div>

              <div className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Response Promise:</strong> I respond to all inquiries within 24 hours. 
                  For urgent projects, feel free to call directly.
                </p>
              </div>
            </motion.div>

            {/* Services & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">What I Can Help With</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-lg">{service.split(' ')[0]}</span>
                      <span className="text-muted-foreground">{service.substring(2)}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card bg-gradient-to-br from-portfolio-purple/5 to-portfolio-cyan/5">
                <CardContent className="p-8 text-center space-y-6">
                  <h3 className="text-2xl font-bold font-heading">Ready to Start?</h3>
                  <p className="text-muted-foreground">
                    Book a 30-minute discovery call to discuss your AI project needs and explore how we can work together.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-portfolio-purple to-portfolio-cyan hover:shadow-lg hover:shadow-portfolio-purple/25"
                      asChild
                    >
                      <a href="mailto:srih8991@gmail.com?subject=Project Inquiry - Portfolio Contact">
                        Start a Conversation
                      </a>
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Or reach out via any of the contact methods above
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}