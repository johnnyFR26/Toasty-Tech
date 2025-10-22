"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Smartphone, Globe, Database, Users, Star, ArrowRight, Mail, Phone, MapPin, Instagram } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import { I18nProvider, useI18n } from "@/contexts/i18n-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { title } from "process"
import { Description } from "@radix-ui/react-toast"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LandingPageContent() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/send-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    } catch (error) {
      console.error("Error submitting form:", error)
    }
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", company: "", message: "" })
    alert(t("contact.form.success"))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: backgroundY }} className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </motion.div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300"
      >
        <Link href="/" className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
            <Image
              src="/SAVE_20251010_213335.jpg"
              alt="Toasty Tech Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </motion.div>
          <span className="text-xl font-bold text-purple-800 dark:text-purple-300">Toasty Tech</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            href="#servicos"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {t("nav.services")}
          </Link>
          <Link
            href="#projetos"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {t("nav.projects")}
          </Link>
          <Link
            href="#sobre"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {t("nav.about")}
          </Link>
          <Link
            href="#contato"
            className="text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {t("nav.contact")}
          </Link>
          <div className="flex items-center gap-2 ml-4">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </nav>
      </motion.header>

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.div variants={fadeInUp}>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800">
                      {t("hero.badge")}
                    </Badge>
                  </motion.div>
                  <motion.h1
                    variants={fadeInUp}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent"
                  >
                    {t("hero.title")}
                  </motion.h1>
                  <motion.p variants={fadeInUp} className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
                    {t("hero.description")}
                  </motion.p>
                </div>
                <motion.div variants={fadeInUp} className="flex flex-col gap-2 min-[400px]:flex-row">
                  <motion.div {...scaleOnHover}>
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                      asChild
                    >
                      <Link href="#contato">
                        {t("hero.cta.start")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div {...scaleOnHover}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
                      asChild
                    >
                      <Link href="#projetos">{t("hero.cta.view")}</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-3xl opacity-20"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src="/SAVE_20251010_213335.jpg"
                      alt="Toasty Tech Logo"
                      width={400}
                      height={400}
                      className="relative z-10 rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="servicos"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                    {t("services.badge")}
                  </Badge>
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white"
                >
                  {t("services.title")}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  {t("services.description")}
                </motion.p>
              </div>
            </AnimatedSection>
            <AnimatedSection className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-8">
              {[
                {
                  icon: Instagram,
                  title: t("services.trafic.title"),
                  description: t("services.trafic.description"),
                  features: ["Instagram", "Facebook", "Google", "Meta"],
                  price: "R$ 1.500",
                },
                {
                  icon: Globe,
                  title: t("services.web.title"),
                  description: t("services.web.description"),
                  features: ["Landing Pages", "E-commerce", "Sistemas Web", "APIs REST"],
                  price: "R$ 2.500",
                },
                {
                  icon: Smartphone,
                  title: t("services.mobile.title"),
                  description: t("services.mobile.description"),
                  features: ["React Native", "Flutter", "UI/UX Design", "Publicação nas Stores"],
                  price: "R$ 5.000",
                },
                {
                  icon: Database,
                  title: t("services.systems.title"),
                  description: t("services.systems.description"),
                  features: ["ERP/CRM", "Integrações", "Cloud Computing", "Consultoria Tech"],
                  price: t("services.price.consultation"),
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg dark:hover:shadow-purple-500/25 transition-all duration-300 bg-white dark:bg-gray-800 h-full">
                    <CardHeader>
                      <motion.div>
                        <service.icon className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-2" />
                      </motion.div>
                      <CardTitle className="dark:text-white">{service.title}</CardTitle>
                      <CardDescription className="dark:text-gray-300">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            • {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div {...scaleOnHover}>
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600">
                          {service.price.includes("R$")
                            ? `${t("services.price.from")} ${service.price}`
                            : service.price}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projetos"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.div variants={fadeInUp}>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                    {t("projects.badge")}
                  </Badge>
                </motion.div>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white"
                >
                  {t("projects.title")}
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  {t("projects.description")}
                </motion.p>
              </div>
            </AnimatedSection>
            <AnimatedSection className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-8">
              {[
                {
                  title: "E-commerce platform",
                  type: "Web",
                  description:
                    "Plataforma completa de vendas online com sistema de pagamento integrado e painel administrativo.",
                  testimonial: "Excelente trabalho! A equipe entregou exatamente o que precisávamos.",
                  image: "/plataforma-marketplace-capa-toastytech-v1.png",
                },
                {
                  title: "App de gestão financiera",
                  type: "Mobile",
                  description: "Aplicativo para acompanhar finanças pessoais e empresariais com funcionalidades avançadas e auxilio de IA.",
                  testimonial: "App incrível! Superou nossas expectativas em funcionalidade e design.",
                  image: "/plataforma-finanz-capa-toastytech-v1.png",
                },
                {
                  title: "Sistema ERP Personalizado",
                  type: "Sistema",
                  description: "Sistema completo de gestão empresarial com módulos financeiro, estoque e vendas.",
                  testimonial: "Sistema perfeito para nossa empresa. Aumentou nossa produtividade em 40%.",
                  image: "/plataforma-attendance-capa-toastytech-v1.png",
                },
                {
                  title: "Plataforma Educacional",
                  type: "Web",
                  description:
                    "Portal de ensino online com videoaulas, exercícios interativos e acompanhamento de progresso.",
                  testimonial: "Transformou nossa forma de ensinar. Alunos mais engajados e resultados melhores.",
                  image: "/plataforma-minerva-capa-toastytech-v1.png",
                },
                {
                  title: "SAAS de geração de blogs",
                  type: "Web",
                  description:
                    "Plataforma de geração de blogs com editor de texto e recursos de gestão de conteúdo.",
                  testimonial: "Excelente trabalho! A equipe entregou exatamente o que precisávamos.",
                  image: "/plataforma-myownblog-capa-toastytech-v1.png",
                },
                {
                  title: "Plataforma para ensino de Libras",
                  type: "Web",
                  description:
                    "Plataforma de ensino de Libras com gamificacao, exercícios praticos interativos e acompanhamento de progresso.",
                  testimonial: "Excelente trabalho! A equipe entregou exatamente o que precisávamos.",
                  image: "/plataforma-teclibras-capa-toastytech-v1.png",
                },
                {
                  title: "Jogo educativo de biologia",
                  type: "web",
                  description: "Jogo online para promover o conhecimento da fauna",
                  testimonial: "A velocidade da entrega me surpreendeu!",
                  image: "/plataforma-animaldle-capa-toastytech-v1.png"
                },
                {
                  title: "Philosopher guess",
                  type: "Mobile",
                  description: "Jogo de preparaçao para vestibular de filosofia",
                  testimonial: "Superou todas as minhas expectativas",
                  image: "/plataforma-filosofo-capa-toastytech-v1.png"

                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg dark:hover:shadow-purple-500/25 transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden">
                    <CardHeader className="p-0">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={200}
                          className="rounded-t-lg object-cover w-full"
                        />
                      </motion.div>
                      <div className="p-6">
                        <CardTitle className="flex items-center gap-2 dark:text-white">
                          {project.title}
                          <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                            {project.type}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="dark:text-gray-300">{project.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cliente muito satisfeito</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{project.testimonial}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* About Section */}
        <section
          id="sobre"
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.div variants={fadeInUp}>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                      {t("about.badge")}
                    </Badge>
                  </motion.div>
                  <motion.h2
                    variants={fadeInUp}
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl dark:text-white"
                  >
                    {t("about.title")}
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  >
                    {t("about.description")}
                  </motion.p>
                </div>
                <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Users, text: t("about.team") },
                    { icon: Code, text: t("about.tech") },
                    { icon: Star, text: t("about.quality") },
                    { icon: ArrowRight, text: t("about.delivery") },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <item.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium dark:text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
              <AnimatedSection className="flex items-center justify-center">
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
                  {[
                    { number: "15+", label: t("about.stats.projects") },
                    { number: "100%", label: t("about.stats.clients") },
                    { number: "9", label: t("about.stats.developers") },
                    { number: "2", label: t("about.stats.experience") },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-6 rounded-lg text-center cursor-pointer"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                        className="text-2xl font-bold text-purple-800 dark:text-purple-300"
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contato"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-800 dark:to-purple-900 transition-colors duration-300"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.div variants={fadeInLeft}>
                    <Badge className="bg-white/20 text-white">{t("contact.badge")}</Badge>
                  </motion.div>
                  <motion.h2
                    variants={fadeInLeft}
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white"
                  >
                    {t("contact.title")}
                  </motion.h2>
                  <motion.p
                    variants={fadeInLeft}
                    className="max-w-[600px] text-purple-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                  >
                    {t("contact.description")}
                  </motion.p>
                </div>
                <motion.div variants={staggerContainer} className="space-y-4">
                  {[
                    { icon: Mail, text: "johnny@toastytech.com.br" },
                    { icon: Phone, text: "(13) 99673-8213" },
                    { icon: MapPin, text: "Santos, SP - Brasil" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInLeft}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center space-x-3 text-white cursor-pointer"
                    >
                      <contact.icon className="h-5 w-5" />
                      <span>{contact.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatedSection>
              <AnimatedSection>
                <motion.div variants={fadeInRight}>
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">{t("contact.form.title")}</CardTitle>
                      <CardDescription className="text-purple-100">{t("contact.form.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <motion.div variants={staggerContainer} className="grid gap-4 sm:grid-cols-2">
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-white">
                              {t("contact.form.name")} *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Seu nome completo"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                            />
                          </motion.div>
                          <motion.div variants={fadeInUp} className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-white">
                              {t("contact.form.email")} *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-white">
                            {t("contact.form.company")}
                          </label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Nome da sua empresa"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-white/40"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-white">
                            {t("contact.form.message")} *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Conte-nos sobre seu projeto..."
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 min-h-[100px] focus:border-white/40"
                          />
                        </motion.div>
                        <motion.div variants={fadeInUp} {...scaleOnHover}>
                          <Button type="submit" className="w-full bg-white text-purple-600 hover:bg-purple-50">
                            {t("contact.form.submit")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300"
      >
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
            <Image
              src="/logo2.jpg"
              alt="Toasty Tech Logo"
              width={24}
              height={24}
              className="rounded"
            />
          </motion.div>
          <p className="text-xs text-gray-600 dark:text-gray-400">© 2025 Toasty Tech. {t("footer.rights")}</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400">
              {t("footer.terms")}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400">
              {t("footer.privacy")}
            </Link>
          </motion.div>
        </nav>
      </motion.footer>
    </div>
  )
}

export default function Component() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <LandingPageContent />
      </I18nProvider>
    </ThemeProvider>
  )
}
