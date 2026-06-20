"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { quizQuestions } from "./quizData";
import ProgressBar from "./ProgressBar";
import QuizOptionButton from "./QuizOptionButton";
import QuizResult from "./QuizResult";
import NameStep from "./NameStep";
import { trackEvent } from "@/lib/analytics";

type Answers = Record<string, string>;

const QuizForm = forwardRef<HTMLDivElement>(function QuizForm(_, ref) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [name, setName] = useState<string | null>(null);

  const totalSteps = quizQuestions.length;
  const onNameStep = step === totalSteps && name === null;
  const isFinished = step >= totalSteps && name !== null;
  const currentQuestion = quizQuestions[step];

  function handleSelect(value: string) {
    if (!currentQuestion) return;
    if (step === 0) {
      trackEvent("diagnostico_iniciado");
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setStep((s) => s + 1);
  }

  function handleRestart() {
    setAnswers({});
    setName(null);
    setStep(0);
  }

  function handleNameSubmit(value: string) {
    setName(value);
    trackEvent("diagnostico_completado", {
      area: answers.area,
      negocio: answers.negocio,
      inversion: answers.inversion,
    });
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: value, answers }),
    }).catch(() => {});
  }

  return (
    <section
      ref={ref}
      id="diagnostico"
      className="px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">
            Diagnóstico de Negocios IA
          </h2>
          <p className="mt-3 text-zinc-400">
            Menos de 60 segundos. Solo elige y al final tu nombre.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10">
          {!isFinished && (
            <ProgressBar
              current={Math.min(step + 1, totalSteps + 1)}
              total={totalSteps + 1}
            />
          )}

          <AnimatePresence mode="wait">
            {currentQuestion && step < totalSteps ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 className="text-balance mb-6 text-xl font-semibold text-white sm:text-2xl">
                  {currentQuestion.question}
                </h3>
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((option) => (
                    <QuizOptionButton
                      key={option.value}
                      label={option.label}
                      onClick={() => handleSelect(option.value)}
                    />
                  ))}
                </div>
              </motion.div>
            ) : onNameStep ? (
              <motion.div
                key="name"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <NameStep onSubmit={handleNameSubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <QuizResult
                  answers={answers}
                  name={name ?? "Sin nombre"}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

export default QuizForm;
