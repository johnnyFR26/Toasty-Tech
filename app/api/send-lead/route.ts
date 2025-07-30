// app/api/send-lead/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  const { name, email, company, message } = data;

  const content = `📥 **Novo lead recebido**\n
**Nome:** ${name}
**Email:** ${email}
**Empresa:** ${company || 'Não informado'}
**Mensagem:** ${message}`;

  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        thread_name: `Lead de ${company}`,
        content: `📥 **Novo lead recebido**\n
    **Nome:** ${name}
    **Email:** ${email}
    **Empresa:** ${company || 'Não informado'}
    **Mensagem:** ${message}`,
    }),
    });


    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Erro ao enviar lead ao Discord]', error);
    return NextResponse.json({ ok: false, error: 'Falha ao enviar' }, { status: 500 });
  }
}
