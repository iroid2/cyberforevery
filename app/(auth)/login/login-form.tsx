"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const slideItems = [
  {
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=1100&fit=crop&crop=center&auto=format&q=80",
    tag: "// BOOTCAMP_LIVE",
    headline: "SECURE\nYOUR <em>FUTURE</em>",
    sub: "Join thousands of young hackers building real cybersecurity skills — starting from zero.",
    alt: "Students learning",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&h=1100&fit=crop&crop=center&auto=format&q=80",
    tag: "// HANDS_ON_LEARNING",
    headline: "CODE.\nBUILD. <em>WIN.</em>",
    sub: "Every student leaves with a real project — apps, tools and AI models they built themselves.",
    alt: "Child coding",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1100&fit=crop&crop=center&auto=format&q=80",
    tag: "// COMMUNITY_DRIVEN",
    headline: "LEARN.\nGROW. <em>PROTECT.</em>",
    sub: "Be part of Africa's fastest-growing youth cybersecurity movement.",
    alt: "Students collaborating",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=1100&fit=crop&crop=center&auto=format&q=80",
    tag: "// AWARD_WINNING",
    headline: "TRUSTED\nBY <em>SCHOOLS.</em>",
    sub: "10+ awards. 500+ graduates. Schools across Uganda and beyond trust Cyber4Every1.",
    alt: "Classroom",
  },
];

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const DURATION = 5000;
    let start = performance.now();
    let rafId: number;

    function tick(now: number) {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafId = window.requestAnimationFrame(tick);
      }
    }

    rafId = window.requestAnimationFrame(tick);
    const timerId = window.setTimeout(() => {
      setActiveSlide((value) => (value + 1) % slideItems.length);
    }, DURATION);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
      setProgress(0);
    };
  }, [activeSlide]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase(),
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Invalid credentials. Access Denied.");
      } else {
        toast.success("AUTHENTICATION_SUCCESSFUL // WELCOME BACK, AGENT");
        router.replace("/dashboard");
        router.refresh();
      }
    } catch {
      setError("System malfunction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="page">
        <div className="slider-panel" role="region" aria-label="Login highlights slideshow">
          {slideItems.map((slide, index) => (
            <div key={slide.tag} className={`slide ${index === activeSlide ? "active" : ""}`}>
              <img src={slide.image} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} />
              <div className="slide-blend" />
              <div className="slide-vignette" />
              <div className="slide-fade-right" />
              <div className="slide-content">
                <div className="slide-tag">
                  <span className="slide-tag-dot" />
                  {slide.tag}
                </div>
                <h2 className="slide-headline" dangerouslySetInnerHTML={{ __html: slide.headline }} />
                <p className="slide-sub">{slide.sub}</p>
              </div>
            </div>
          ))}

          <div className="slider-scanlines" aria-hidden="true" />

          <a href="/" className="slider-logo">
            <div className="logo-box">C4E</div>
            <span className="logo-text">
              Cyber<span>4</span>Every1
            </span>
          </a>

          <div className="slider-dots" role="tablist" aria-label="Slide navigation">
            {slideItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`sdot ${index === activeSlide ? "active" : ""}`}
                aria-label={`Show slide ${index + 1}`}
                aria-selected={index === activeSlide}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <div className="slide-progress" style={{ width: `${progress}%` }} />
        </div>

        <div className="form-panel">
          <div className="form-eyebrow">// SIGN_IN</div>
          <h1 className="form-title">
            Welcome <span>back</span>
          </h1>
          <p className="form-subtitle">Enter your credentials to access your dashboard.</p>

          <form onSubmit={handleSubmit} autoComplete="off">
            {error ? (
              <div className="error-box">[ERROR]: {error}</div>
            ) : null}

            <div className="field">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 4.5L7 8.5l6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.5" y="6.5" width="9" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4 6.5V5C4 3.343 5.343 2 7 2C8.657 2 10 3.343 10 5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="7" cy="9.5" r="1" fill="currentColor" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 2L12 12" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5.5 5.7C5.2 6 5 6.5 5 7C5 8.1 5.9 9 7 9C7.5 9 7.9 8.8 8.2 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M3.5 3.6C2.4 4.4 1.5 5.6 1 7C1 7 3.5 10.5 7 10.5C8.2 10.5 9.3 10.1 10.2 9.4" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M6.5 2.55C6.67 2.52 6.83 2.5 7 2.5C10.5 2.5 13 6 13 6C12.7 6.7 12.3 7.3 11.8 7.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7C1 7 3 3.5 7 3.5S13 7 13 7 11 10.5 7 10.5 1 7 1 7Z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <label className="checkbox-wrap">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "SIGNING IN..." : "Sign In"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#050D05" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="divider">
              <div className="div-line" />
              <span className="div-text">OR SIGN IN WITH</span>
              <div className="div-line" />
            </div>

            <div className="social-row">
              <a href="#" className="social-btn" aria-label="Google">
                <svg width="18" height="18" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.79h5.4a4.6 4.6 0 01-2 3.02v2.5h3.24c1.9-1.75 3-4.33 3-7.31z" fill="#4285F4" />
                  <path d="M10 20c2.7 0 4.97-.9 6.63-2.46l-3.24-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.6-4.12H1.07v2.58A10 10 0 0010 20z" fill="#34A853" />
                  <path d="M4.4 11.88A6.06 6.06 0 014.1 10c0-.65.11-1.28.3-1.88V5.54H1.07A10 10 0 000 10c0 1.61.38 3.13 1.07 4.46l3.33-2.58z" fill="#FBBC05" />
                  <path d="M10 3.96c1.47 0 2.78.5 3.82 1.5L16.7 2.6A9.95 9.95 0 0010 0 10 10 0 001.07 5.54l3.33 2.58C5.2 5.72 7.4 3.96 10 3.96z" fill="#EA4335" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C17.138 18.165 20 14.417 20 10c0-5.523-4.477-10-10-10z" fill="#EEFFEE" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.77 1.5h2.46l-5.38 6.15 6.33 8.35h-4.95L8.4 10.44 4.37 16H1.9l5.76-6.59L1.5 1.5h5.08l3.45 4.56L13.77 1.5zm-.87 12.6h1.36L5.14 2.9H3.68l9.22 11.2z" fill="#EEFFEE" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Apple">
                <svg width="15" height="18" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.28 10.68c-.02-2.32 1.9-3.44 1.99-3.5-1.09-1.59-2.78-1.8-3.38-1.83-1.44-.15-2.82.85-3.55.85-.73 0-1.85-.83-3.04-.81-1.56.02-3 .91-3.8 2.3C.64 10.39 1.82 15 3.66 17.48c.91 1.31 2 2.77 3.42 2.72 1.37-.05 1.89-.88 3.54-.88 1.66 0 2.13.88 3.57.85 1.48-.02 2.42-1.34 3.32-2.65.66-.96 1.17-1.93 1.48-2.56-3.1-1.17-3.73-4.28-3.71-5.28zM11.6 3.64c.74-.93 1.24-2.2 1.1-3.48-1.06.04-2.36.71-3.12 1.62-.68.78-1.28 2.05-1.12 3.25 1.18.09 2.39-.6 3.14-1.39z" fill="#EEFFEE" />
                </svg>
              </a>
            </div>

            <p className="signin-row">
              Don't have an account? <a href="/register">Create one free →</a>
            </p>
          </form>
        </div>
      </div>

      <style jsx global>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        :root{
          --lime:#7FFF00;
          --lime2:#A3FF4D;
          --bg-page:#050D05;
          --bg-card:#0D1A0D;
          --bg-input:#142014;
          --bg-input-focus:#1a2e1a;
          --text1:#EEFFEE;
          --text2:#A0C0A0;
          --text3:#5A7A5A;
          --border:rgba(127,255,0,0.13);
          --border-focus:rgba(127,255,0,0.45);
          --fn:'Nunito',sans-serif;
          --fm:'JetBrains Mono',monospace;
          --fd:'Bebas Neue',sans-serif;
        }

        .login-page {
          position:relative;
          min-height:100vh;
          overflow:hidden;
          background:var(--bg-page);
          color:var(--text1);
          font-family:var(--fn);
        }

        .login-page::before{
          content:'';
          position:absolute;
          inset:0;
          background-image:
            linear-gradient(rgba(127,255,0,0.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(127,255,0,0.025) 1px,transparent 1px);
          background-size:52px 52px;
          pointer-events:none;
          z-index:0;
        }

        .page{
          position:relative;
          z-index:1;
          min-height:100vh;
          display:grid;
          grid-template-columns:1fr 1fr;
        }

        .slider-panel{
          position:relative;
          height:100vh;
          overflow:hidden;
        }

        .slide{
          position:absolute;
          inset:0;
          opacity:0;
          transition:opacity 1.1s cubic-bezier(0.4,0,0.2,1);
        }
        .slide.active{opacity:1;}

        .slide img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }

        .slide::before{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(160deg,rgba(5,13,5,0.55) 0%,rgba(5,13,5,0.2) 50%,rgba(5,13,5,0.7) 100%);
          z-index:1;
        }

        .slide-blend{
          position:absolute;
          inset:0;
          z-index:2;
          background:linear-gradient(135deg,rgba(127,255,0,0.18) 0%,rgba(0,50,0,0.4) 100%);
          mix-blend-mode:color-dodge;
        }

        .slide-vignette{
          position:absolute;
          inset:0;
          z-index:3;
          background:radial-gradient(ellipse at center,transparent 30%,rgba(5,13,5,0.75) 100%);
        }

        .slide-fade-right{
          position:absolute;
          top:0;
          right:0;
          bottom:0;
          width:110px;
          z-index:4;
          background:linear-gradient(90deg,transparent,rgba(5,13,5,0.5) 50%,var(--bg-card) 100%);
        }

        .slider-scanlines{
          position:absolute;
          inset:0;
          z-index:5;
          pointer-events:none;
          background-image:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px);
        }

        .slide-content{
          position:absolute;
          inset:0;
          z-index:6;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          padding:32px 36px 60px;
        }

        .slide-tag{
          display:inline-flex;
          align-items:center;
          gap:7px;
          font-family:var(--fm);
          font-size:9.5px;
          font-weight:500;
          letter-spacing:2px;
          text-transform:uppercase;
          color:var(--lime);
          background:rgba(127,255,0,0.1);
          border:1px solid rgba(127,255,0,0.25);
          padding:4px 12px;
          border-radius:100px;
          margin-bottom:10px;
          width:fit-content;
        }

        .slide-tag-dot{
          width:5px;
          height:5px;
          border-radius:50%;
          background:var(--lime);
          animation:pdot 2s infinite;
        }
        @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}

        .slide-headline{
          font-family:var(--fd);
          font-size:clamp(32px,3vw,46px);
          line-height:1;
          letter-spacing:1px;
          color:var(--text1);
          margin-bottom:8px;
          text-shadow:0 2px 18px rgba(0,0,0,0.5);
          white-space:pre-wrap;
        }
        .slide-headline em{color:var(--lime);font-style:normal;}

        .slide-sub{
          font-size:13px;
          color:rgba(238,255,238,0.72);
          line-height:1.6;
          max-width:300px;
          text-shadow:0 1px 8px rgba(0,0,0,0.6);
        }

        .slider-logo{
          position:absolute;
          top:24px;
          left:28px;
          z-index:7;
          display:flex;
          align-items:center;
          gap:8px;
          text-decoration:none;
        }

        .logo-box{
          width:30px;
          height:30px;
          background:var(--lime);
          border-radius:6px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:var(--fm);
          font-size:10px;
          font-weight:700;
          color:#050D05;
        }

        .logo-text{font-weight:900;font-size:15px;color:var(--text1);}
        .logo-text span{color:var(--lime);}

        .slider-dots{
          position:absolute;
          bottom:28px;
          left:28px;
          z-index:7;
          display:flex;
          gap:7px;
        }

        .sdot{
          width:7px;
          height:7px;
          border-radius:100px;
          background:rgba(255,255,255,0.3);
          border:1px solid rgba(255,255,255,0.2);
          cursor:pointer;
          transition:background .3s,width .3s;
        }
        .sdot.active{background:var(--lime);width:22px;border-color:var(--lime);}

        .slide-progress{
          position:absolute;
          bottom:0;
          left:0;
          height:3px;
          background:var(--lime);
          opacity:.7;
          z-index:7;
          transition:width 0.1s linear;
        }

        .form-panel{
          background:var(--bg-card);
          height:100vh;
          overflow-y:auto;
          display:flex;
          flex-direction:column;
          justify-content:center;
          padding:28px 44px;
          position:relative;
        }

        .form-panel::before{
          content:'';
          position:absolute;
          top:-80px;
          right:-80px;
          width:320px;
          height:320px;
          background:radial-gradient(circle,rgba(127,255,0,0.05) 0%,transparent 65%);
          pointer-events:none;
        }

        .form-eyebrow{
          font-family:var(--fm);
          font-size:9.5px;
          letter-spacing:2.5px;
          text-transform:uppercase;
          color:var(--lime);
          margin-bottom:4px;
        }

        .form-title{
          font-weight:900;
          font-size:clamp(20px,2vw,26px);
          color:var(--text1);
          line-height:1.1;
          margin-bottom:3px;
        }
        .form-title span{color:var(--lime);}

        .form-subtitle{
          font-size:12px;
          color:var(--text3);
          line-height:1.5;
          margin-bottom:16px;
        }

        .field{
          display:flex;
          flex-direction:column;
          gap:4px;
          margin-bottom:11px;
        }

        .field label{
          font-size:11px;
          font-weight:700;
          color:var(--text2);
          letter-spacing:.3px;
        }

        .input-wrap{
          position:relative;
          display:flex;
          align-items:center;
        }

        .input-icon{
          position:absolute;
          left:11px;
          color:var(--text3);
          display:flex;
          align-items:center;
          pointer-events:none;
          transition:color .2s;
          z-index:1;
        }

        .input-wrap:focus-within .input-icon{color:var(--lime);}

        .field input{
          width:100%;
          background:var(--bg-input);
          border:1px solid var(--border);
          border-radius:8px;
          padding:9px 12px 9px 36px;
          font-size:12.5px;
          font-family:var(--fn);
          color:var(--text1);
          outline:none;
          transition:border-color .2s,box-shadow .2s,background .2s;
          height:36px;
        }

        .field input::placeholder{color:var(--text3);font-size:12px;}

        .field input:focus{
          border-color:var(--border-focus);
          background:var(--bg-input-focus);
          box-shadow:0 0 0 3px rgba(127,255,0,0.07);
        }

        .pw-toggle{
          position:absolute;
          right:10px;
          background:none;
          border:none;
          color:var(--text3);
          cursor:pointer;
          display:flex;
          align-items:center;
          padding:3px;
          transition:color .2s;
          z-index:1;
        }
        .pw-toggle:hover{color:var(--lime);}

        .remember-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom:16px;
          flex-wrap:wrap;
          gap:8px;
        }

        .checkbox-wrap{
          display:flex;
          align-items:center;
          gap:8px;
          cursor:pointer;
        }

        .checkbox-wrap input[type="checkbox"]{
          appearance:none;
          width:15px;
          height:15px;
          border:1.5px solid var(--border-focus);
          border-radius:3px;
          background:var(--bg-input);
          cursor:pointer;
          position:relative;
          transition:background .2s;
        }

        .checkbox-wrap input[type="checkbox"]:checked{
          background:var(--lime);
          border-color:var(--lime);
        }
        .checkbox-wrap input[type="checkbox"]:checked::after{
          content:'';
          position:absolute;
          top:1px;
          left:4px;
          width:4px;
          height:8px;
          border:2px solid #050D05;
          border-top:none;
          border-left:none;
          transform:rotate(45deg);
        }

        .checkbox-wrap span{
          font-size:11px;
          color:var(--text3);
          user-select:none;
        }

        .forgot-link{
          font-size:11px;
          font-weight:700;
          color:var(--lime);
          text-decoration:none;
        }
        .forgot-link:hover{opacity:0.75;}

        .btn-submit{
          width:100%;
          background:var(--lime);
          color:#050D05;
          border:none;
          border-radius:8px;
          padding:10px;
          font-family:var(--fn);
          font-size:13px;
          font-weight:900;
          cursor:pointer;
          transition:background .2s,transform .15s,box-shadow .2s;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          letter-spacing:.3px;
          margin-bottom:14px;
        }
        .btn-submit:hover{background:var(--lime2);transform:translateY(-2px);box-shadow:0 6px 24px rgba(127,255,0,0.3);}
        .btn-submit:active{transform:translateY(0);}

        .divider{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
        .div-line{flex:1;height:1px;background:var(--border);}
        .div-text{font-family:var(--fm);font-size:9.5px;color:var(--text3);letter-spacing:1.5px;white-space:nowrap;}

        .social-row{display:flex;justify-content:center;gap:9px;margin-bottom:14px;}
        .social-btn{
          width:40px;
          height:40px;
          border-radius:8px;
          background:var(--bg-input);
          border:1px solid var(--border);
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          text-decoration:none;
          transition:border-color .2s,background .2s,transform .15s;
        }
        .social-btn:hover{border-color:rgba(127,255,0,0.3);background:var(--bg-input-focus);transform:translateY(-2px);}

        .signin-row{
          text-align:center;
          font-size:12px;
          color:var(--text3);
        }
        .signin-row a{
          font-weight:800;
          color:var(--lime);
          text-decoration:none;
        }
        .signin-row a:hover{text-decoration:underline;}

        .error-box{
          margin-bottom:14px;
          background:rgba(255, 0, 0, 0.08);
          border:1px solid rgba(255, 0, 0, 0.2);
          color:#ffb3b3;
          font-size:12px;
          padding:10px 12px;
          border-radius:8px;
        }

        @media(max-width:900px){
          .page{grid-template-columns:1fr;height:auto;overflow:auto;}
          .login-page{overflow:auto;}
          .slider-panel{height:260px;}
          .slide-fade-right{display:none;}
          .form-panel{height:auto;padding:28px 24px;justify-content:flex-start;}
        }
        @media(max-width:540px){
          .form-panel{padding:20px 16px;}
          .slider-panel{height:220px;}
        }
      `}</style>
    </div>
  );
}
