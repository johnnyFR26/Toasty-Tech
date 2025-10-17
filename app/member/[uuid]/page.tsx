"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { getMemberByUuid } from "@/lib/mock-members"
import { mockProjects } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, Briefcase, Github, Linkedin, Twitter, ArrowLeft } from "lucide-react"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeToggle } from "@/components/theme-toggle"

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

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function MemberProfileContent() {
  const params = useParams()
  const uuid = params.uuid as string
  const member = getMemberByUuid(uuid)

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Membro não encontrado</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            O membro que você está procurando não existe ou foi removido.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  const memberProjects = mockProjects.filter((project) => member.projects.includes(project.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </motion.header>

      <main className="relative">
        <div className="container px-4 md:px-6 mx-auto py-12">
          {/* Profile Header */}
          <motion.div initial="initial" animate="animate" variants={staggerContainer} className="max-w-5xl mx-auto">
            <Card className="border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-800"></div>
              <CardContent className="relative pt-0 pb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
                  {/* Profile Photo */}
                  <motion.div variants={fadeInUp} className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-xl">
                      <Image
                        src={member.photo || "/placeholder.svg"}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </motion.div>

                  {/* Name and Position */}
                  <motion.div variants={fadeInUp} className="flex-1 md:mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h1>
                    <p className="text-xl text-purple-600 dark:text-purple-400 font-medium mb-4">{member.position}</p>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${member.email}`} className="hover:text-purple-600 dark:hover:text-purple-400">
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${member.phone}`} className="hover:text-purple-600 dark:hover:text-purple-400">
                          {member.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Desde {member.joinedAt.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  {member.social && (
                    <motion.div variants={fadeInUp} className="flex gap-2 md:mb-4">
                      {member.social.linkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social.github && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {member.social.twitter && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bio Section */}
            {member.bio && (
              <motion.div variants={fadeInUp} className="mt-8">
                <Card className="border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Sobre</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Skills Section */}
            {member.skills && member.skills.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-8">
                <Card className="border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Habilidades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Projects Section */}
            {memberProjects.length > 0 && (
              <motion.div variants={fadeInUp} className="mt-8">
                <Card className="border-purple-200 dark:border-purple-800 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Briefcase className="h-5 w-5" />
                      Projetos
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Projetos em que {member.name.split(" ")[0]} está trabalhando
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {memberProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="border-purple-100 dark:border-purple-900 hover:shadow-lg dark:hover:shadow-purple-500/25 transition-all duration-300">
                            <CardHeader>
                              <CardTitle className="text-lg dark:text-white flex items-center justify-between">
                                {project.name}
                                <Badge
                                  variant="secondary"
                                  className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
                                >
                                  {project.status}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="dark:text-gray-300">{project.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
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
            <Image src="/logo2.jpg" alt="Toasty Tech Logo" width={24} height={24} className="rounded" />
          </motion.div>
          <p className="text-xs text-gray-600 dark:text-gray-400">© 2025 Toasty Tech. Todos os direitos reservados.</p>
        </div>
      </motion.footer>
    </div>
  )
}

export default function MemberProfilePage() {
  return (
    <ThemeProvider>
      <MemberProfileContent />
    </ThemeProvider>
  )
}
