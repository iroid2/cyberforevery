import { communityGallerySources } from "@/lib/gallery-data";

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Expert";
  format: string;
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
  gallery: string[];
}

export const courses: Course[] = [
  {
    id: "CYBER_01",
    title: "Intro to Cybersecurity",
    level: "Beginner",
    format: "Online / In-Person",
    instructor: {
      name: "Alex Volkov",
      role: "Security Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Former intelligence Analyst with a passion for teaching digital self-defense.",
    },
    rating: 4.9,
    reviews: "1.2k",
    price: "$199.00",
    image: communityGallerySources[0],
    description: "The ultimate starting point for digital defenders. Learn to spot threats, secure your network, and understand how hackers think.",
    curriculum: [
      { week: "01", title: "Cyber Mindset", description: "Thinking like a defender.", items: ["Threat Landscape", "Password Security", "2FA Hub"] }
    ],
    outcomes: ["Defend against phishing", "Secure home networks", "Understand basic encryption"],
    gallery: [communityGallerySources[0], communityGallerySources[2], "/gallery/hacker.png"]
  },
  {
    id: "HW_02",
    title: "Intro to Computer Hardware",
    level: "Beginner",
    format: "Online / In-Person",
    instructor: {
      name: "Sarah Chen",
      role: "Systems Architect",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Hardware enthusiast who loves breaking down how machines actually 'think'.",
    },
    rating: 4.8,
    reviews: "850",
    price: "$149.00",
    image: communityGallerySources[1],
    description: "Take the lid off and see what's inside. From CPUs to high-speed RAM, understand the physical components of modern tech.",
    curriculum: [
      { week: "01", title: "The Motherboard", description: "The central nervous system.", items: ["CPU Sockets", "RAM Channels", "Bios Setup"] }
    ],
    outcomes: ["Identify internal parts", "Build a baseline PC", "Troubleshoot hardware failures"],
    gallery: [communityGallerySources[1], communityGallerySources[4], "/gallery/servers.png"]
  },
  {
    id: "NET_03",
    title: "Intro to Networking",
    level: "Intermediate",
    format: "Online / In-Person",
    instructor: {
      name: "Marcus Thorne",
      role: "Network Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Expert in global data transit and distributed systems.",
    },
    rating: 4.7,
    reviews: "920",
    price: "$179.00",
    image: communityGallerySources[2],
    description: "Follow the data. Learn how the internet connects billions of devices using routers, switches, and the magic of TCP/IP.",
    curriculum: [
      { week: "01", title: "IP Fundamentals", description: "Addressing the world.", items: ["IPv4 vs IPv6", "Subnetting Basics", "Gateway Logic"] }
    ],
    outcomes: ["Configure home routers", "Understand DNS layers", "Build local meshes"],
    gallery: [communityGallerySources[2], communityGallerySources[6], "/gallery/data.png"]
  },
  {
    id: "AI_04",
    title: "Intro to AI & Current Trends",
    level: "Beginner",
    format: "Online / In-Person",
    instructor: {
      name: "Elena Rodriguez",
      role: "AI Researcher",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Passionate about making complex AI concepts accessible and ethical.",
    },
    rating: 5.0,
    reviews: "2.5k",
    price: "$129.00",
    image: communityGallerySources[3],
    description: "Beyond the hype. Discover how LLMs, generative art, and neural networks are changing the world right now.",
    curriculum: [
      { week: "01", title: "Neural Basics", description: "How machines learn.", items: ["Prompt Engineering", "Dataset Logic", "Future Specs"] }
    ],
    outcomes: ["Master prompt engineering", "Understand AI ethical risks", "Utilize AI for productivity"],
    gallery: [communityGallerySources[3], communityGallerySources[7], "/gallery/data.png"]
  },
  {
    id: "WEB_05",
    title: "Intro to Web Development",
    level: "Beginner",
    format: "Online only",
    instructor: {
      name: "Jordan Lee",
      role: "Fullstack Dev",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Web creator who believes everyone should have a home on the internet.",
    },
    rating: 4.9,
    reviews: "3.1k",
    price: "$99.00",
    image: communityGallerySources[5],
    description: "Code your own reality. Learn HTML, CSS, and Javascript to build responsive, stunning websites from scratch.",
    curriculum: [
      { week: "01", title: "HTML Skeleton", description: "Structuring the web.", items: ["Semantic Tags", "SEO Basics", "Accessibility"] }
    ],
    outcomes: ["Build a personal portfolio", "Host a live website", "Master CSS Grid & Flex"],
    gallery: [communityGallerySources[5], communityGallerySources[1], "/gallery/servers.png"]
  },
  {
    id: "GD_06",
    title: "Intro to Graphic Design + AI",
    level: "Beginner",
    format: "Online only",
    instructor: {
      name: "Bella Quinn",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
      bio: "Visual storyteller blending traditional design with cutting-edge AI tools.",
    },
    rating: 4.8,
    reviews: "640",
    price: "$149.00",
    image: communityGallerySources[7],
    description: "Design meet Machine. Learn branding principles while workflow-boosting with AI generation tools like Midjourney and Canva.",
    curriculum: [
      { week: "01", title: "Visual Balance", description: "The laws of design.", items: ["Color Theory", "AI Generation", "Logo Systems"] }
    ],
    outcomes: ["Create modern branding", "Generate high-end AI art", "Master design fundamentals"],
    gallery: [communityGallerySources[7], communityGallerySources[6], "/gallery/hacker.png"]
  }
];
