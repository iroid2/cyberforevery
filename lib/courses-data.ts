export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Expert";
  instructor: {
    name: string;
    image: string;
    role: string;
    bio: string;
  };
  rating: number;
  reviews: string;
  price: string;
  image: string;
  description: string;
  curriculum: {
    week: string;
    title: string;
    description: string;
    items: string[];
  }[];
  outcomes: string[];
}

export const courses: Course[] = [
  {
    id: "EH_101",
    title: "Ethical Hacking 101: System Breach",
    level: "Beginner",
    instructor: {
      name: "Alex Volkov",
      role: "Senior Penetration Tester",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd6S49BotECAE8yBTzJsEg5oTg8KGUptnpvg2-ACwD3EjlxiQHdthI_TIJYxoG1i1--oIsBK3RlySU0Q8twcJpyjCmtdUq1Uo3JwUdatbg8Uww1Cszo8kmVRP162Wb8nPaXRVc-Db_Uw1-rhJIADbZ-urL9VKSR5sNNcoznR6o6XlFSNqYZS_Dk98WqWU9-T7Rabe0zwcWe0m-lVj5Di5EL2lvNY10Z6OVqWGdhv7MVagx92Y2MsnPJvL_VQn4lcfL59KB-ZpiuQ",
      bio: "Focuses on the architecture of modern networks and manual exploitation techniques.",
    },
    rating: 4.9,
    reviews: "2.1k",
    price: "$199.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxd8D8RQ2qwrS7PpE6GVsWtINiLrr4FUdm_5cguHqgc7eFTOjprNKC3LE902KCB1U8KbOIIZHqLrNzcT0gBUh4KL3grgb-FW1M4OPBdyCw1h_7ZyD9-HU8a-QNBgzWEuSbosEubx--_SjWMKzVGVkZSEnzJdUk4ChcCdABw2WUJ5yVgPYE6KDN4emX0bw81L-PYKeirJkluiE2GqDkOvUOYQhmC_NtwhEeSMF0CxCC2OSNv08ncA9qxgwIWzQf12JKncCYHtqBQ",
    description: "Master the fundamentals of ethical hacking. Learn how to identify vulnerabilities, exploit systems legally, and build a security mindset from the ground up.",
    curriculum: [
      {
        week: "01",
        title: "Reconnaissance",
        description: "Learn passive and active information gathering techniques.",
        items: ["OSINT Basics", "Whois & DNS Enumeration", "Google Dorking"],
      },
      {
        week: "02",
        title: "Scanning & Enumeration",
        description: "Deep dive into Nmap and service identification.",
        items: ["Network Port Scanning", "Banner Grabbing", "Vulnerability Research"],
      },
      {
        week: "03",
        title: "Exploitation",
        description: "Executing your first system breach in a controlled lab.",
        items: ["Metasploit Fundamentals", "Payload Generation", "Remote Code Execution"],
      },
      {
        week: "04",
        title: "Post-Exploitation",
        description: "Maintaining access and covering your tracks.",
        items: ["Privilege Escalation", "Pivoting", "CTF Competition"],
      },
    ],
    outcomes: [
      "Identify common network vulnerabilities",
      "Execute basic penetration tests",
      "Understand the ethical hacker's legal framework",
      "Build a security lab environment",
    ],
  },
  {
    id: "NET_SEC_02",
    title: "Advanced Network Defense",
    level: "Intermediate",
    instructor: {
      name: "Sarah Chen",
      role: "Security Architect",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi_b5pfJUbhEhNRpXWORt_a6pqKgjq_VhBkLK41S3IfD6Vf3hZFyBf03dz__KGVVdO2ZPtnvMr9sCyROgATuHInlXZ-o3l8T3SV8az95sbg-nJ63RYzqSID0RAPw7QYYJYp5tPaGvESe1zkY9wltCCS6L-9CRrokiNdQafh-avxo6pFu1C7OwAzFenxF1_VMbqAoQ_AXfeiTMQKihPlG0Mnwo5bgZJHeFfWZVE1A1s4tsfMgpOHtuXKdf8L9FKr7cfUXkGR1icIA",
      bio: "Expert in hardening enterprise infrastructures and implementing zero-trust architectures.",
    },
    rating: 4.8,
    reviews: "1.4k",
    price: "$299.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB65mWNPi-OAeX1vCMXkNf0caKOVd0hVuerkeg6KN08OTHYd96woeUbIVmuQ7NWG3nqcQGS9DAAOtuQGWYq-uIu6GqWYYAjSlJnaFEEHdEGEwWWrpYic0k6TRd9Mo7S4J97yFLTck3YFomH_X8kzt_NhU6ANoPnoE2TqPFbwjaTY9J3KLZx4ND0bpdpzxovko_pBmIQHGyOodmh76c-leM1Q34Atzvea1j1EK0MEPpI93ib3ADI9loRqN9rlnoO4H-gn4UgR5eHjw",
    description: "Shift your perspective to the defensive. Learn how to monitor, detect, and respond to advanced persistent threats (APTs) in real-time.",
    curriculum: [
      {
        week: "01",
        title: "Intrusion Detection",
        description: "Setting up and configuring Snort and Zeek.",
        items: ["Packet Analysis", "Signature Based Detection", "Anomaly Detection"],
      },
      {
        week: "02",
        title: "Firewall Orchestration",
        description: "Managing complex rule-sets across hybrid clouds.",
        items: ["Next-Gen Firewalls", "IPS/IDS Integration", "VLAN Segmentation"],
      },
      {
        week: "03",
        title: "Incident Response",
        description: "The tactical playbook for handling data breaches.",
        items: ["Forensic Data Collection", "Containment Strategies", "Malware Analysis"],
      },
      {
        week: "04",
        title: "Hardening",
        description: "Zero-Trust and Active Directory security.",
        items: ["Identity Management", "GPO Hardening", "Endpoint Security"],
      },
    ],
    outcomes: [
      "Design secure network architectures",
      "Deploy and manage enterprise SIEMs",
      "Conduct post-breach digital forensics",
      "Implement Zero-Trust principles",
    ],
  },
  {
    id: "AI_EXP_09",
    title: "AI Exploitation Frameworks",
    level: "Expert",
    instructor: {
      name: "Marcus Thorne",
      role: "AI Security Researcher",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiFH_rN38dR0el6mf3KtT7Yde2por-Zw8WWJX9zSM1lWPKQwR6z7sDuLK2WSvx8m1B1EZeMM_iU4neW8e7AHnS5ii_1FdADaaXtaUP604ndYAW9NY2fxLwLNpXbhaOw3PzRLm-fAob_Uo0bw32m5J8pBakkTojEitKBKq5Q48l2XZt3G_pj0VKYuNk7wAjIm5bGzQE6ZrYU4DoBWOKvivz-YSh8p-Bm5lJmEvYbAjzZaVEBJ3usiBJZyhwmY6fgffdW53QDf2eDg",
      bio: "Pioneer in adversarial machine learning and automated exploit generation.",
    },
    rating: 5.0,
    reviews: "840",
    price: "$450.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArn8b6oxiu-Ejzzjo4C2gcqVfMz0rCEN9kumkg1ZlVd_WPdUoWAt5cGCIfZyhGRpklJiXrELL3jUDMI_kizZ1IzG_ADH6qMF3IhvIk173v_nNg3IHUwnk4xo1dj64-Vh_tML4lVShazqrX6v7TV2XmlnnjyOmzcSXxcsk0lvWgV25srkhq3g8RVQrdXXtvp-0p4fhMC5i2DHY2RPm9ivtE7bybtUMz_bWWb31Z4vEIG4HENP1Us71TBfQAytppYOlPt0wUO3H2gg",
    description: "The frontier of cybersecurity. Explore how Artificial Intelligence is used to both automate attacks and simulate sophisticated adversaries at scale.",
    curriculum: [
      {
        week: "01",
        title: "Adversarial ML",
        description: "Tricking models through data poisoning and evasion.",
        items: ["TensorFlow Security", "Model Inversion", "Membership Inference"],
      },
      {
        week: "02",
        title: "LLM Security",
        description: "Prompt injection and jailbreaking large language models.",
        items: ["Prompt Engineering Attacks", "Context Window Hijacking", "Data Exfiltration via AI"],
      },
      {
        week: "03",
        title: "Automated Exploitation",
        description: "Using AI to find 0-day vulnerabilities.",
        items: ["Fuzzing and AI", "Automated Exploit Generation", "Crashes to PoCs"],
      },
      {
        week: "04",
        title: "AI Defensive Agents",
        description: "Autonomous security units for real-time patching.",
        items: ["Self-Healing Networks", "AI Guardrails", "The Future of Synth-Sec"],
      },
    ],
    outcomes: [
      "Audit AI models for security flaws",
      "Develop autonomous red-teaming agents",
      "Secure LLM-integrated applications",
      "Understand the ethics of AI weaponry",
    ],
  },
];
