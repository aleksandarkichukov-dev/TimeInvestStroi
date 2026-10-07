import nodemailer from "nodemailer";
import { quoteSteps, type QuotePayload } from "@/content/quote";
import { site } from "@/content/site";

// Приема запитване за оферта и го изпраща по имейл на office@timeinveststroy.com.
// Изпращане: MAIL_TRANSPORT=sendmail (през пощенския сървър на хостинга, без парола)
// или SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS. По избор: MAIL_FROM, MAIL_TO
// (по подразбиране site.email). Виж .env.example.

const recent = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > LIMIT;
}

const esc = (v: string) => v.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const bad = (error: string, status = 400) => Response.json({ error }, { status });

export async function POST(request: Request) {
  let body: Partial<QuotePayload>;
  try {
    body = await request.json();
  } catch {
    return bad("Невалидна заявка.");
  }

  // Капан за ботове: скритото поле е попълнено или формата е изпратена прекалено бързо.
  // Отговаряме „успешно“, за да не подсказваме на бота, но не изпращаме нищо.
  const tooFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < 3000;
  if (clip(body.website, 200) || tooFast) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return bad("Твърде много запитвания. Моля, опитайте по-късно или ни се обадете.", 429);

  const data = {
    type: clip(body.type, 80),
    area: clip(body.area, 80),
    stage: clip(body.stage, 80),
    timeline: clip(body.timeline, 80),
    name: clip(body.name, 80),
    phone: clip(body.phone, 30),
    email: clip(body.email, 120),
    location: clip(body.location, 120),
    message: clip(body.message, 3000),
  };

  if (data.name.length < 2) return bad("Моля, въведете име.");
  if (!/^[0-9+()\s-]{6,20}$/.test(data.phone)) return bad("Моля, въведете валиден телефон.");
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return bad("Моля, въведете валиден имейл.");
  if (body.consent !== true) return bad("Моля, потвърдете съгласието за обработка на данните.");
  for (const q of quoteSteps) {
    const value = data[q.id];
    if (value && !(q.options as readonly string[]).includes(value)) return bad("Невалиден избор във формата.");
  }

  const rows: [string, string][] = [
    ["Вид проект", data.type],
    ["Площ", data.area],
    ["Етап", data.stage],
    ["Срок", data.timeline],
    ["Име", data.name],
    ["Телефон", data.phone],
    ["Имейл", data.email],
    ["Обект", data.location],
    ["Съобщение", data.message],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");
  const html = `<h2>Ново запитване за оферта</h2><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${esc(v || "—").replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const { MAIL_TRANSPORT, SENDMAIL_PATH, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  const useSendmail = MAIL_TRANSPORT === "sendmail";
  if (!useSendmail && (!SMTP_HOST || !SMTP_USER || !SMTP_PASS)) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[оферта] изпращането не е настроено; запитването не е изпратено:\n" + text);
      return Response.json({ ok: true, dev: true });
    }
    console.error("[оферта] липсва MAIL_TRANSPORT=sendmail или SMTP_HOST / SMTP_USER / SMTP_PASS");
    return bad("Формата временно не работи.", 500);
  }

  try {
    const port = Number(SMTP_PORT || 465);
    const transport = useSendmail
      ? nodemailer.createTransport({ sendmail: true, newline: "unix", path: SENDMAIL_PATH || "/usr/sbin/sendmail" })
      : nodemailer.createTransport({
          host: SMTP_HOST,
          port,
          secure: port === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
    await transport.sendMail({
      from: MAIL_FROM || `"${site.name} – сайт" <${SMTP_USER || site.email}>`,
      to: MAIL_TO || site.email,
      replyTo: data.email || undefined,
      subject: `Запитване за оферта: ${data.type || "проект"} – ${data.name}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[оферта] грешка при изпращане", err);
    return bad("Не успяхме да изпратим запитването.", 502);
  }
}
