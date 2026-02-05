import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

type Section =
  | "basics"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "certifications";

function getSystemPrompt(section: Section, targetPosition: string): string {
  const base = `Ты — HR-эксперт по составлению резюме. Помогаешь кандидату на должность "${targetPosition}". Отвечай ТОЛЬКО на русском. Будь конкретным и лаконичным.`;

  const sectionPrompts: Record<Section, string> = {
    basics: `${base}\nПредложи профессиональный заголовок/должность для резюме. Дай 2-3 варианта через перенос строки. Без нумерации, просто варианты.`,
    summary: `${base}\nНапиши краткое профессиональное резюме (3-4 предложения). Начни с текущей роли и опыта, упомяни ключевые достижения и навыки, заверши карьерными целями.`,
    experience: `${base}\nУлучши описание опыта работы. Используй активные глаголы и конкретные метрики (%, числа, сроки). Формат: буллет-поинты, каждый начинается с "•". Не более 4-5 пунктов.`,
    education: `${base}\nПредложи релевантные достижения, курсы или активности для раздела образования. Формат: буллет-поинты через "•". Не более 3 пунктов.`,
    skills: `${base}\nПредложи 5-7 релевантных навыков для данной позиции. Формат: навыки через запятую, без нумерации. Указывай конкретные технологии и инструменты.`,
    projects: `${base}\nУлучши описание проекта. Укажи цель, технологии, результат. Формат: 2-3 предложения. Используй активные глаголы и метрики.`,
    languages: `${base}\nПорекомендуй языки, которые будут ценными для данной позиции. Формат: язык — причина ценности. Не более 3 рекомендаций.`,
    certifications: `${base}\nПредложи релевантные сертификации для данной позиции. Формат: название — организация. Не более 4 рекомендаций.`,
  };

  return sectionPrompts[section];
}

function getUserPrompt(section: Section, context: Record<string, unknown>): string {
  switch (section) {
    case "basics":
      return `Имя: ${context.name || "не указано"}\nТекущая должность: ${context.currentTitle || "не указана"}`;
    case "summary":
      return `Текущее резюме: ${context.currentSummary || "пусто"}\nОпыт: ${context.positions || "не указан"}\nНавыки: ${context.skills || "не указаны"}`;
    case "experience":
      return `Компания: ${context.company || "не указана"}\nДолжность: ${context.position || "не указана"}\nТекущее описание: ${context.currentDescription || "пусто"}`;
    case "education":
      return `Учебное заведение: ${context.institution || "не указано"}\nСтепень: ${context.degree || "не указана"}\nТекущее описание: ${context.currentDescription || "пусто"}`;
    case "skills":
      return `Текущие навыки: ${context.currentSkills || "пусто"}\nКатегория: ${context.category || "не указана"}`;
    case "projects":
      return `Проект: ${context.name || "не указан"}\nТехнологии: ${context.technologies || "не указаны"}\nТекущее описание: ${context.description || "пусто"}`;
    case "languages":
      return `Текущие языки: ${context.currentLanguages || "не указаны"}`;
    case "certifications":
      return `Текущие сертификаты: ${context.currentCerts || "не указаны"}`;
    default:
      return "";
  }
}

export async function POST(req: Request) {
  try {
    const { section, context, targetPosition } = (await req.json()) as {
      section: Section;
      context: Record<string, unknown>;
      targetPosition: string;
    };

    if (!targetPosition) {
      return new Response(
        JSON.stringify({ error: "Укажите желаемую должность" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = getSystemPrompt(section, targetPosition);
    const userPrompt = getUserPrompt(section, context);

    const result = streamText({
      model: openrouter("deepseek/deepseek-chat"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: "Не удалось получить предложение" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
