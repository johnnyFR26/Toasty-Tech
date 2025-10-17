import { Member } from './../types/member';

export const mockMembers: Member[] = [
  {
    uuid: "550e8400-e29b-41d4-a716-446655440001",
    name: "Johnny Rabelo",
    email: "johnny@toastytech.com",
    phone: "+55 13 99673-8213",
    photo: "/placeholder-user.jpg",
    position: "CEO & Full cycle Developer",
    bio: "Fundador da Toasty Tech, apaixonado por criar soluções inovadoras que transformam negócios. Especialista em desenvolvimento web e mobile com foco em aplicações escaláveis.",
    projects: ["1", "2", "4"],
    joinedAt: new Date("2023-01-15"),
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Angular", "Microserviços", "Go"],
    social: {
      linkedin: "https://linkedin.com/in/johnnyfr26",
      github: "https://github.com/johnnyfr26",
    },
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440002",
    name: "Ana Silva",
    email: "ana@toastytech.com",
    phone: "+55 11 98765-4321",
    photo: "/placeholder-user.jpg",
    position: "Frontend Developer",
    bio: "Desenvolvedora frontend especializada em criar interfaces modernas e responsivas. Focada em performance e acessibilidade.",
    projects: ["1", "3", "5"],
    joinedAt: new Date("2023-03-20"),
    skills: ["React", "Vue.js", "CSS", "Tailwind", "Figma"],
    social: {
      linkedin: "https://linkedin.com/in/anasilva",
      github: "https://github.com/anasilva",
    },
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440003",
    name: "Carlos Santos",
    email: "carlos@toastytech.com",
    phone: "+55 21 97654-3210",
    photo: "/placeholder-user.jpg",
    position: "Backend Developer",
    bio: "Especialista em arquitetura de sistemas e APIs escaláveis. Experiência em cloud computing e DevOps.",
    projects: ["2", "4", "8"],
    joinedAt: new Date("2023-05-10"),
    skills: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    social: {
      linkedin: "https://linkedin.com/in/carlossantos",
      github: "https://github.com/carlossantos",
    },
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440004",
    name: "Juliana Costa",
    email: "juliana@toastytech.com",
    phone: "+55 31 96543-2109",
    photo: "/placeholder-user.jpg",
    position: "UI/UX Designer",
    bio: "Designer focada em criar experiências digitais memoráveis. Especialista em design systems e prototipagem.",
    projects: ["1", "4", "5", "7"],
    joinedAt: new Date("2023-07-01"),
    skills: ["Figma", "Adobe XD", "Sketch", "Design Systems", "User Research"],
    social: {
      linkedin: "https://linkedin.com/in/julianacosta",
    },
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440005",
    name: "Pedro Oliveira",
    email: "pedro@toastytech.com",
    phone: "+55 41 95432-1098",
    photo: "/placeholder-user.jpg",
    position: "Mobile Developer",
    bio: "Desenvolvedor mobile com expertise em React Native e Flutter. Apaixonado por criar apps performáticos.",
    projects: ["4"],
    joinedAt: new Date("2023-09-15"),
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    social: {
      linkedin: "https://linkedin.com/in/pedrooliveira",
      github: "https://github.com/pedrooliveira",
    },
  },
  {
    uuid: "550e8400-e29b-41d4-a716-446655440006",
    name: "Mariana Ferreira",
    email: "mariana@toastytech.com",
    phone: "+55 51 94321-0987",
    photo: "/placeholder-user.jpg",
    position: "Project Manager",
    bio: "Gerente de projetos com foco em metodologias ágeis. Especialista em coordenar equipes e entregar resultados.",
    projects: ["2", "3", "8"],
    joinedAt: new Date("2023-11-01"),
    skills: ["Scrum", "Kanban", "Jira", "Gestão de Equipes", "Comunicação"],
    social: {
      linkedin: "https://linkedin.com/in/marianaferreira",
    },
  },
]

export function getMemberByUuid(uuid: string): Member | undefined {
  return mockMembers.find((member) => member.uuid === uuid)
}
