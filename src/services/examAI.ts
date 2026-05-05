import type { ExamQuestion, ExamResult, ExamSession } from '../types/exam.types';
import { allVocabulary } from '../data/lessons';
import { getStoredApiKey } from './storage';

const buildFallbackSections = (): ExamSession['sections'] => ({
  vocabulary: allVocabulary.slice(0, 10).map((word, index): ExamQuestion => ({ id: `v-${word.id}`, section: 'vocabulary', type: 'multiple_choice', prompt: { ru: word.ru, en: `Translate ${word.ru}`, es: `Traduce ${word.ru}` }, options: [word.en, ...allVocabulary.slice(index + 1, index + 4).map((item) => item.en)], correctAnswer: word.en, points: 3 })),
  reading: Array.from({ length: 5 }, (_, index): ExamQuestion => ({ id: `r-${index}`, section: 'reading', type: 'multiple_choice', prompt: { ru: 'Анна живёт в Москве. Утром она пьёт чай и идёт в школу.', en: 'What does Anna drink?', es: 'Que bebe Anna?' }, options: ['tea', 'coffee', 'water', 'juice'], correctAnswer: 'tea', points: 4 })),
  comprehension: Array.from({ length: 5 }, (_, index): ExamQuestion => ({ id: `c-${index}`, section: 'comprehension', type: 'true_false', prompt: { ru: 'Анна живёт в Москве.', en: 'Anna lives in Moscow.', es: 'Anna vive en Moscu.' }, options: ['true', 'false'], correctAnswer: 'true', points: 4 }))
});

export const generateExam = async (userLevel: number, weakAreas: string[], lang: 'en' | 'es'): Promise<ExamSession['sections']> => {
  const fallback = buildFallbackSections();
  const apiKey = getStoredApiKey();
  if (!apiKey) return fallback;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o', temperature: 0.25, messages: [{ role: 'system', content: 'Generate A1 Russian exam JSON only: sections vocabulary[10], reading[5], comprehension[5]. Each question has id, section, type, prompt, options, correctAnswer, points.' }, { role: 'user', content: JSON.stringify({ userLevel, weakAreas, lang }) }] })
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const parsed = JSON.parse(data.choices?.[0]?.message?.content?.trim().replace(/^```json\s*/i, '').replace(/```$/i, '') ?? '{}') as ExamSession['sections'];
    return parsed.vocabulary?.length && parsed.reading?.length && parsed.comprehension?.length ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const gradeExam = async (session: ExamSession, lang: 'en' | 'es'): Promise<ExamResult> => {
  const all = [...session.sections.vocabulary, ...session.sections.reading, ...session.sections.comprehension];
  const earned = all.reduce((sum, question) => sum + (String(session.answers[question.id]).toLowerCase() === String(question.correctAnswer).toLowerCase() ? question.points : 0), 0);
  const total = all.reduce((sum, question) => sum + question.points, 0);
  const totalScore = Math.round((earned / Math.max(total, 1)) * 100);
  return {
    totalScore,
    passed: totalScore >= 60,
    sectionScores: {
      vocabulary: Math.round((session.sections.vocabulary.filter((q) => String(session.answers[q.id]).toLowerCase() === String(q.correctAnswer).toLowerCase()).length / session.sections.vocabulary.length) * 100),
      reading: Math.round((session.sections.reading.filter((q) => String(session.answers[q.id]).toLowerCase() === String(q.correctAnswer).toLowerCase()).length / session.sections.reading.length) * 100),
      comprehension: Math.round((session.sections.comprehension.filter((q) => String(session.answers[q.id]).toLowerCase() === String(q.correctAnswer).toLowerCase()).length / session.sections.comprehension.length) * 100)
    },
    feedback: { en: 'Good exam practice. Review missed vocabulary and repeat reading aloud.', es: 'Buena practica de examen. Repasa vocabulario fallado y lee en voz alta.' },
    weakPoints: all.filter((q) => String(session.answers[q.id]).toLowerCase() !== String(q.correctAnswer).toLowerCase()).slice(0, 5).map((q) => q.prompt.ru ?? q.id),
    certificate: totalScore >= 80
  };
};
