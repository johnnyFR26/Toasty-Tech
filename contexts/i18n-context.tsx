"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en" | "fr"

interface Translations {
  [key: string]: {
    pt: string
    en: string
    fr: string
  }
}

const translations: Translations = {
  // Header
  "nav.services": {
    pt: "Serviços",
    en: "Services",
    fr: "Services",
  },
  "nav.projects": {
    pt: "Projetos",
    en: "Projects",
    fr: "Projets",
  },
  "nav.about": {
    pt: "Sobre",
    en: "About",
    fr: "À propos",
  },
  "nav.contact": {
    pt: "Contato",
    en: "Contact",
    fr: "Contact",
  },

  // Hero Section
  "hero.badge": {
    pt: "Softhouse Inovadora",
    en: "Innovative Softhouse",
    fr: "Softhouse Innovante",
  },
  "hero.title": {
    pt: "Soluções Tecnológicas Criativas",
    en: "Creative Technology Solutions",
    fr: "Solutions Technologiques Créatives",
  },
  "hero.description": {
    pt: "Somos uma startup formada por estudantes de programação e profissionais da área, unidos para criar soluções tecnológicas inovadoras e criativas para todos os nossos clientes.",
    en: "We are a startup formed by programming students and industry professionals, united to create innovative and creative technology solutions for all our clients.",
    fr: "Nous sommes une startup formée d'étudiants en programmation et de professionnels du secteur, unis pour créer des solutions technologiques innovantes et créatives pour tous nos clients.",
  },
  "hero.cta.start": {
    pt: "Começar Projeto",
    en: "Start Project",
    fr: "Commencer Projet",
  },
  "hero.cta.view": {
    pt: "Ver Projetos",
    en: "View Projects",
    fr: "Voir Projets",
  },

  // Services Section
  "services.badge": {
    pt: "Nossos Serviços",
    en: "Our Services",
    fr: "Nos Services",
  },
  "services.title": {
    pt: "Planos e Soluções",
    en: "Plans and Solutions",
    fr: "Plans et Solutions",
  },
  "services.description": {
    pt: "Oferecemos soluções completas em tecnologia, desde desenvolvimento web até aplicações móveis e sistemas complexos.",
    en: "We offer complete technology solutions, from web development to mobile applications and complex systems.",
    fr: "Nous offrons des solutions technologiques complètes, du développement web aux applications mobiles et systèmes complexes.",
  },
  "services.trafic.title": {
    pt: "Gestão de Trafego",
    en: "Traffic Management",
    fr: "Gestion du Traffic",
  },
  "services.trafic.description": {
    pt: "Aumente a eficiência e a produtividade do seu negócio com soluções de gerenciamento de trafego.",
    en: "Increase efficiency and productivity of your business with traffic management solutions.",
    fr: "Augmentez l'efficacité et la productivité de votre entreprise avec des solutions de gestion du trafic.",
  },
  "services.web.title": {
    pt: "Desenvolvimento Web",
    en: "Web Development",
    fr: "Développement Web",
  },
  "services.web.description": {
    pt: "Sites e aplicações web modernas, responsivas e otimizadas para performance.",
    en: "Modern, responsive web sites and applications optimized for performance.",
    fr: "Sites et applications web modernes, responsives et optimisés pour la performance.",
  },
  "services.mobile.title": {
    pt: "Aplicativos Mobile",
    en: "Mobile Apps",
    fr: "Applications Mobile",
  },
  "services.mobile.description": {
    pt: "Apps nativos e híbridos para iOS e Android com design intuitivo.",
    en: "Native and hybrid apps for iOS and Android with intuitive design.",
    fr: "Applications natives et hybrides pour iOS et Android avec un design intuitif.",
  },
  "services.systems.title": {
    pt: "Sistemas Complexos",
    en: "Complex Systems",
    fr: "Systèmes Complexes",
  },
  "services.systems.description": {
    pt: "Soluções empresariais robustas com arquitetura escalável.",
    en: "Robust enterprise solutions with scalable architecture.",
    fr: "Solutions d'entreprise robustes avec une architecture évolutive.",
  },
  "services.price.from": {
    pt: "A partir de",
    en: "Starting from",
    fr: "À partir de",
  },
  "services.price.consultation": {
    pt: "Sob Consulta",
    en: "Upon Consultation",
    fr: "Sur Consultation",
  },

  // Projects Section
  "projects.badge": {
    pt: "Portfolio",
    en: "Portfolio",
    fr: "Portfolio",
  },
  "projects.title": {
    pt: "Projetos Realizados",
    en: "Completed Projects",
    fr: "Projets Réalisés",
  },
  "projects.description": {
    pt: "Conheça alguns dos projetos que desenvolvemos para nossos clientes.",
    en: "Learn about some of the projects we developed for our clients.",
    fr: "Découvrez quelques-uns des projets que nous avons développés pour nos clients.",
  },

  // About Section
  "about.badge": {
    pt: "Sobre Nós",
    en: "About Us",
    fr: "À Propos",
  },
  "about.title": {
    pt: "Jovens Talentos, Soluções Maduras",
    en: "Young Talents, Mature Solutions",
    fr: "Jeunes Talents, Solutions Matures",
  },
  "about.description": {
    pt: "A Toasty Tech nasceu da união entre estudantes apaixonados por tecnologia e profissionais experientes da área. Combinamos a energia e criatividade da nova geração com a experiência e conhecimento técnico consolidado.",
    en: "Toasty Tech was born from the union between students passionate about technology and experienced professionals in the field. We combine the energy and creativity of the new generation with consolidated experience and technical knowledge.",
    fr: "Toasty Tech est née de l'union entre des étudiants passionnés de technologie et des professionnels expérimentés du domaine. Nous combinons l'énergie et la créativité de la nouvelle génération avec l'expérience et les connaissances techniques consolidées.",
  },
  "about.team": {
    pt: "Time Multidisciplinar",
    en: "Multidisciplinary Team",
    fr: "Équipe Multidisciplinaire",
  },
  "about.tech": {
    pt: "Tecnologias Modernas",
    en: "Modern Technologies",
    fr: "Technologies Modernes",
  },
  "about.quality": {
    pt: "Qualidade Garantida",
    en: "Quality Guaranteed",
    fr: "Qualité Garantie",
  },
  "about.delivery": {
    pt: "Entrega Ágil",
    en: "Agile Delivery",
    fr: "Livraison Agile",
  },
  "about.stats.projects": {
    pt: "Projetos Entregues",
    en: "Delivered Projects",
    fr: "Projets Livrés",
  },
  "about.stats.clients": {
    pt: "Clientes Satisfeitos",
    en: "Satisfied Clients",
    fr: "Clients Satisfaits",
  },
  "about.stats.developers": {
    pt: "Desenvolvedores",
    en: "Developers",
    fr: "Développeurs",
  },
  "about.stats.experience": {
    pt: "Anos de Experiência",
    en: "Years of Experience",
    fr: "Années d'Expérience",
  },

  // Contact Section
  "contact.badge": {
    pt: "Entre em Contato",
    en: "Get in Touch",
    fr: "Contactez-nous",
  },
  "contact.title": {
    pt: "Vamos Criar Algo Incrível Juntos",
    en: "Let's Create Something Amazing Together",
    fr: "Créons Quelque Chose d'Incroyable Ensemble",
  },
  "contact.description": {
    pt: "Conte-nos sobre seu projeto e descubra como podemos transformar suas ideias em realidade digital.",
    en: "Tell us about your project and discover how we can transform your ideas into digital reality.",
    fr: "Parlez-nous de votre projet et découvrez comment nous pouvons transformer vos idées en réalité numérique.",
  },
  "contact.form.title": {
    pt: "Solicite um Orçamento",
    en: "Request a Quote",
    fr: "Demander un Devis",
  },
  "contact.form.description": {
    pt: "Preencha o formulário e entraremos em contato em até 24 horas.",
    en: "Fill out the form and we will contact you within 24 hours.",
    fr: "Remplissez le formulaire et nous vous contacterons dans les 24 heures.",
  },
  "contact.form.name": {
    pt: "Nome",
    en: "Name",
    fr: "Nom",
  },
  "contact.form.email": {
    pt: "Email",
    en: "Email",
    fr: "Email",
  },
  "contact.form.company": {
    pt: "Empresa",
    en: "Company",
    fr: "Entreprise",
  },
  "contact.form.message": {
    pt: "Mensagem",
    en: "Message",
    fr: "Message",
  },
  "contact.form.submit": {
    pt: "Enviar Mensagem",
    en: "Send Message",
    fr: "Envoyer Message",
  },
  "contact.form.success": {
    pt: "Obrigado pelo seu interesse! Entraremos em contato em breve.",
    en: "Thank you for your interest! We will contact you soon.",
    fr: "Merci pour votre intérêt ! Nous vous contacterons bientôt.",
  },

  // Footer
  "footer.rights": {
    pt: "Todos os direitos reservados.",
    en: "All rights reserved.",
    fr: "Tous droits réservés.",
  },
  "footer.terms": {
    pt: "Termos de Serviço",
    en: "Terms of Service",
    fr: "Conditions de Service",
  },
  "footer.privacy": {
    pt: "Política de Privacidade",
    en: "Privacy Policy",
    fr: "Politique de Confidentialité",
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
