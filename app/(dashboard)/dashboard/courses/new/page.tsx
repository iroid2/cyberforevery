"use client";

import { useEffect, useState, useRef } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { createCourseBundle } from "@/app/actions/courses";

const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "your-anon-key";

async function saveToSupabase(table, data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(data),
    });
    return res.ok ? await res.json() : null;
  } catch (e) {
    console.warn("DB error:", e);
    return null;
  }
}

// ─── Tiny SVG Icon ─────────────────────────────────────────────────────────
function Ico({ d, size = 16, color = "currentColor", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const PATH = {
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  check: "M20 6L9 17l-5-5",
  close: "M18 6L6 18M6 6l12 12",
  grip: "M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01",
  video:
    "M15 10l4.553-2.277A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4zM3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8",
  image:
    "M21 19H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  chevron: "M6 9l6 6 6-6",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM17 21v-8H7v8M7 3v5h8",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  back: "M19 12H5M12 5l-7 7 7 7",
  spark: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ─── Reusable Field Components ─────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: "#344054",
          marginBottom: hint ? 2 : 6,
        }}
      >
        {label}
      </label>
      {hint && (
        <p style={{ margin: "0 0 6px", fontSize: 12, color: "#98A2B3" }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1.5px solid #E4E7EC",
  fontSize: 14,
  color: "#1D2939",
  background: "#fff",
  outline: "none",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  transition: "border-color 0.15s",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: 88,
  lineHeight: 1.6,
};

const selectStyle = {
  ...inputStyle,
  appearance: "none",
  cursor: "pointer",
};

// ─── Section Header ────────────────────────────────────────────────────────
function SectionHead({ num, title, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "#EFF4FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: 16,
          color: "#3B6EF8",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {num}
      </div>
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: "#101828",
            fontFamily: "'Fraunces', serif",
          }}
        >
          {title}
        </h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: "#667085" }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ─── Divider ───────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: "#F2F4F7", margin: "32px 0" }} />;
}

// ─── Upload Drop Zone ──────────────────────────────────────────────────────
function DropZone({ onFile, accept, label, sub }) {
  const [over, setOver] = useState(false);
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files[0];
        if (f) onFile(f);
      }}
      style={{
        border: `2px dashed ${over ? "#3B6EF8" : "#D0D5DD"}`,
        borderRadius: 12,
        padding: "28px 20px",
        textAlign: "center",
        cursor: "pointer",
        background: over ? "#F5F8FF" : "#FAFAFA",
        transition: "all 0.2s",
      }}
    >
      <input
        ref={ref}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: over ? "#EFF4FF" : "#F2F4F7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 10px",
        }}
      >
        <Ico d={PATH.upload} size={22} color={over ? "#3B6EF8" : "#98A2B3"} />
      </div>
      <p
        style={{
          margin: 0,
          fontWeight: 600,
          fontSize: 14,
          color: over ? "#3B6EF8" : "#344054",
        }}
      >
        {label}
      </p>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#98A2B3" }}>{sub}</p>
    </div>
  );
}

// ─── Pill Badge ────────────────────────────────────────────────────────────
function Pill({ children, color = "gray" }) {
  const map = {
    blue: { bg: "#EFF4FF", text: "#3B6EF8" },
    green: { bg: "#ECFDF3", text: "#027A48" },
    amber: { bg: "#FFFAEB", text: "#B54708" },
    purple: { bg: "#F4F3FF", text: "#5925DC" },
    gray: { bg: "#F2F4F7", text: "#344054" },
  };
  const { bg, text } = map[color] || map.gray;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: bg,
        color: text,
      }}
    >
      {children}
    </span>
  );
}

// ─── Primary Button ────────────────────────────────────────────────────────
function BtnPrimary({ children, onClick, disabled, full }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 24px",
        borderRadius: 10,
        border: "none",
        background: disabled
          ? "#D0D5DD"
          : "linear-gradient(135deg,#3B6EF8,#6B9BFB)",
        color: "#fff",
        fontSize: 14,
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        width: full ? "100%" : "auto",
        boxShadow: disabled ? "none" : "0 1px 8px rgba(59,110,248,0.25)",
        transition: "opacity 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function BtnGhost({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "10px 18px",
        borderRadius: 10,
        border: "1.5px solid #D0D5DD",
        background: "#fff",
        color: "#344054",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {children}
    </button>
  );
}

// ─── Step Tabs ─────────────────────────────────────────────────────────────
const STEPS = ["Course Info", "Lessons", "Quiz", "Publish"];

function StepBar({ current, onGo }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        marginBottom: 40,
        borderBottom: "2px solid #F2F4F7",
      }}
    >
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <button
            key={i}
            onClick={() => done && onGo(i)}
            style={{
              flex: 1,
              padding: "14px 8px",
              border: "none",
              background: "transparent",
              borderBottom: active
                ? "2px solid #3B6EF8"
                : "2px solid transparent",
              marginBottom: -2,
              color: active ? "#3B6EF8" : done ? "#027A48" : "#98A2B3",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: active ? 700 : 600,
              fontSize: 13,
              cursor: done ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.15s",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: active ? "#3B6EF8" : done ? "#027A48" : "#E4E7EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {done ? <Ico d={PATH.check} size={12} color="#fff" /> : i + 1}
            </div>
            {s}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STEP 1 — Course Info
// ─────────────────────────────────────────────────────────────────────────────
function CourseInfoStep({ data, setData }) {
  const [coverPreview, setCoverPreview] = useState(null);

  const handleCover = (f) => {
    setData((d) => ({ ...d, coverFile: f, coverName: f.name }));
    setCoverPreview(URL.createObjectURL(f));
  };

  return (
    <div>
      <SectionHead
        num="1"
        title="Course Information"
        sub="Fill in the core details students will see when browsing your course."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label="Course Title *">
            <input
              style={inputStyle}
              placeholder="e.g. Introduction to Organic Chemistry"
              value={data.title}
              onChange={(e) =>
                setData((d) => ({ ...d, title: e.target.value }))
              }
            />
          </Field>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <Field
            label="Course Description *"
            hint="Summarise what students will learn. Aim for 3–5 sentences."
          >
            <textarea
              style={textareaStyle}
              rows={4}
              placeholder="Describe the course goals, topics covered, and who this is for..."
              value={data.description}
              onChange={(e) =>
                setData((d) => ({ ...d, description: e.target.value }))
              }
            />
          </Field>
        </div>

        <Field label="Subject / Category">
          <div style={{ position: "relative" }}>
            <select
              style={selectStyle}
              value={data.subject}
              onChange={(e) =>
                setData((d) => ({ ...d, subject: e.target.value }))
              }
            >
              <option value="">Select category...</option>
              {[
                "Mathematics",
                "Physics",
                "Chemistry",
                "Biology",
                "English Literature",
                "History",
                "Geography",
                "Computer Science",
                "Economics",
                "Art & Design",
                "Music",
                "Physical Education",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <Ico d={PATH.chevron} size={16} color="#667085" />
            </div>
          </div>
        </Field>

        <Field label="Difficulty Level">
          <div style={{ position: "relative" }}>
            <select
              style={selectStyle}
              value={data.level}
              onChange={(e) =>
                setData((d) => ({ ...d, level: e.target.value }))
              }
            >
              {["Beginner", "Intermediate", "Advanced"].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <div
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <Ico d={PATH.chevron} size={16} color="#667085" />
            </div>
          </div>
        </Field>

        <Field label="Tutor / Instructor Name">
          <input
            style={inputStyle}
            placeholder="Your full name"
            value={data.tutorName}
            onChange={(e) =>
              setData((d) => ({ ...d, tutorName: e.target.value }))
            }
          />
        </Field>

        <Field label="Max Students">
          <input
            style={inputStyle}
            type="number"
            min={1}
            placeholder="30"
            value={data.maxStudents}
            onChange={(e) =>
              setData((d) => ({ ...d, maxStudents: e.target.value }))
            }
          />
        </Field>

        <Field label="Start Date">
          <input
            style={inputStyle}
            type="date"
            value={data.startDate}
            onChange={(e) =>
              setData((d) => ({ ...d, startDate: e.target.value }))
            }
          />
        </Field>

        <Field label="Duration (weeks)">
          <input
            style={inputStyle}
            type="number"
            min={1}
            max={52}
            placeholder="8"
            value={data.duration}
            onChange={(e) =>
              setData((d) => ({ ...d, duration: e.target.value }))
            }
          />
        </Field>
      </div>

      <Divider />

      <SectionHead
        num="1b"
        title="Cover Image"
        sub="A strong cover helps your course stand out. 1280×720px works best."
      />
      {coverPreview ? (
        <div
          style={{
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <img
            src={coverPreview}
            alt="cover"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
            }}
          />
          <button
            onClick={() => {
              setCoverPreview(null);
              setData((d) => ({ ...d, coverFile: null, coverName: "" }));
            }}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.55)",
              border: "none",
              borderRadius: 6,
              padding: "5px 12px",
              color: "#fff",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <DropZone
          onFile={handleCover}
          accept="image/*"
          label="Drop your cover image here or click to upload"
          sub="PNG or JPG · up to 10 MB"
        />
      )}

      <Divider />

      <SectionHead
        num="1c"
        title="Learning Objectives"
        sub="List what students will be able to do after completing this course."
      />
      {(data.objectives || [""]).map((obj, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#EFF4FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#3B6EF8",
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <input
            style={{ ...inputStyle, flex: 1 }}
            placeholder={`Objective ${i + 1} — e.g. Solve quadratic equations`}
            value={obj}
            onChange={(e) => {
              const objs = [...(data.objectives || [""])];
              objs[i] = e.target.value;
              setData((d) => ({ ...d, objectives: objs }));
            }}
          />
          {i > 0 && (
            <button
              onClick={() =>
                setData((d) => ({
                  ...d,
                  objectives: d.objectives.filter((_, idx) => idx !== i),
                }))
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#98A2B3",
                padding: 4,
              }}
            >
              <Ico d={PATH.close} size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        onClick={() =>
          setData((d) => ({
            ...d,
            objectives: [...(d.objectives || [""]), ""],
          }))
        }
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 16px",
          borderRadius: 8,
          border: "1.5px dashed #D0D5DD",
          background: "transparent",
          color: "#667085",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          marginTop: 4,
        }}
      >
        <Ico d={PATH.plus} size={14} /> Add Objective
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STEP 2 — Lessons
// ─────────────────────────────────────────────────────────────────────────────
const TYPE_META = {
  slides: {
    label: "Slides / PPT",
    icon: PATH.file,
    color: "#3B6EF8",
    bg: "#EFF4FF",
    ext: ".ppt,.pptx,.pdf",
  },
  video: {
    label: "Video",
    icon: PATH.video,
    color: "#7C3AED",
    bg: "#F4F3FF",
    ext: "video/*",
  },
  document: {
    label: "Document / PDF",
    icon: PATH.file,
    color: "#D97706",
    bg: "#FFFAEB",
    ext: ".pdf,.doc,.docx",
  },
  image: {
    label: "Image",
    icon: PATH.image,
    color: "#059669",
    bg: "#ECFDF3",
    ext: "image/*",
  },
};

function LessonCard({ lesson, index, onChange, onDelete }) {
  const meta = TYPE_META[lesson.type] || TYPE_META.document;
  const [uploadStatus, setUploadStatus] = useState(
    lesson.fileUrl ? "uploaded" : "idle",
  );
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (lesson.fileUrl) {
      setUploadStatus("uploaded");
    }
  }, [lesson.fileUrl]);

  return (
    <div
      style={{
        border: "1.5px solid #E4E7EC",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 16,
        boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 18px",
          background: "#FAFAFA",
          borderBottom: "1px solid #F2F4F7",
        }}
      >
        <Ico d={PATH.grip} size={16} color="#C0C9D8" />
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: meta.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ico d={meta.icon} size={16} color={meta.color} />
        </div>
        <input
          style={{
            ...inputStyle,
            flex: 1,
            padding: "8px 12px",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            background: "transparent",
          }}
          placeholder={`Lesson ${index + 1} title`}
          value={lesson.title}
          onChange={(e) => onChange({ ...lesson, title: e.target.value })}
        />
        <button
          onClick={onDelete}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FDA29B",
            padding: 6,
          }}
        >
          <Ico d={PATH.trash} size={16} />
        </button>
      </div>

      {/* Card Body */}
      <div style={{ padding: "18px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Field label="Lesson Description">
            <textarea
              style={{ ...textareaStyle, minHeight: 64, fontSize: 13 }}
              rows={2}
              placeholder="Brief overview of what this lesson covers..."
              value={lesson.description}
              onChange={(e) =>
                onChange({ ...lesson, description: e.target.value })
              }
            />
          </Field>
          <Field label="Content Type">
            <div style={{ position: "relative" }}>
              <select
                style={{ ...selectStyle, fontSize: 13 }}
                value={lesson.type}
                onChange={(e) => onChange({ ...lesson, type: e.target.value })}
              >
                {Object.entries(TYPE_META).map(([v, m]) => (
                  <option key={v} value={v}>
                    {m.label}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <Ico d={PATH.chevron} size={14} color="#667085" />
              </div>
            </div>
          </Field>
          <Field label="Duration (min)">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              type="number"
              min={1}
              placeholder="30"
              value={lesson.durationMin || ""}
              onChange={(e) =>
                onChange({ ...lesson, durationMin: e.target.value })
              }
            />
          </Field>
        </div>

        {/* File area */}
        {lesson.fileName ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: "#ECFDF3",
              border: "1.5px solid #A6F4C5",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: meta.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ico d={meta.icon} size={16} color={meta.color} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#027A48",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {lesson.fileName}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: "#6CE9A6" }}>
                Uploaded
              </p>
              {lesson.fileUrl && (
                <a
                  href={lesson.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#3B6EF8",
                  }}
                >
                  Preview presentation
                </a>
              )}
            </div>
            <button
              onClick={() =>
                onChange({
                  ...lesson,
                  file: null,
                  fileName: "",
                  fileUrl: "",
                  fileKey: "",
                  fileType: "",
                  fileSize: 0,
                })
              }
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#98A2B3",
                padding: 4,
              }}
            >
              <Ico d={PATH.close} size={15} />
            </button>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Pill color={uploadStatus === "uploaded" ? "green" : uploadStatus === "error" ? "amber" : "gray"}>
                  {uploadStatus === "uploaded"
                    ? "Uploaded"
                    : uploadStatus === "error"
                      ? "Retry upload"
                      : uploadStatus === "uploading"
                        ? "Uploading..."
                        : "Ready to upload"}
                </Pill>
                <span style={{ fontSize: 12, color: "#667085" }}>
                  Upload PDF, image, or video for this lesson.
                </span>
              </div>
              {uploadError && (
                <span style={{ fontSize: 12, color: "#B42318", fontWeight: 600 }}>
                  {uploadError}
                </span>
              )}
            </div>

            <UploadDropzone
              key={`${lesson.id}-${lesson.fileUrl ? "done" : "open"}`}
              endpoint="presentationUpload"
              input={{
                title: lesson.title || `Lesson ${index + 1}`,
              }}
              onUploadBegin={() => {
                setUploadError("");
                setUploadStatus("uploading");
              }}
              onClientUploadComplete={(res) => {
                const file = res?.[0];
                if (!file) {
                  setUploadStatus("error");
                  setUploadError("Upload completed without a file response.");
                  return;
                }
                setUploadStatus("uploaded");
                onChange({
                  ...lesson,
                  fileName: file.name,
                  fileUrl: file.ufsUrl ?? file.url ?? "",
                  fileKey: file.key ?? "",
                  fileType: file.type ?? "",
                  fileSize: file.size ?? 0,
                  file: null,
                });
              }}
              onUploadError={(error) => {
                setUploadStatus("error");
                setUploadError(error.message || "Upload failed.");
                console.warn("Presentation upload failed:", error.message);
              }}
              appearance={{
                container:
                  "border border-dashed border-slate-200 rounded-xl bg-slate-50 p-0",
                uploadIcon: "text-emerald-600",
                label: "text-sm font-semibold text-slate-900",
                allowedContent: "text-xs text-slate-500",
                button:
                  "rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-emerald-700",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function LessonsStep({ lessons, setLessons }) {
  const add = () =>
    setLessons((ls) => [
      ...ls,
      {
        id: Date.now(),
        title: "",
        description: "",
        type: "slides",
        file: null,
        fileName: "",
        fileUrl: "",
        fileKey: "",
        fileType: "",
        fileSize: 0,
        durationMin: "",
      },
    ]);
  const update = (id, data) =>
    setLessons((ls) => ls.map((l) => (l.id === id ? data : l)));
  const remove = (id) => setLessons((ls) => ls.filter((l) => l.id !== id));

  return (
    <div>
      <SectionHead
        num="2"
        title="Add Course Lessons"
        sub="Upload your presentation files, videos, or documents for each lesson."
      />

      {lessons.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "52px 24px",
            border: "2px dashed #E4E7EC",
            borderRadius: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#F2F4F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Ico d={PATH.file} size={28} color="#C0C9D8" />
          </div>
          <p
            style={{
              margin: "0 0 4px",
              fontWeight: 700,
              fontSize: 16,
              color: "#344054",
            }}
          >
            No lessons yet
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "#98A2B3" }}>
            Add your first lesson to get started
          </p>
          <BtnPrimary onClick={add}>
            <Ico d={PATH.plus} size={16} /> Add First Lesson
          </BtnPrimary>
        </div>
      ) : (
        <>
          {lessons.map((l, i) => (
            <LessonCard
              key={l.id}
              lesson={l}
              index={i}
              onChange={(data) => update(l.id, data)}
              onDelete={() => remove(l.id)}
            />
          ))}
          <button
            onClick={add}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "2px dashed #D0D5DD",
              background: "transparent",
              color: "#667085",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            <Ico d={PATH.plus} size={16} /> Add Another Lesson
          </button>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STEP 3 — Quiz
// ─────────────────────────────────────────────────────────────────────────────
function QuestionCard({ q, index, onChange, onDelete }) {
  const setOpt = (i, v) => {
    const o = [...q.options];
    o[i] = v;
    onChange({ ...q, options: o });
  };
  const addOpt = () =>
    q.options.length < 6 && onChange({ ...q, options: [...q.options, ""] });
  const delOpt = (i) => {
    if (q.options.length <= 2) return;
    const opts = q.options.filter((_, idx) => idx !== i);
    onChange({
      ...q,
      options: opts,
      correctIndex:
        q.correctIndex === i
          ? -1
          : q.correctIndex > i
            ? q.correctIndex - 1
            : q.correctIndex,
    });
  };

  return (
    <div
      style={{
        border: "1.5px solid #E4E7EC",
        borderRadius: 14,
        marginBottom: 16,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "#FAFAFA",
          borderBottom: "1px solid #F2F4F7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Ico d={PATH.grip} size={16} color="#C0C9D8" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#344054" }}>
            Question {index + 1}
          </span>
          <Pill color="blue">Multiple Choice</Pill>
        </div>
        <button
          onClick={onDelete}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#FDA29B",
            padding: 4,
          }}
        >
          <Ico d={PATH.trash} size={16} />
        </button>
      </div>

      <div style={{ padding: 18 }}>
        <Field label="Question Text *">
          <textarea
            style={{ ...textareaStyle, minHeight: 72 }}
            rows={2}
            placeholder="Write your question here..."
            value={q.text}
            onChange={(e) => onChange({ ...q, text: e.target.value })}
          />
        </Field>

        <Field
          label="Answer Options"
          hint="Click the circle next to an option to mark it as the correct answer."
        >
          {q.options.map((opt, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              {/* Radio-style correct marker */}
              <button
                onClick={() => onChange({ ...q, correctIndex: i })}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  flexShrink: 0,
                  border: `2px solid ${q.correctIndex === i ? "#027A48" : "#D0D5DD"}`,
                  background: q.correctIndex === i ? "#027A48" : "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                  padding: 0,
                }}
              >
                {q.correctIndex === i && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                )}
              </button>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: "#F2F4F7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#667085",
                  flexShrink: 0,
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
              <input
                style={{
                  ...inputStyle,
                  flex: 1,
                  padding: "9px 12px",
                  fontSize: 13,
                }}
                placeholder={`Option ${String.fromCharCode(65 + i)}`}
                value={opt}
                onChange={(e) => setOpt(i, e.target.value)}
              />
              <button
                onClick={() => delOpt(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#C0C9D8",
                  padding: 4,
                }}
              >
                <Ico d={PATH.close} size={15} />
              </button>
            </div>
          ))}
          {q.options.length < 6 && (
            <button
              onClick={addOpt}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                borderRadius: 8,
                border: "1.5px dashed #D0D5DD",
                background: "transparent",
                color: "#667085",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginTop: 4,
              }}
            >
              <Ico d={PATH.plus} size={13} /> Add Option
            </button>
          )}
        </Field>

        <Field
          label="Answer Explanation"
          hint="Shown to students after they submit — explain why the answer is correct."
        >
          <input
            style={{ ...inputStyle, fontSize: 13 }}
            placeholder="e.g. Newton's first law states that an object at rest stays at rest..."
            value={q.explanation || ""}
            onChange={(e) => onChange({ ...q, explanation: e.target.value })}
          />
        </Field>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <Field label="Points">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              type="number"
              min={1}
              max={100}
              value={q.points || 10}
              onChange={(e) => onChange({ ...q, points: +e.target.value })}
            />
          </Field>
          <Field label="Time Limit (seconds)">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              type="number"
              min={10}
              max={300}
              value={q.timeLimit || 120}
              onChange={(e) => onChange({ ...q, timeLimit: +e.target.value })}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function QuizStep({ quiz, setQuiz }) {
  const addQ = () =>
    setQuiz((q) => ({
      ...q,
      questions: [
        ...q.questions,
        {
          id: Date.now(),
          text: "",
          options: ["", "", "", ""],
          correctIndex: -1,
          explanation: "",
          points: 10,
          timeLimit: 120,
        },
      ],
    }));
  const updateQ = (id, data) =>
    setQuiz((q) => ({
      ...q,
      questions: q.questions.map((qu) => (qu.id === id ? data : qu)),
    }));
  const deleteQ = (id) =>
    setQuiz((q) => ({
      ...q,
      questions: q.questions.filter((qu) => qu.id !== id),
    }));

  return (
    <div>
      <SectionHead
        num="3"
        title="Build Your Quiz"
        sub="Create quiz questions students will answer during or after the session."
      />

      {/* Quiz Settings */}
      <div
        style={{
          background: "#F8F9FC",
          borderRadius: 14,
          padding: 20,
          marginBottom: 28,
          border: "1.5px solid #E4E7EC",
        }}
      >
        <p
          style={{
            margin: "0 0 16px",
            fontWeight: 700,
            fontSize: 14,
            color: "#344054",
          }}
        >
          Quiz Settings
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Field label="Quiz Title">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              placeholder="End of Unit Quiz"
              value={quiz.title}
              onChange={(e) =>
                setQuiz((q) => ({ ...q, title: e.target.value }))
              }
            />
          </Field>
          <Field label="Passing Score (%)">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              type="number"
              min={0}
              max={100}
              value={quiz.passingScore}
              onChange={(e) =>
                setQuiz((q) => ({ ...q, passingScore: +e.target.value }))
              }
            />
          </Field>
          <Field label="Max Attempts">
            <input
              style={{ ...inputStyle, fontSize: 13 }}
              type="number"
              min={1}
              max={10}
              value={quiz.maxAttempts}
              onChange={(e) =>
                setQuiz((q) => ({ ...q, maxAttempts: +e.target.value }))
              }
            />
          </Field>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Shuffle Questions", key: "shuffle" },
            { label: "Show Correct Answers After Submit", key: "showAnswers" },
          ].map(({ label, key }) => (
            <label
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: 13,
                color: "#344054",
                fontWeight: 500,
              }}
            >
              <div
                onClick={() => setQuiz((q) => ({ ...q, [key]: !q[key] }))}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 20,
                  background: quiz[key] ? "#3B6EF8" : "#D0D5DD",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: quiz[key] ? 21 : 3,
                    transition: "left 0.2s",
                  }}
                />
              </div>
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <p
          style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#101828" }}
        >
          Questions{" "}
          <span style={{ color: "#98A2B3", fontWeight: 400 }}>
            ({quiz.questions.length})
          </span>
        </p>
        <BtnPrimary onClick={addQ}>
          <Ico d={PATH.plus} size={16} /> Add Question
        </BtnPrimary>
      </div>

      {quiz.questions.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            border: "2px dashed #E4E7EC",
            borderRadius: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#F2F4F7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Ico d={PATH.spark} size={28} color="#C0C9D8" />
          </div>
          <p
            style={{
              margin: "0 0 4px",
              fontWeight: 700,
              fontSize: 16,
              color: "#344054",
            }}
          >
            No questions yet
          </p>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "#98A2B3" }}>
            Add your first quiz question
          </p>
          <BtnPrimary onClick={addQ}>
            <Ico d={PATH.plus} size={16} /> Add First Question
          </BtnPrimary>
        </div>
      ) : (
        <>
          {quiz.questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              index={i}
              onChange={(data) => updateQ(q.id, data)}
              onDelete={() => deleteQ(q.id)}
            />
          ))}
          <button
            onClick={addQ}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 12,
              border: "2px dashed #D0D5DD",
              background: "transparent",
              color: "#667085",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Ico d={PATH.plus} size={16} /> Add Another Question
          </button>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STEP 4 — Review & Publish
// ─────────────────────────────────────────────────────────────────────────────
function PublishStep({ courseData, lessons, quiz, onPublish, saving, publishError }) {
  const issues = [];
  if (!courseData.title) issues.push("Add a course title");
  if (!courseData.description) issues.push("Add a course description");
  if (!courseData.subject) issues.push("Select a subject category");
  if (lessons.length === 0) issues.push("Add at least one lesson");
  if (lessons.some((l) => !l.title)) issues.push("All lessons need a title");
  if (quiz.questions.some((q) => !q.text || q.options.some((o) => !o)))
    issues.push("Complete all quiz question fields");
  if (quiz.questions.some((q) => q.correctIndex < 0))
    issues.push("Pick a correct answer for every question");

  const totalPts = quiz.questions.reduce((s, q) => s + (q.points || 10), 0);
  const ready = issues.length === 0;

  return (
    <div>
      <SectionHead
        num="4"
        title="Review & Publish"
        sub="Check everything looks right before making your course live."
      />

      {/* Issues */}
      {!ready && (
        <div
          style={{
            background: "#FFFAEB",
            border: "1.5px solid #FEC84B",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 24,
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontWeight: 700,
              fontSize: 13,
              color: "#B54708",
            }}
          >
            Fix before publishing:
          </p>
          {issues.map((iss, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "flex-start",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#FEF0C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <span
                  style={{ fontSize: 10, fontWeight: 800, color: "#B54708" }}
                >
                  !
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#B54708" }}>{iss}</p>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Lessons",
            value: lessons.length,
            color: "#EFF4FF",
            text: "#3B6EF8",
          },
          {
            label: "Questions",
            value: quiz.questions.length,
            color: "#F4F3FF",
            text: "#5925DC",
          },
          {
            label: "Total pts",
            value: totalPts,
            color: "#ECFDF3",
            text: "#027A48",
          },
          {
            label: "Weeks",
            value: courseData.duration || "—",
            color: "#FFFAEB",
            text: "#B54708",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: s.color,
              borderRadius: 12,
              padding: "18px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 800,
                color: s.text,
                fontFamily: "'Fraunces', serif",
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 12,
                fontWeight: 600,
                color: s.text + "99",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Course Preview Card */}
      <div
        style={{
          border: "1.5px solid #E4E7EC",
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        {courseData.coverName && (
          <div
            style={{
              height: 10,
              background: "linear-gradient(90deg,#3B6EF8,#6B9BFB)",
            }}
          />
        )}
        <div style={{ padding: 20 }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 12,
              flexWrap: "wrap",
            }}
          >
            {courseData.subject && (
              <Pill color="blue">{courseData.subject}</Pill>
            )}
            {courseData.level && <Pill color="amber">{courseData.level}</Pill>}
            {courseData.tutorName && (
              <Pill color="green">{courseData.tutorName}</Pill>
            )}
          </div>
          <h3
            style={{
              margin: "0 0 8px",
              fontFamily: "'Fraunces', serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#101828",
            }}
          >
            {courseData.title || (
              <span style={{ color: "#C0C9D8" }}>No title yet</span>
            )}
          </h3>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 13,
              color: "#667085",
              lineHeight: 1.7,
            }}
          >
            {courseData.description || (
              <span style={{ color: "#D0D5DD" }}>No description yet</span>
            )}
          </p>

          {lessons.length > 0 && (
            <>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#98A2B3",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Lessons
              </p>
              {lessons.map((l, i) => {
                const meta = TYPE_META[l.type] || TYPE_META.document;
                return (
                  <div
                    key={l.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: "#FAFAFA",
                      border: "1px solid #F2F4F7",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: meta.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Ico d={meta.icon} size={14} color={meta.color} />
                    </div>
                    <span
                      style={{
                        flex: 1,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#344054",
                      }}
                    >
                      {l.title || (
                        <span style={{ color: "#C0C9D8" }}>Untitled</span>
                      )}
                    </span>
                    {l.fileName && <Pill color="green">Uploaded</Pill>}
                    {l.durationMin && (
                      <Pill color="gray">{l.durationMin} min</Pill>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Publish Button */}
      <div
        style={{
          background: ready
            ? "linear-gradient(135deg,#ECFDF3,#F0FDF4)"
            : "#F8F9FC",
          border: `1.5px solid ${ready ? "#A6F4C5" : "#E4E7EC"}`,
          borderRadius: 14,
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 4px",
              fontWeight: 700,
              fontSize: 16,
              color: ready ? "#027A48" : "#344054",
            }}
          >
            {ready
              ? "Ready to publish!"
              : `${issues.length} issue${issues.length > 1 ? "s" : ""} remaining`}
          </p>
          <p style={{ margin: 0, fontSize: 13, color: "#667085" }}>
            {ready
              ? "Your course will be visible to enrolled students immediately."
              : "Scroll up and fix the highlighted issues first."}
          </p>
          {publishError && (
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 13,
                color: "#B42318",
                fontWeight: 600,
              }}
            >
              {publishError}
            </p>
          )}
        </div>
        <BtnPrimary onClick={onPublish} disabled={!ready || saving}>
          {saving ? (
            "Publishing..."
          ) : (
            <>
              <Ico d={PATH.save} size={16} /> Publish Course
            </>
          )}
        </BtnPrimary>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function CourseCreatorPage() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [publishError, setPublishError] = useState("");

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    subject: "",
    level: "Beginner",
    tutorName: "",
    maxStudents: 30,
    startDate: "",
    duration: 8,
    coverFile: null,
    coverName: "",
    objectives: [""],
  });
  const [lessons, setLessons] = useState([]);
  const [quiz, setQuiz] = useState({
    title: "End of Course Quiz",
    passingScore: 70,
    maxAttempts: 3,
    shuffle: false,
    showAnswers: true,
    questions: [],
  });

  const handlePublish = async () => {
    // Guard — same checks as PublishStep (lesson titles auto-fill)
    const blockingIssues: string[] = [];
    if (!courseData.title) blockingIssues.push("Add a course title");
    if (!courseData.subject) blockingIssues.push("Select a subject category");
    if (lessons.length === 0) blockingIssues.push("Add at least one lesson");
    if (quiz.questions.some((q) => !q.text || q.options.some((o) => !o)))
      blockingIssues.push("Complete all quiz question fields");
    if (quiz.questions.some((q) => q.correctIndex < 0))
      blockingIssues.push("Pick a correct answer for every question");

    if (blockingIssues.length > 0) {
      setPublishError(blockingIssues.join(" · "));
      setStep(3);
      return;
    }

    setSaving(true);
    setPublishError("");
    try {
      await createCourseBundle({
        title: courseData.title,
        subject: courseData.subject,
        description: courseData.description,
        level: courseData.level,
        tutorName: courseData.tutorName,
        startDate: courseData.startDate,
        duration: courseData.duration,
        maxStudents: courseData.maxStudents,
        objectives: courseData.objectives.filter(Boolean),
        lessons: lessons.map((l, i) => ({
          title: l.title || `Lesson ${i + 1}`,
          description: l.description,
          type: l.type,
          fileName: l.fileName,
          fileUrl: l.fileUrl,
          fileKey: l.fileKey,
          fileType: l.fileType,
          fileSize: l.fileSize,
          durationMin: l.durationMin,
        })),
        quiz: {
          title: quiz.title,
          passingScore: quiz.passingScore,
          maxAttempts: quiz.maxAttempts,
          shuffle: quiz.shuffle,
          showAnswers: quiz.showAnswers,
          questions: quiz.questions.map((q) => ({
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            points: q.points,
            timeLimit: q.timeLimit,
          })),
        },
      });
      setDone(true);
    } catch (error) {
      setPublishError(error instanceof Error ? error.message : "Failed to publish course");
    } finally {
      setSaving(false);
    }
  };

  // ── Success ──
  if (done) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F8F9FC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <div style={{ textAlign: "center", maxWidth: 480, padding: "0 24px" }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "#ECFDF3",
              border: "3px solid #A6F4C5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <Ico d={PATH.check} size={40} color="#027A48" strokeWidth={2.5} />
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 34,
              fontWeight: 700,
              margin: "0 0 10px",
              color: "#101828",
            }}
          >
            Course Published!
          </h1>
          <p style={{ fontSize: 15, color: "#667085", marginBottom: 32 }}>
            <strong style={{ color: "#344054" }}>{courseData.title}</strong> is
            now live and visible to enrolled students.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <BtnPrimary
              onClick={() => {
                setDone(false);
                setStep(0);
                setCourseData({
                  title: "",
                  description: "",
                  subject: "",
                  level: "Beginner",
                  tutorName: "",
                  maxStudents: 30,
                  startDate: "",
                  duration: 8,
                  coverFile: null,
                  coverName: "",
                  objectives: [""],
                });
                setLessons([]);
                setQuiz({
                  title: "End of Course Quiz",
                  passingScore: 70,
                  maxAttempts: 3,
                  shuffle: false,
                  showAnswers: true,
                  questions: [],
                });
              }}
            >
              <Ico d={PATH.plus} size={16} /> Create Another
            </BtnPrimary>
            <BtnGhost onClick={() => setDone(false)}>
              <Ico d={PATH.eye} size={16} /> View
            </BtnGhost>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Page ──
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:wght@400;700&display=swap"
        rel="stylesheet"
      />

      {/* Page Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #F2F4F7",
          padding: "24px 0",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 4px",
                  fontFamily: "'Fraunces', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#101828",
                }}
              >
                Create a New Course
              </h1>
              <p style={{ margin: 0, fontSize: 14, color: "#667085" }}>
                Fill in the details below to build and publish your course for
                students.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <BtnGhost onClick={() => {}}>
                <Ico d={PATH.eye} size={15} /> Preview
              </BtnGhost>
              {step < 3 ? (
                <BtnPrimary onClick={() => setStep((s) => Math.min(s + 1, 3))}>
                  Continue →
                </BtnPrimary>
              ) : (
                <BtnPrimary onClick={handlePublish} disabled={saving}>
                  {saving ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Ico d={PATH.save} size={15} /> Publish
                    </>
                  )}
                </BtnPrimary>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 80px" }}
      >
        {/* Step Tabs */}
        <StepBar current={step} onGo={setStep} />

        {/* Step Content */}
        {step === 0 && (
          <CourseInfoStep data={courseData} setData={setCourseData} />
        )}
        {step === 1 && (
          <LessonsStep lessons={lessons} setLessons={setLessons} />
        )}
        {step === 2 && <QuizStep quiz={quiz} setQuiz={setQuiz} />}
        {step === 3 && (
          <PublishStep
            courseData={courseData}
            lessons={lessons}
            quiz={quiz}
            onPublish={handlePublish}
            saving={saving}
            publishError={publishError}
          />
        )}

        {/* Bottom Nav */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid #F2F4F7",
          }}
        >
          <div>
            {step > 0 && (
              <BtnGhost onClick={() => setStep((s) => s - 1)}>
                <Ico d={PATH.back} size={15} /> Back
              </BtnGhost>
            )}
          </div>
          <div style={{ fontSize: 13, color: "#98A2B3" }}>
            Step {step + 1} of {STEPS.length}
          </div>
          <div>
            {step < 3 ? (
              <BtnPrimary onClick={() => setStep((s) => s + 1)}>
                Continue →
              </BtnPrimary>
            ) : (
              <BtnPrimary onClick={handlePublish} disabled={saving}>
                {saving ? (
                  "Publishing..."
                ) : (
                  <>
                    <Ico d={PATH.save} size={15} /> Publish Course
                  </>
                )}
              </BtnPrimary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
