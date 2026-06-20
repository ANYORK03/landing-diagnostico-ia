"use client";

import { useRef } from "react";
import Hero from "@/components/Hero";
import PainSection from "@/components/PainSection";
import TransformationSection from "@/components/TransformationSection";
import QuizForm from "@/components/quiz/QuizForm";
import Footer from "@/components/Footer";

export default function Home() {
  const quizRef = useRef<HTMLDivElement>(null);

  function scrollToQuiz() {
    quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-950">
      <Hero onStart={scrollToQuiz} />
      <PainSection />
      <TransformationSection onStart={scrollToQuiz} />
      <QuizForm ref={quizRef} />
      <Footer onStart={scrollToQuiz} />
    </main>
  );
}
