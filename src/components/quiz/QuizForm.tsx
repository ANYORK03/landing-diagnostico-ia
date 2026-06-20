"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useState } from "react";
import { quizQuestions } from "./quizData";
import ProgressBar from "./ProgressBar";
import QuizOptionButton from "./QuizOptionButton";
import QuizResult from "./QuizResult";

type Answers = Record<string, string>;

const QuizForm = forwardRef<HTMLDivElement>(function QuizForm(_, ref) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const totalSteps = quizQuestions.length;
  const isFinished = step >= totalSteps;
  const currentQuestion = quizQuestions[step];

  function handleSelect(value: string) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setStep((s) => s + 1);
  }

  function handleRestart() {
    setAnswers({});
    setStep(0);
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
            Menos de 60 segundos. Solo elige, sin escribir nada.
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10">
          {!isFinished && <ProgressBar current={step + 1} total={totalSteps} />}

          <AnimatePresence mode="wait">
            {!isFinished && currentQuestion ? (
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
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <QuizResult answers={answers} onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
});

export default QuizForm;
