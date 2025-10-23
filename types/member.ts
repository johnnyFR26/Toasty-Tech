export interface Member {
  uuid: string
  name: string
  email: string
  phone: string
  photo: string
  position: string
  bio?: string
  projects: string[] // Array of project IDs
  joinedAt: Date
  skills?: string[]
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
    instagram?: string
    facebook?: string
    custom?: string
  }
}
