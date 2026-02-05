"use client";

import { motion } from "framer-motion";
import { mockResume } from "@/data/mock-resume";
import { ModernTemplate } from "@/components/resume-templates/modern";

const defaultDesign = {
  accentColor: "#2563eb",
  fontFamily: "inter" as const,
  fontSize: "medium" as const,
};

const allVisible = {
  basics: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  languages: true,
  certifications: true,
};

export function ResumePreview() {
  return (
    <section id="resume-example" className="bg-zinc-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900">
            Пример готового резюме
          </h2>
          <p className="text-lg text-zinc-600">
            Так будет выглядеть ваше резюме после заполнения
          </p>
        </div>
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="mx-auto overflow-hidden rounded-lg border bg-white shadow-lg"
            style={{
              maxWidth: "100%",
              width: "327px",
              aspectRatio: "210 / 297",
            }}
          >
            <div
              style={{
                width: "595px",
                minHeight: "842px",
                transform: "scale(0.55)",
                transformOrigin: "top left",
              }}
            >
              <ModernTemplate
                data={mockResume}
                designSettings={defaultDesign}
                sectionVisibility={allVisible}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
