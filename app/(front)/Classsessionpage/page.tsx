"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

async function submitAnswerToDB({
  sessionId,
  questionId,
  studentName,
  answer,
  isCorrect,
}) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        session_id: sessionId,
        question_id: questionId,
        student_name: studentName,
        selected_answer: answer,
        is_correct: isCorrect,
        submitted_at: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(
      "[LearnLab] DB submission failed (offline fallback):",
      err.message,
    );
    return null;
  }
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SESSION = {
  id: "session-fractions-001",
  title: "Introduction to Fractions",
  subject: "Mathematics",
  tutor: "Ms. Johnson",
  studentCount: 12,
  streamUrl: null,
  studySummary:
    "Read each slide like a mini lesson, then use the quiz to check what you remember.",
  studyGoals: [
    "Understand the numerator and denominator.",
    "Compare fractions using common denominators.",
    "Review the explanation after each answer.",
  ],
  slides: [
    {
      id: 1,
      icon: "🔢",
      title: "What is a Fraction?",
      body: "A fraction represents a part of a whole. It has two parts: the numerator (top) and the denominator (bottom).",
      formula: "numerator ÷ denominator",
    },
    {
      id: 2,
      icon: "📊",
      title: "Types of Fractions",
      body: "Proper fractions (½), improper fractions (5/3), and mixed numbers (1½) are the three main types.",
      formula: null,
    },
    {
      id: 3,
      icon: "🔄",
      title: "Equivalent Fractions",
      body: "Fractions that represent the same value. Multiply or divide both parts by the same number.",
      formula: "½ = 2/4 = 4/8",
    },
    {
      id: 4,
      icon: "➕",
      title: "Adding Fractions",
      body: "Same denominators: add the numerators. Different denominators: find the lowest common denominator first.",
      formula: "¼ + ¼ = 2/4 = ½",
    },
    {
      id: 5,
      icon: "⚖️",
      title: "Comparing Fractions",
      body: "Convert fractions to a common denominator, then compare numerators to find which is larger.",
      formula: "½ > ⅓  →  3/6 > 2/6",
    },
  ],
};

const QUESTIONS = [
  {
    id: "q1",
    text: "What is the numerator in the fraction ¾?",
    options: ["2", "3", "4", "1"],
    correct: 1,
    explanation:
      "The numerator is the top number of a fraction. In ¾, the number 3 sits on top.",
  },
  {
    id: "q2",
    text: "Which fraction is equal to one half?",
    options: ["2/3", "3/4", "4/8", "5/8"],
    correct: 2,
    explanation:
      "4/8 simplifies to ½ — divide both numerator and denominator by 4.",
  },
  {
    id: "q3",
    text: "What is ¼ + ¼?",
    options: ["½", "¼", "2/8", "1/3"],
    correct: 0,
    explanation:
      "Same denominators means just add numerators: 1+1=2, giving 2/4 which simplifies to ½.",
  },
  {
    id: "q4",
    text: "Which fraction is the largest?",
    options: ["1/3", "2/5", "3/8", "1/2"],
    correct: 3,
    explanation: "½=0.5 is greater than 2/5=0.4, 3/8=0.375, and 1/3≈0.33.",
  },
  {
    id: "q5",
    text: "What is my Tribe?",
    options: ["Munyakole", "Rwandese", "Muganda", "Acholi"],
    correct: 2,
    explanation:
      "Muganda — a custom question set by the tutor to personalise the session.",
  },
];

// ─── BREAKPOINT HOOK ──────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    isMobile: w < 768,
    isTablet: w >= 768 && w < 1024,
    isDesktop: w >= 1024,
  };
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const map = {
    success: { bg: "#f0fdf4", border: "#86efac", color: "#166534", icon: "✓" },
    error: { bg: "#fef2f2", border: "#fecaca", color: "#991b1b", icon: "✗" },
    info: { bg: "#eff6ff", border: "#bfdbfe", color: "#1e40af", icon: "i" },
  };
  const s = map[toast.type] || map.info;
  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 12,
        padding: "11px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        animation: "slideRight .3s ease",
        fontFamily: "'DM Sans',sans-serif",
        maxWidth: 300,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>
        {s.icon}
      </span>
      <span
        style={{
          fontSize: 13,
          color: s.color,
          fontWeight: 500,
          lineHeight: 1.4,
        }}
      >
        {toast.message}
      </span>
    </div>
  );
}

// ─── SLIDE PANEL ─────────────────────────────────────────────────────────────
function SlidePanel({ session, slide, setSlide, isMobile, isTablet }) {
  const s = session.slides[slide];
  const total = session.slides.length;

  return (
    <div
      style={
        isMobile
          ? {
              position: "sticky",
              top: 56,
              zIndex: 50,
              background: "#1E293B",
              borderBottom: "1px solid #334155",
              flexShrink: 0,
            }
          : {
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }
      }
    >
      {/* Header */}
      <div
        style={{
          background: "#1E293B",
          padding: isMobile ? "10px 16px" : "13px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: isMobile ? 0 : "16px 16px 0 0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#EF4444",
              animation: "pulseLive 1.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              color: "#fff",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 700,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            LIVE · {session.tutor}
          </span>
          <span
            style={{
              background: "#EF444422",
              color: "#FCA5A5",
              borderRadius: 6,
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            {session.subject}
          </span>
        </div>
        <span
          style={{
            color: "#64748B",
            fontSize: 11,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          👁 {session.studentCount}
        </span>
      </div>

      {/* Slide content */}
      {isMobile ? (
        <div
          style={{
            background: "#0F172A",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#F1F5F9",
                fontFamily: "'DM Serif Display',serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {s.title}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#94A3B8",
                marginTop: 2,
                fontFamily: "'DM Sans',sans-serif",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {s.body}
            </div>
          </div>
          {s.formula && (
            <div
              style={{
                background: "#1E3A5F",
                color: "#93C5FD",
                borderRadius: 8,
                padding: "5px 10px",
                fontFamily: "monospace",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              {s.formula}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            background: "linear-gradient(160deg,#F8FAFF,#EEF2FF)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isTablet ? 24 : 36,
            textAlign: "center",
            minHeight: isTablet ? 220 : 280,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "#2563EB",
              color: "#fff",
              borderRadius: 7,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            SLIDE {slide + 1} / {total}
          </div>
          <div style={{ fontSize: isTablet ? 36 : 48, marginBottom: 14 }}>
            {s.icon}
          </div>
          <h2
            style={{
              fontSize: isTablet ? 17 : 21,
              fontWeight: 700,
              color: "#1E293B",
              marginBottom: 10,
              fontFamily: "'DM Serif Display',serif",
              lineHeight: 1.3,
            }}
          >
            {s.title}
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#475569",
              lineHeight: 1.7,
              maxWidth: 420,
              fontFamily: "'DM Sans',sans-serif",
              marginBottom: s.formula ? 16 : 0,
            }}
          >
            {s.body}
          </p>
          {s.formula && (
            <div
              style={{
                background: "#1E293B",
                color: "#93C5FD",
                borderRadius: 10,
                padding: "9px 20px",
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              {s.formula}
            </div>
          )}
        </div>
      )}

      {/* Nav */}
      <div
        style={{
          background: isMobile ? "#0F172A" : "#F8FAFC",
          padding: isMobile ? "8px 16px" : "11px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${isMobile ? "#1E293B" : "#E2E8F0"}`,
        }}
      >
        <button
          onClick={() => setSlide(Math.max(0, slide - 1))}
          disabled={slide === 0}
          style={{
            background: "none",
            border: `1px solid ${isMobile ? "#334155" : "#E2E8F0"}`,
            borderRadius: 7,
            padding: "5px 12px",
            fontSize: 11,
            color: isMobile ? "#94A3B8" : "#64748B",
            cursor: slide === 0 ? "not-allowed" : "pointer",
            opacity: slide === 0 ? 0.4 : 1,
            fontWeight: 600,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          ← Prev
        </button>

        <div style={{ display: "flex", gap: 5 }}>
          {session.slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i === slide ? "#2563EB" : isMobile ? "#334155" : "#CBD5E1",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setSlide(Math.min(total - 1, slide + 1))}
          disabled={slide === total - 1}
          style={{
            background: "none",
            border: `1px solid ${isMobile ? "#334155" : "#E2E8F0"}`,
            borderRadius: 7,
            padding: "5px 12px",
            fontSize: 11,
            color: isMobile ? "#94A3B8" : "#64748B",
            cursor: slide === total - 1 ? "not-allowed" : "pointer",
            opacity: slide === total - 1 ? 0.4 : 1,
            fontWeight: 600,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── OPTION ITEM ──────────────────────────────────────────────────────────────
function OptionItem({
  label,
  text,
  index,
  isSelected,
  isCorrect,
  isWrong,
  isSubmitted,
  onSelect,
}) {
  const getBorder = () =>
    isCorrect
      ? "#22C55E"
      : isWrong
        ? "#EF4444"
        : isSelected
          ? "#2563EB"
          : "#D1D5DB";
  const getBg = () =>
    isCorrect
      ? "#F0FDF4"
      : isWrong
        ? "#FEF2F2"
        : isSelected
          ? "#EFF6FF"
          : "#fff";
  const getDot = () =>
    isCorrect
      ? "#22C55E"
      : isWrong
        ? "#EF4444"
        : isSelected
          ? "#2563EB"
          : "transparent";
  const getTxt = () =>
    isCorrect
      ? "#166534"
      : isWrong
        ? "#991B1B"
        : isSelected
          ? "#1D4ED8"
          : "#374151";
  const getLtrBg = () =>
    isCorrect
      ? "#DCFCE7"
      : isWrong
        ? "#FEE2E2"
        : isSelected
          ? "#DBEAFE"
          : "#F3F4F6";
  const getLtrTxt = () =>
    isCorrect
      ? "#166534"
      : isWrong
        ? "#991B1B"
        : isSelected
          ? "#1D4ED8"
          : "#6B7280";

  return (
    <div
      onClick={() => !isSubmitted && onSelect(index)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "13px 20px",
        background: getBg(),
        cursor: isSubmitted ? "default" : "pointer",
        borderBottom: "1px solid #F9FAFB",
        transition: "background 0.15s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        if (!isSubmitted && !isSelected && !isCorrect && !isWrong)
          e.currentTarget.style.background = "#F8FAFC";
      }}
      onMouseLeave={(e) => {
        if (!isSubmitted && !isSelected && !isCorrect && !isWrong)
          e.currentTarget.style.background = "#fff";
      }}
    >
      {/* Radio */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: `2px solid ${getBorder()}`,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.15s",
        }}
      >
        {(isSelected || isCorrect) && (
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: getDot(),
              transition: "background 0.15s",
            }}
          />
        )}
      </div>

      {/* Letter badge */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 7,
          flexShrink: 0,
          background: getLtrBg(),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color: getLtrTxt(),
        }}
      >
        {label}
      </div>

      {/* Text */}
      <span
        style={{
          fontSize: 15,
          color: getTxt(),
          fontWeight: isSelected || isCorrect ? 600 : 400,
          flex: 1,
          lineHeight: 1.4,
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {text}
      </span>

      {/* Answer marks */}
      {isSubmitted && isCorrect && (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#22C55E",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          ✓
        </div>
      )}
      {isSubmitted && isWrong && (
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "#EF4444",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          ✗
        </div>
      )}
    </div>
  );
}

// ─── QUESTION CARD ────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  qIndex,
  total,
  answer,
  onAnswer,
  onSubmit,
  isSubmitted,
  isSubmitting,
  isMobile,
}) {
  const labels = ["A", "B", "C", "D"];
  const studentCorrect = isSubmitted && answer === question.correct;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isMobile ? 12 : 16,
        border: "1px solid #E2E8F0",
        overflow: "hidden",
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ height: 6, background: "#2563EB" }} />

      <div
        style={{
          padding: isMobile ? "16px 16px 12px" : "22px 24px 16px",
          borderBottom: "1px solid #F1F5F9",
          background: "#FAFCFF",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#2563EB",
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Question {qIndex + 1} of {total}
        </div>
        <h3
          style={{
            fontSize: isMobile ? 15 : 17,
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.45,
            margin: 0,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {question.text}
        </h3>
        <p
          style={{
            fontSize: 12,
            color: "#94A3B8",
            marginTop: 6,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Select one option
        </p>
      </div>

      <div>
        {question.options.map((opt, i) => (
          <OptionItem
            key={i}
            label={labels[i]}
            text={opt}
            index={i}
            isSelected={answer === i}
            isCorrect={isSubmitted && i === question.correct}
            isWrong={isSubmitted && answer === i && i !== question.correct}
            isSubmitted={isSubmitted}
            onSelect={onAnswer}
          />
        ))}
      </div>

      {/* Explanation always shown after submit */}
      {isSubmitted && (
        <div
          style={{
            margin: "0 16px 12px",
            padding: "12px 16px",
            borderRadius: 10,
            background: studentCorrect ? "#F0FDF4" : "#FEF8EC",
            border: `1px solid ${studentCorrect ? "#86EFAC" : "#FCD34D"}`,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>
            {studentCorrect ? "🎯" : "💡"}
          </span>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: studentCorrect ? "#166534" : "#92400E",
                marginBottom: 3,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {studentCorrect
                ? "Correct!"
                : `Correct answer: ${question.options[question.correct]}`}
            </div>
            <div
              style={{
                fontSize: 13,
                color: studentCorrect ? "#166534" : "#78350F",
                lineHeight: 1.5,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {question.explanation}
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <div
        style={{
          padding: isMobile ? "12px 16px 16px" : "14px 24px 20px",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onSubmit}
          disabled={answer === null || isSubmitted || isSubmitting}
          style={{
            background: answer !== null && !isSubmitted ? "#2563EB" : "#F1F5F9",
            color: answer !== null && !isSubmitted ? "#fff" : "#9CA3AF",
            border: "none",
            borderRadius: 10,
            padding: isMobile ? "10px 20px" : "11px 28px",
            fontSize: 14,
            fontWeight: 600,
            cursor: answer !== null && !isSubmitted ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans',sans-serif",
            transition: "background 0.2s, transform 0.1s",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={(e) => {
            if (answer !== null && !isSubmitted) {
              e.currentTarget.style.background = "#1D4ED8";
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              answer !== null && !isSubmitted ? "#2563EB" : "#F1F5F9";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isSubmitting ? (
            <>
              <div
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  animation: "spin .7s linear infinite",
                }}
              />
              Submitting...
            </>
          ) : isSubmitted ? (
            "Submitted ✓"
          ) : (
            "Submit Answer"
          )}
        </button>
        <span
          style={{
            fontSize: 12,
            color: "#9CA3AF",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {isSubmitted
            ? "Saved to class record"
            : answer === null
              ? "Pick an option to continue"
              : "Ready — click Submit"}
        </span>
      </div>
    </div>
  );
}

// ─── QUESTION NAV ─────────────────────────────────────────────────────────────
function QuestionNav({
  current,
  answers,
  submitted,
  questions,
  isMobile,
  onChange,
}) {
  const done = submitted.filter(Boolean).length;
  const pct = Math.round((done / questions.length) * 100);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isMobile ? 12 : 14,
        border: "1px solid #E2E8F0",
        padding: isMobile ? "14px 16px" : "16px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: 1,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Progress
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#2563EB",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          {done}/{questions.length} · {pct}%
        </span>
      </div>
      <div
        style={{
          height: 5,
          background: "#F1F5F9",
          borderRadius: 3,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            height: 5,
            borderRadius: 3,
            background: "#2563EB",
            width: `${pct}%`,
            transition: "width .4s ease",
          }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {questions.map((q, i) => {
          const isAns = submitted[i];
          const isCurr = i === current;
          const isOk = isAns && answers[i] === q.correct;
          const isBad = isAns && answers[i] !== q.correct;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: `2px solid ${isCurr ? "#2563EB" : isOk ? "#22C55E" : isBad ? "#EF4444" : "#E2E8F0"}`,
                background: isCurr
                  ? "#EFF6FF"
                  : isOk
                    ? "#F0FDF4"
                    : isBad
                      ? "#FEF2F2"
                      : "#F8FAFC",
                color: isCurr
                  ? "#2563EB"
                  : isOk
                    ? "#16A34A"
                    : isBad
                      ? "#DC2626"
                      : "#6B7280",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all .15s",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {isOk ? "✓" : isBad ? "✗" : i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SCORE STRIP ─────────────────────────────────────────────────────────────
function ScoreStrip({ submitted, answers, isMobile }) {
  const correct = submitted.filter(
    (s, i) => s && answers[i] === QUESTIONS[i].correct,
  ).length;
  const wrong = submitted.filter(
    (s, i) => s && answers[i] !== QUESTIONS[i].correct && answers[i] !== null,
  ).length;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isMobile ? 12 : 14,
        border: "1px solid #E2E8F0",
        padding: isMobile ? "12px 16px" : "14px 20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 8,
        textAlign: "center",
      }}
    >
      {[
        { label: "Correct", val: correct, color: "#16A34A", bg: "#F0FDF4" },
        { label: "Wrong", val: wrong, color: "#DC2626", bg: "#FEF2F2" },
        { label: "Points", val: correct * 10, color: "#2563EB", bg: "#EFF6FF" },
      ].map((st) => (
        <div
          key={st.label}
          style={{ background: st.bg, borderRadius: 10, padding: "10px 6px" }}
        >
          <div
            style={{
              fontSize: isMobile ? 18 : 22,
              fontWeight: 800,
              color: st.color,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {st.val}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "#9CA3AF",
              marginTop: 2,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontFamily: "'DM Sans',sans-serif",
            }}
          >
            {st.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function ResultsScreen({
  answers,
  submitted,
  studentName,
  onRestart,
  isMobile,
  session,
}: {
  answers: Array<number | null>;
  submitted: boolean[];
  studentName: string;
  onRestart: () => void;
  isMobile: boolean;
  session: typeof SESSION;
}) {
  const total = QUESTIONS.length;
  const correct = submitted.filter(
    (s, i) => s && answers[i] === QUESTIONS[i].correct,
  ).length;
  const wrong = submitted.filter(
    (s, i) => s && answers[i] !== null && answers[i] !== QUESTIONS[i].correct,
  ).length;
  const pct = Math.round((correct / total) * 100);
  const grade = pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";
  const gc =
    pct >= 80
      ? "#16A34A"
      : pct >= 60
        ? "#2563EB"
        : pct >= 40
          ? "#D97706"
          : "#DC2626";
  const msg =
    pct >= 80
      ? "Excellent work!"
      : pct >= 60
        ? "Good effort!"
        : pct >= 40
          ? "Keep practising."
          : "Review and try again.";
  const reviewQuestions = QUESTIONS.filter(
    (_, i) => submitted[i] && answers[i] !== QUESTIONS[i].correct,
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isMobile ? 12 : 16,
        border: "1px solid #E2E8F0",
        padding: isMobile ? "24px 18px" : "36px 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: gc,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 800,
          margin: "0 auto 18px",
          fontFamily: "'DM Serif Display',serif",
          boxShadow: `0 6px 24px ${gc}44`,
        }}
      >
        {grade}
      </div>
      <h2
        style={{
          fontSize: isMobile ? 19 : 22,
          fontWeight: 700,
          color: "#0F172A",
          marginBottom: 6,
          fontFamily: "'DM Serif Display',serif",
        }}
      >
        Session Complete, {studentName}!
      </h2>
      <p
        style={{
          fontSize: 14,
          color: "#64748B",
          marginBottom: 24,
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {msg}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 26,
        }}
      >
        {[
          { label: "Correct", val: correct, c: "#16A34A", bg: "#F0FDF4" },
          { label: "Incorrect", val: wrong, c: "#DC2626", bg: "#FEF2F2" },
          { label: "Score", val: `${pct}%`, c: "#2563EB", bg: "#EFF6FF" },
        ].map((s) => (
          <div
            key={s.label}
            style={{ background: s.bg, borderRadius: 12, padding: "14px 8px" }}
          >
            <div
              style={{
                fontSize: isMobile ? 20 : 24,
                fontWeight: 800,
                color: s.c,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#9CA3AF",
                marginTop: 3,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 12,
          marginBottom: 22,
          textAlign: "left",
        }}
      >
        <div
          style={{
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            padding: "14px 16px",
            background: "#F8FAFC",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: 8,
            }}
          >
            Performance report
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B", fontSize: 13 }}>Correct</span>
              <strong style={{ color: "#16A34A" }}>{correct}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B", fontSize: 13 }}>Incorrect</span>
              <strong style={{ color: "#DC2626" }}>{wrong}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748B", fontSize: 13 }}>Accuracy</span>
              <strong style={{ color: "#2563EB" }}>{pct}%</strong>
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            padding: "14px 16px",
            background: "#F8FAFC",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#94A3B8",
              marginBottom: 8,
            }}
          >
            Study next
          </div>
          {reviewQuestions.length > 0 ? (
            <div style={{ display: "grid", gap: 10 }}>
              {reviewQuestions.map((q) => (
                <div
                  key={q.id}
                  style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}
                >
                  <strong style={{ color: "#0F172A" }}>{q.text}</strong>
                  <div style={{ color: "#64748B", marginTop: 3 }}>
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
              Great work. Revisit the slides once more to lock in the lesson,
              then move on to the next class.
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          border: "1px solid #D1FAE5",
          background: "#ECFDF3",
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 22,
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#059669",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          Reading guide
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#065F46", lineHeight: 1.6 }}>
          {session.studySummary}
        </p>
        <ul
          style={{
            margin: "10px 0 0 18px",
            color: "#065F46",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          {session.studyGoals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: "left", marginBottom: 24 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#94A3B8",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Review
        </div>
        {QUESTIONS.map((q, i) => {
          const ans = answers[i];
          const ok = ans === q.correct;
          const skip = ans === null || !submitted[i];
          return (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < QUESTIONS.length - 1 ? "1px solid #F1F5F9" : "none",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginTop: 1,
                  background: skip ? "#F1F5F9" : ok ? "#DCFCE7" : "#FEE2E2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: skip ? "#94A3B8" : ok ? "#16A34A" : "#DC2626",
                }}
              >
                {skip ? "–" : ok ? "✓" : "✗"}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#334155",
                    fontFamily: "'DM Sans',sans-serif",
                    lineHeight: 1.4,
                  }}
                >
                  {q.text}
                </div>
                {!ok && !skip && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#16A34A",
                      marginTop: 3,
                      fontFamily: "'DM Sans',sans-serif",
                    }}
                  >
                    ✓ {q.options[q.correct]}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onRestart}
        style={{
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px 28px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
          width: "100%",
          transition: "background .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
      >
        Retake Session
      </button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ClassSessionPage({
  studentName = "Amara K.",
  session = SESSION,
}) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(
    Array(QUESTIONS.length).fill(false),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slide, setSlide] = useState(0);
  const [toast, setToast] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(120);
  const timerRef = useRef(null);

  const showToast = useCallback((msg, type = "info") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    if (submitted[currentQ] || showResults) {
      clearInterval(timerRef.current);
      return;
    }
    setTimer(120);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          showToast("Time's up! Moving on.", "info");
          setCurrentQ((c) => {
            const next = c + 1;
            if (next >= QUESTIONS.length) {
              setShowResults(true);
              return c;
            }
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, showResults]);

  const handleAnswer = (i) => {
    if (submitted[currentQ]) return;
    const a = [...answers];
    a[currentQ] = i;
    setAnswers(a);
  };

  const handleSubmit = async () => {
    if (answers[currentQ] === null || submitted[currentQ]) return;
    clearInterval(timerRef.current);
    setIsSubmitting(true);
    const q = QUESTIONS[currentQ];
    const isCorrect = answers[currentQ] === q.correct;
    await submitAnswerToDB({
      sessionId: session.id,
      questionId: q.id,
      studentName,
      answer: q.options[answers[currentQ]],
      isCorrect,
    });
    const s = [...submitted];
    s[currentQ] = true;
    setSubmitted(s);
    setIsSubmitting(false);
    showToast(
      isCorrect ? "Correct! Well done." : "Incorrect — see explanation below.",
      isCorrect ? "success" : "error",
    );
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ((c) => c + 1);
    else setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(Array(QUESTIONS.length).fill(false));
    setShowResults(false);
    setSlide(0);
    setTimer(120);
  };

  const tm = String(Math.floor(timer / 60)).padStart(2, "0");
  const ts = String(timer % 60).padStart(2, "0");
  const timerRed = timer <= 30;

  const QuestionPanel = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: isMobile ? 12 : 14,
        animation: "fadeUp .3s ease",
      }}
    >
      {showResults ? (
        <ResultsScreen
          answers={answers}
          submitted={submitted}
          studentName={studentName}
          onRestart={handleRestart}
          isMobile={isMobile}
          session={session}
        />
      ) : (
        <>
          <QuestionCard
            question={QUESTIONS[currentQ]}
            qIndex={currentQ}
            total={QUESTIONS.length}
            answer={answers[currentQ]}
            onAnswer={handleAnswer}
            onSubmit={handleSubmit}
            isSubmitted={submitted[currentQ]}
            isSubmitting={isSubmitting}
            isMobile={isMobile}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
              disabled={currentQ === 0}
              style={{
                background: "none",
                border: "1px solid #E2E8F0",
                borderRadius: 9,
                padding: isMobile ? "8px 14px" : "8px 18px",
                fontSize: 13,
                color: "#64748B",
                cursor: currentQ === 0 ? "not-allowed" : "pointer",
                opacity: currentQ === 0 ? 0.4 : 1,
                fontWeight: 600,
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              ← {isMobile ? "Prev" : "Previous"}
            </button>
            {submitted[currentQ] && (
              <button
                onClick={handleNext}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  border: "none",
                  borderRadius: 9,
                  padding: isMobile ? "9px 18px" : "9px 22px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1D4ED8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#2563EB")
                }
              >
                {currentQ < QUESTIONS.length - 1 ? "Next →" : "See Results →"}
              </button>
            )}
          </div>
          <QuestionNav
            current={currentQ}
            answers={answers}
            submitted={submitted}
            questions={QUESTIONS}
            isMobile={isMobile}
            onChange={setCurrentQ}
          />
          <ScoreStrip
            submitted={submitted}
            answers={answers}
            isMobile={isMobile}
          />
        </>
      )}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#F1F5F9;-webkit-font-smoothing:antialiased;}
        @keyframes pulseLive{0%,100%{box-shadow:0 0 0 3px rgba(239,68,68,.25);}50%{box-shadow:0 0 0 7px rgba(239,68,68,.05);}}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes slideRight{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:translateX(0);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#F1F5F9;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:2px;}
      `}</style>
      <Toast toast={toast} />

      <div
        style={{
          minHeight: "100vh",
          background: "#F1F5F9",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        {/* ── TOP NAV ── */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E2E8F0",
            padding: isMobile ? "11px 14px" : "12px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 200,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 10 : 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              L
            </div>
            {!isMobile && (
              <div style={{ width: 1, height: 26, background: "#E2E8F0" }} />
            )}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: isMobile ? 13 : 15,
                  color: "#0F172A",
                  lineHeight: 1.2,
                }}
              >
                {isMobile ? session.subject : session.title}
              </div>
              {!isMobile && (
                <div style={{ fontSize: 11, color: "#94A3B8" }}>
                  {session.tutor} · {session.subject}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "#FFF1F2",
                border: "1px solid #FECDD3",
                borderRadius: 20,
                padding: "4px 10px",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#EF4444",
                  animation: "pulseLive 1.5s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#DC2626",
                  letterSpacing: 0.6,
                }}
              >
                LIVE
              </span>
            </div>
            {!submitted[currentQ] && !showResults && (
              <div
                style={{
                  background: timerRed ? "#FEF2F2" : "#EFF6FF",
                  border: `1px solid ${timerRed ? "#FECACA" : "#BFDBFE"}`,
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: timerRed ? "#DC2626" : "#2563EB",
                  fontVariantNumeric: "tabular-nums",
                  transition: "all .3s",
                }}
              >
                ⏱ {tm}:{ts}
              </div>
            )}
            {!isMobile && (
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: 20,
                  padding: "5px 12px",
                  fontSize: 12,
                  color: "#475569",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#DBEAFE",
                    color: "#2563EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {studentName.charAt(0)}
                </div>
                {studentName}
              </div>
            )}
          </div>
        </div>

        {/* ── LAYOUTS ── */}
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "18px 20px 0",
          }}
        >
          <div
            style={{
              border: "1px solid #D1FAE5",
              background: "linear-gradient(135deg, #ECFDF3, #F8FAFC)",
              borderRadius: 16,
              padding: isMobile ? "14px 16px" : "16px 20px",
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: 14,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  color: "#047857",
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Study mode
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: isMobile ? 16 : 18,
                  color: "#0F172A",
                  fontFamily: "'DM Serif Display',serif",
                }}
              >
                Learn from the presentation, then check your understanding.
              </h3>
              <p style={{ margin: "6px 0 0", fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
                {session.studySummary}
              </p>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #D1FAE5",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "#047857",
                whiteSpace: "nowrap",
              }}
            >
              {session.slides.length} study slides
            </div>
          </div>
        </div>

        {isDesktop && (
          <div
            style={{
              maxWidth: 1180,
              margin: "0 auto",
              padding: "22px 20px",
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: 20,
              alignItems: "start",
            }}
          >
            <SlidePanel
              session={session}
              slide={slide}
              setSlide={setSlide}
              isMobile={false}
              isTablet={false}
            />
            {QuestionPanel}
          </div>
        )}

        {isTablet && (
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "18px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <SlidePanel
              session={session}
              slide={slide}
              setSlide={setSlide}
              isMobile={false}
              isTablet={true}
            />
            {QuestionPanel}
          </div>
        )}

        {isMobile && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SlidePanel
              session={session}
              slide={slide}
              setSlide={setSlide}
              isMobile={true}
              isTablet={false}
            />
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 14px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {QuestionPanel}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
