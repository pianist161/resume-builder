"use client";

import { Layout, Eye, FileDown, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Layout,
    title: "4 шаблона",
    description:
      "Выберите из Modern, Professional, Creative или Classic шаблона — каждый с уникальным дизайном.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description:
      "Мгновенно видите изменения в реальном времени. Редактируйте слева — результат отображается справа.",
  },
  {
    icon: FileDown,
    title: "Экспорт в PDF",
    description:
      "Скачайте готовое резюме в формате PDF или JSON одним кликом. Формат A4, готовый к печати.",
  },
  {
    icon: GripVertical,
    title: "Drag & Drop",
    description:
      "Перетаскивайте секции резюме для изменения порядка. Полный контроль над структурой документа.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Features() {
  return (
    <section className="border-t bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-zinc-900">
            Всё что нужно для идеального резюме
          </h2>
          <p className="text-lg text-zinc-600">
            Мощные инструменты для создания резюме, которое выделит вас
          </p>
        </div>
        <motion.div
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3">
                <feature.icon className="size-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
