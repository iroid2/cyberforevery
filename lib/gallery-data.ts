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

// Community gallery sources (used by courses-data.ts)
export const communityGallerySources = [
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t87XXEHVNFoWJQIlN2Pe8w30c9b4qDOikhXGdn",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t80f6WILihKT2r14c95UZpu0o3EFidHWSafGxV",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t802BjB8ihKT2r14c95UZpu0o3EFidHWSafGxV",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8ODYI1nW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8wOEDHt1TdHBc4CLpiZkSoOhwfayE2nrK9lDe",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8FqKuA72TuioZrkO7jzTmKc1VNbxf2h0PGUyJ",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8O0pRm3W8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yepwTJ0RPSIe6TDhV9XWsvMcGraNqgwEmzui",
] as const;

// Custom high-speed CDN image URLs uploaded by user (Prompt 1 + Prompt 2)
export const userUploadedImages = [
  // First Prompt List
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t87XXEHVNFoWJQIlN2Pe8w30c9b4qDOikhXGdn",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t80f6WILihKT2r14c95UZpu0o3EFidHWSafGxV",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t802BjB8ihKT2r14c95UZpu0o3EFidHWSafGxV",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8ODYI1nW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8wOEDHt1TdHBc4CLpiZkSoOhwfayE2nrK9lDe",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8FqKuA72TuioZrkO7jzTmKc1VNbxf2h0PGUyJ",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8O0pRm3W8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yepwTJ0RPSIe6TDhV9XWsvMcGraNqgwEmzui",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t83QTDoUv2cxDPot7frdL5SvRUBs8Q0AC6GaJ4",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8OYF6pMW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8RCn2Weqvs4VaLrIlz9TwiRWhDKUtmfM7gn0x",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t877kZKGNFoWJQIlN2Pe8w30c9b4qDOikhXGdn",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yA8aSNJ0RPSIe6TDhV9XWsvMcGraNqgwEmzu",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8NSeY8JagqnOh5H4dDv2lif0wKbIMVPuSpCFy",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t801wWpxmihKT2r14c95UZpu0o3EFidHWSafGx",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8mBxdpBo58PZtKOgQnYrzTxiyVpudJGm1LDI2",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8zhRnrRViodsYZLp3maXnTElI2cO6hrDHyBfJ",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8vrreHwVEYuwQKZqdokbhXVzrBS9HW8MJDFga",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8rggKJ0sxMoeJ7tw9RXijWsI5bu83vL2nGkFh",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8uzI4aIgymJ8btZNWToDUY5lCQVjFxdGgi34P",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8pnfKihuv3ExQ8CUXtJmWVNj1su0MTinPZAr2",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8SGPRSVefH5JyuwjqUEFr0Ll4cAeOz6dXDbmo",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t88d9zWzQFCmUcehZsVgfiAlPRjzXOkpwdb7H4",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8rdTLfesxMoeJ7tw9RXijWsI5bu83vL2nGkFh",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8aMrcqJmyq6NFrL4KdIVf3wHvu1ZOiE5UozA9",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8afTCw0myq6NFrL4KdIVf3wHvu1ZOiE5UozA9",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t88cPTw5QFCmUcehZsVgfiAlPRjzXOkpwdb7H4",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8h3aLszXoMejIGxz2SLPydDTt4kQgCnhKRqu8",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t81QAFu8KdTQbjBVpME0F2hvDuzsgXckrNISG4",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8RJKo5z9qvs4VaLrIlz9TwiRWhDKUtmfM7gn0",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8No2IHSxagqnOh5H4dDv2lif0wKbIMVPuSpCF",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t875C17jNFoWJQIlN2Pe8w30c9b4qDOikhXGdn",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8O37fJmW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8mDEz24o58PZtKOgQnYrzTxiyVpudJGm1LDI2",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8IYbVT7DjbkgVAKYL6ZdJlD09s175otUXEupf",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8ZQcfgN5YEBzVbFtpK13nGkdq6SxWh9erPmJA",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8wUnnD01TdHBc4CLpiZkSoOhwfayE2nrK9lDe",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8YPbGYargxBtFpfRjJ320qywb8icAXMOmDhan",

  // Second Prompt List
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8bQ5wBEfEmWbSlTeqdPBJ2KkDuc6zsywVZgj5",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8bQIifEmWbSlTeqdPBJ2KkDuc6zsywVZgj5XL",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t88DSZZatQFCmUcehZsVgfiAlPRjzXOkpwdb7H",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8mx7JFao58PZtKOgQnYrzTxiyVpudJGm1LDI2",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8fRE32i6F8xjb9tm1RkKOzPyEXUFQfgi502LW",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yNaaqhJ0RPSIe6TDhV9XWsvMcGraNqgwEmzu",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8eKakhubd5t8vw2Pe9ZOpUHK3RhlDrnsYAf0a",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8EznhgmYgzncEesuyHfDNhvjrTRXF8BPmaUA6",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8peSLwGuv3ExQ8CUXtJmWVNj1su0MTinPZAr2",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8OuGRxSW8LhVaWDv6j9MsJfrBtSzIw0EAiPTN",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8yksR5RJ0RPSIe6TDhV9XWsvMcGraNqgwEmzu",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8inLDjbw2UWqGFPY4AegalDf1Xdprw8RSQhbs",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8HuT58S0Mbsr6w5xj2YUkt3PcmXF41aAJN078",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8IPSFxrDjbkgVAKYL6ZdJlD09s175otUXEupf",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8iix2i1w2UWqGFPY4AegalDf1Xdprw8RSQhbs",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8bWGkmsfEmWbSlTeqdPBJ2KkDuc6zsywVZgj5",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t85OzRdDSi9txM7yXkWu4dRgvbF0qaGUpEAcmB",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8RZH8R1qvs4VaLrIlz9TwiRWhDKUtmfM7gn0x",
  "https://wfe66b5s5b.ufs.sh/f/eFFUio8bd5t8B4cWr1lvjMAnx0Npsme1VF2PTGXZg5HE8UWl"
];

// Helper to filter out duplicate links if any
export const uniqueUserImages = Array.from(new Set(userUploadedImages));

export const galleryCategories: Array<{
  value: "all" | GalleryCategory;
  label: string;
}> = [
  { value: "all", label: "All Works" },
  { value: "bootcamp", label: "Bootcamp Labs" },
  { value: "classroom", label: "Classrooms" },
  { value: "community", label: "Communities" },
  { value: "creative", label: "Cyber Art" },
];

// Metadata matrices to programmatically name and describe these dynamic pictures
const categoryInfo = {
  bootcamp: {
    titles: [
      "Penetration Lab Simulation", "Defense Topology Audit", "Threat Vector Intercept", 
      "Incident Response Console", "Cryptographic Decoupler", "Server Firewall Harden",
      "Memory Security Forensics", "Network Routing Sandbox", "Malware Sandbox Environment"
    ],
    descriptions: [
      "Students audit system configurations to construct a robust local network defense line.",
      "Live simulations tracing server intrusion payloads and executing incident remediation.",
      "Analyzing host flow logs to intercept unauthorized terminal commands and socket bridges.",
      "A deep dive into server virtualization security policies and kernel access rules.",
      "Students study key exchange protocols to safeguard identity certificates."
    ]
  },
  classroom: {
    titles: [
      "Active Terminal Exploration", "Hardware Assembly Study", "Peer Protocol Alignment", 
      "Collaborative Code Review", "Visual DNS Diagnostic", "System Integrity Lab",
      "Network Interface Config", "Mainframe Flow Diagrams", "BIOS Interface Sandbox"
    ],
    descriptions: [
      "Middle-school classroom working on safe browsing habits and hardware architectures.",
      "Hands-on teardown sessions examining storage units, registers, and clock cycles.",
      "Group discussions identifying phishing headers and social engineering patterns.",
      "Live instruction mapping local gateway address masks and DNS lookup steps.",
      "Students working in pair programming labs to implement secure loops and checks."
    ]
  },
  community: {
    titles: [
      "Cybersecurity Hub Briefing", "Intergenerational Web Hub", "Neighborhood Defense Sync", 
      "Public Safety Hackathon", "Inclusive Cyber Meetup", "Community Safe-Tech Forum",
      "Digital Literacy Seminar", "Parent Awareness Session", "Family Tech Safety Sync"
    ],
    descriptions: [
      "Local community centers gathering to learn foundational account security protocols.",
      "Removing age barriers. Senior citizens and teens sharing secure digital practices.",
      "Making digital defense visible, inviting, and practical in neighborhood libraries.",
      "Free public workshops guiding parents on smart home device configurations.",
      "Building general confidence in everyday communications, files, and links."
    ]
  },
  creative: {
    titles: [
      "Neural Defense Core", "Digital Matrix Gateway", "Abstract Packet Stream", 
      "Biometric Node Encryption", "Silicon Threat Spectrum", "Virtual Sandboxed Kernel",
      "Hypervisor Grid Vector", "Decentralized Key Ledger", "Quantum Secure Tunnel"
    ],
    descriptions: [
      "A conceptual digital render illustrating microchip flow security and neural defense.",
      "Visualizing encrypted data packets traversing complex mesh and gateway networks.",
      "Abstract art representing cloud isolation mechanisms and virtualization sandboxes.",
      "Creative illustrations designed to make core networking concepts memorable.",
      "Futuristic representations of server stack infrastructure and clean cyber assets."
    ]
  }
};

// Generate comprehensive dataset by distributing user images across the categories
export const galleryItems: GalleryItem[] = uniqueUserImages.map((src, index) => {
  const categories: GalleryCategory[] = ["bootcamp", "classroom", "community", "creative"];
  // Deterministic distribution based on index
  const category = categories[index % categories.length];
  const info = categoryInfo[category];
  
  const titleIndex = index % info.titles.length;
  const descIndex = index % info.descriptions.length;
  
  const title = info.titles[titleIndex];
  const description = info.descriptions[descIndex];
  
  return {
    id: `user-gallery-item-${index}`,
    src,
    alt: `${title} - cyber4every1 cybersecurity training visual`,
    title,
    description,
    category,
    featured: index % 6 === 0, // Mark every 6th item as featured
  };
});

export const featuredGalleryItems = galleryItems.filter((item) => item.featured).slice(0, 4);
