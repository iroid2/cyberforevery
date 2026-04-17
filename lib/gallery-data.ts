export type GalleryCategory =
  | "bootcamp"
  | "classroom"
  | "community"
  | "creative";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: GalleryCategory;
  featured?: boolean;
};

export const communityGallerySources = [
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8qHsox9nyAOp8TL5EWmesfPIg3D4yNcvGFhkB",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8YEbOMfrgxBtFpfRjJ320qywb8icAXMOmDhan",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8XyvfQQMHwx7XNe0JFOud5tZaCBMGfn91PWhi",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8z64rfDuViodsYZLp3maXnTElI2cO6hrDHyBf",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8zrcISJViodsYZLp3maXnTElI2cO6hrDHyBfJ",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8Fq1SD7YTuioZrkO7jzTmKc1VNbxf2h0PGUyJ",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8wle94y1TdHBc4CLpiZkSoOhwfayE2nrK9lDe",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8RvDsfyqvs4VaLrIlz9TwiRWhDKUtmfM7gn0x",
] as const;

export const galleryCategories: Array<{
  value: "all" | GalleryCategory;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "bootcamp", label: "Bootcamp" },
  { value: "classroom", label: "Classroom" },
  { value: "community", label: "Community" },
  { value: "creative", label: "Creative" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "group-cybersecurity-training",
    src: "/cybersecurity-training-diverse-group.jpg",
    alt: "Students learning cybersecurity together in a group training session",
    title: "Collaborative Cyber Lab",
    description: "Team-based cybersecurity learning designed for curious beginners.",
    category: "bootcamp",
    featured: true,
  },
  {
    id: "classroom-computer-safety",
    src: "/students-learning-computer-safety-in-classroom.jpg",
    alt: "Students in a classroom learning computer safety skills",
    title: "Computer Safety Sessions",
    description: "Hands-on digital safety lessons in a guided classroom environment.",
    category: "classroom",
    featured: true,
  },
  {
    id: "community-photo-01",
    src: communityGallerySources[0],
    alt: "Community members engaging in a cyber4every1 learning session",
    title: "Neighborhood Learning Hub",
    description: "Community-first teaching moments that make cybersecurity welcoming and visible.",
    category: "community",
    featured: true,
  },
  {
    id: "community-photo-02",
    src: communityGallerySources[1],
    alt: "Participants gathered for a collaborative technology learning experience",
    title: "Shared Digital Growth",
    description: "Families and learners building confidence together in a supportive setting.",
    category: "community",
    featured: true,
  },
  {
    id: "community-photo-03",
    src: communityGallerySources[2],
    alt: "Learners taking part in a cyber education workshop",
    title: "Workshop Momentum",
    description: "Practical sessions that turn curiosity into applied digital safety skills.",
    category: "community",
  },
  {
    id: "community-photo-04",
    src: communityGallerySources[3],
    alt: "Community session focused on digital literacy and cyber awareness",
    title: "Digital Confidence",
    description: "Real-world cyber awareness taught in an approachable, human-centered way.",
    category: "community",
  },
  {
    id: "community-photo-05",
    src: communityGallerySources[4],
    alt: "Students and families attending a community-oriented tech program",
    title: "Family Access Point",
    description: "Learning spaces built to involve students, parents, and the wider community.",
    category: "community",
  },
  {
    id: "community-photo-06",
    src: communityGallerySources[5],
    alt: "Participants collaborating during a cyber skills event",
    title: "Peer Collaboration",
    description: "Interactive moments that make cybersecurity social, practical, and memorable.",
    category: "community",
  },
  {
    id: "community-photo-07",
    src: communityGallerySources[6],
    alt: "Community learners engaging with a technology and safety workshop",
    title: "Tech For Everyone",
    description: "Inclusive programming that opens the door to cyber skills for every learner.",
    category: "community",
  },
  {
    id: "community-photo-08",
    src: communityGallerySources[7],
    alt: "Cyber4every1 community experience showing learners in an active session",
    title: "Mission In Motion",
    description: "A closer look at the energy, connection, and hands-on spirit of the program.",
    category: "community",
  },
  {
    id: "diverse-learning-group",
    src: "/diverse-group-of-people-learning-cybersecurity-tog.jpg",
    alt: "Diverse group of people studying cybersecurity together",
    title: "Inclusive Cohorts",
    description: "Small-group learning built around confidence, collaboration, and curiosity.",
    category: "classroom",
  },
  {
    id: "team-office-training",
    src: "/business-team-cybersecurity-training-office.jpg",
    alt: "Business team participating in a cybersecurity training session",
    title: "Professional Readiness",
    description: "Training experiences that connect student learning to real-world practice.",
    category: "bootcamp",
  },
  {
    id: "servers-visual",
    src: "/gallery/servers.png",
    alt: "Illustrated server racks representing digital infrastructure",
    title: "Infrastructure Concepts",
    description: "Visual storytelling for networking, systems, and platform foundations.",
    category: "creative",
  },
  {
    id: "hacker-visual",
    src: "/gallery/hacker.png",
    alt: "Cyber-themed illustration representing ethical hacking education",
    title: "Cyber Concepts",
    description: "Creative visuals that make technical ideas feel approachable and memorable.",
    category: "creative",
  },
  {
    id: "data-visual",
    src: "/gallery/data.png",
    alt: "Illustrated data visualization related to cybersecurity and information systems",
    title: "Data Literacy",
    description: "Images that support lessons in data awareness, risk, and digital thinking.",
    category: "creative",
  },
];

export const featuredGalleryItems = galleryItems.filter((item) => item.featured).slice(0, 4);
