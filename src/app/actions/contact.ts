"use server";

import { SITE_CONTACT_FORM_TO, SITE_NAME } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  message: string;
};

async function sendViaResend(name: string, phone: string, message: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM?.trim() ?? "AutoMentés <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: SITE_CONTACT_FORM_TO,
    subject: `${SITE_NAME} — új kapcsolatfelvétel: ${name}`,
    text: [
      `Új üzenet a ${SITE_NAME} weboldalról`,
      "",
      `Név: ${name}`,
      `Telefon: ${phone}`,
      "",
      "Üzenet:",
      message,
    ].join("\n"),
  });

  if (error) throw new Error(error.message);
  return true;
}

async function sendViaWeb3Forms(name: string, phone: string, message: string) {
  const key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!key) return null;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      name,
      phone,
      message,
      subject: `${SITE_NAME} — új üzenet`,
      from_name: name,
      botcheck: false,
    }),
  });

  const data = (await res.json()) as { success?: boolean };
  if (!res.ok || !data.success) throw new Error("Web3Forms hiba");
  return true;
}

async function sendViaFormSubmit(name: string, phone: string, message: string) {
  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(SITE_CONTACT_FORM_TO)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: process.env.NEXT_PUBLIC_SITE_URL ?? "https://automentes.vercel.app",
        Referer: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://automentes.vercel.app"}/`,
      },
      body: JSON.stringify({
        name,
        phone,
        message,
        _subject: `${SITE_NAME} — új kapcsolatfelvétel`,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const data = (await res.json()) as { success?: string | boolean; message?: string };
  const ok = data.success === true || data.success === "true";
  if (!res.ok || !ok) {
    if (data.message?.toLowerCase().includes("activation")) {
      throw new Error("FORM_ACTIVATION_REQUIRED");
    }
    throw new Error(data.message ?? "FormSubmit hiba");
  }
  return true;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !message) {
    return { ok: false, message: "Minden mező kitöltése kötelező." };
  }

  try {
    const sent =
      (await sendViaResend(name, phone, message)) ??
      (await sendViaWeb3Forms(name, phone, message)) ??
      (await sendViaFormSubmit(name, phone, message));

    if (!sent) {
      return {
        ok: false,
        message: "Az üzenetküldés nincs konfigurálva. Kérjük, hívjon minket telefonon!",
      };
    }

    return { ok: true, message: "Megkaptuk az üzenetet — hamarosan visszajelzünk." };
  } catch (err) {
    if (err instanceof Error && err.message === "FORM_ACTIVATION_REQUIRED") {
      return {
        ok: false,
        message: "Az üzenetküldés még aktiválásra vár. Kérjük, hívjon minket telefonon!",
      };
    }
    return {
      ok: false,
      message: "Nem sikerült elküldeni. Próbálja újra, vagy hívjon minket!",
    };
  }
}
