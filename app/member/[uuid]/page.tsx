import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getMemberByUuid, mockMembers } from "@/lib/mock-members"
import { MemberProfileContent, MemberNotFound } from "./member-profile-content"

// Gera as rotas estáticas para todos os membros (melhor SEO e performance)
export async function generateStaticParams() {
  return mockMembers.map((member) => ({
    uuid: member.uuid,
  }))
}

// Gera metadata dinâmica para cada membro (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>
}): Promise<Metadata> {
  const { uuid } = await params
  const member = getMemberByUuid(uuid)

  if (!member) {
    return {
      title: "Membro não encontrado | Toasty Tech",
      description: "O membro que você está procurando não foi encontrado.",
    }
  }

  const skillsText = member.skills?.slice(0, 5).join(", ") || ""
  const description = member.bio
    ? `${member.bio.slice(0, 150)}...`
    : `${member.name} é ${member.position} na Toasty Tech. ${skillsText ? `Especialidades: ${skillsText}.` : ""}`

  return {
    title: `${member.name} - ${member.position} | Toasty Tech`,
    description,
    keywords: [
      member.name,
      member.position,
      "Toasty Tech",
      "desenvolvedor",
      "tecnologia",
      "software",
      ...(member.skills || []),
    ],
    authors: [{ name: member.name }],
    openGraph: {
      title: `${member.name} - ${member.position}`,
      description,
      type: "profile",
      firstName: member.name.split(" ")[0],
      lastName: member.name.split(" ").slice(1).join(" "),
      images: member.photo
        ? [
            {
              url: member.photo.startsWith("http") ? member.photo : `https://toastytech.com.br${member.photo}`,
              width: 400,
              height: 400,
              alt: `Foto de ${member.name}`,
            },
          ]
        : [],
      siteName: "Toasty Tech",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary",
      title: `${member.name} - ${member.position}`,
      description,
      images: member.photo
        ? [member.photo.startsWith("http") ? member.photo : `https://toastytech.com.br${member.photo}`]
        : [],
    },
    alternates: {
      canonical: `https://toastytech.com.br/member/${member.uuid}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

// JSON-LD structured data para SEO
function generateJsonLd(member: NonNullable<ReturnType<typeof getMemberByUuid>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.position,
    email: member.email,
    telephone: member.phone,
    image: member.photo?.startsWith("http") ? member.photo : `https://toastytech.com.br${member.photo}`,
    description: member.bio,
    worksFor: {
      "@type": "Organization",
      name: "Toasty Tech",
      url: "https://toastytech.com.br",
    },
    knowsAbout: member.skills,
    sameAs: [
      member.social?.linkedin,
      member.social?.github,
      member.social?.twitter,
      member.social?.instagram,
      member.social?.custom,
    ].filter(Boolean),
  }
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
  const member = getMemberByUuid(uuid)

  if (!member) {
    return <MemberNotFound />
  }

  const jsonLd = generateJsonLd(member)

  // Serializa a data para passar ao Client Component
  const serializedMember = {
    ...member,
    joinedAt: member.joinedAt.toISOString(),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MemberProfileContent member={serializedMember} />
    </>
  )
}
