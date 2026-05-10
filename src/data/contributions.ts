/* ═══════════════════════════════════════════════════════
 *  Projects / Featured Works
 * ═══════════════════════════════════════════════════════ */

export type ProjectTag = "personal" | "open-source" | "work" | "side-project" | "hackathon" | "freelance" | "volunteer";

export interface Project {
  /** Unique id */
  id: string;
  /** Project name */
  title: string;
  /** What the project is / what you did */
  description: string;
  /** Longer write-up (rendered below the description) */
  writeup?: string;
  /** Optional GitHub repo URL */
  repoUrl?: string;
  /** Optional live / demo URL */
  liveUrl?: string;
  /** Optional screenshot path (relative to public/) */
  screenshot?: string;
  /** Tech stack tags */
  techStack?: string[];
  /** Category */
  tag: ProjectTag;
  /** When you worked on it (free-form, e.g. "2023 – Present") */
  period?: string;
  /** Is this a highlighted / featured project? */
  featured?: boolean;
}

/** Human-friendly labels for project tags */
export const projectTagLabels: Record<ProjectTag, string> = {
  personal: "Personal",
  "open-source": "Open Source",
  work: "Work",
  "side-project": "Side Project",
  hackathon: "Hackathon",
  freelance: "Freelance",
  volunteer: "Volunteer",
};

/** Accent color classes for project tags */
export const projectTagColors: Record<ProjectTag, string> = {
  personal: "bg-accent/15 text-accent border-accent/30",
  "open-source": "bg-accent/15 text-accent border-accent/30",
  work: "bg-primary/15 text-primary border-primary/30",
  "side-project": "bg-primary/15 text-primary border-primary/30",
  hackathon: "bg-warm/15 text-warm border-warm/30",
  freelance: "bg-primary/15 text-primary border-primary/30",
  volunteer: "bg-warm/15 text-warm border-warm/30",
};

/*
 * ── Sample projects ──
 *
 * Replace with your real projects. Screenshots go in /public/screenshots/.
 */
export const projects: Project[] = [
  {
    id: "receiptly",
    title: "Receiptly – An iOS and Android app for scanning and organizing receipts",
    description:
      "A cross-platform mobile app built with React Native that allows users to easily scan, categorize, and search their receipts. Integrated OCR for automatic data extraction and cloud sync for access across devices.",
    writeup:
      "Built as a side project to solve my own problem of managing piles of paper receipts. OpenAI API was used for extracting key information like merchant, date, and total from receipt images. The app also features a dashboard for tracking spending trends over time.",
    techStack: ["TypeScript", "React Native", "OpenAI API", "Firebase"],
    tag: "side-project",
    period: "2025 – Present",
    featured: true,
  },
  {
    id: "tahsin-us",
    title: "tahsin.us – Personal Portfolio & Blog",
    description: "My personal website and blog built from scratch. Features a photography gallery, bento-style about page, MDX-powered blog, and custom theme system.",
    liveUrl: "https://tahsin.us",
    repoUrl: "https://github.com/tahsinature/tahsin.us",
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "MDX", "Kubernetes"],
    tag: "personal",
    period: "2024 – Present",
    featured: true,
  },
  {
    id: "roomflix",
    title: "Roomflix – Synced video playback for any public URL",
    description:
      "A web app that lets a group watch the same video together in sync. Create a room, share the link, paste any public video URL — play/pause/seek/mute mirror to everyone in real time.",
    writeup:
      "Built with a Bun-native WebSocket server and React/Vite frontend in one repo. The server holds canonical per-room state and clients send intent messages; late joiners extrapolate playback time forward using server clock skew. No auth or DB — rooms live in memory and are swept after idle.",
    liveUrl: "https://roomflix.tahsin.us",
    repoUrl: "https://github.com/tahsinature/roomflix",
    techStack: ["TypeScript", "Bun", "React", "Vite", "Tailwind CSS", "WebSocket"],
    tag: "open-source",
    period: "2026 – Present",
  },
  {
    id: "muslim-tools",
    title: "Muslim Tools: iOS, Android, and Web Utility App",
    description: "A cross-platform app providing prayer times, Qibla direction, and Islamic calendar features. Built with React Native and deployed on both app stores and the web.",
    // liveUrl: "https://muslim-tools.tahsin.us",
    screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    techStack: ["TypeScript", "React Native", "Hono"],
    tag: "side-project",
    period: "2026 – Present",
  },
  {
    id: "typa",
    title: "Typa: A Swiss-Army Knife for Developers",
    description:
      "Type math expressions with natural language, convert units and currencies in real time, diff text and images, render diagrams, generate code screenshots, and run 48+ developer transforms — all from a single window with a Monaco-powered editor.",
    repoUrl: "https://github.com/tahsinature/typa",
    screenshot: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    techStack: ["TypeScript", "Monaco Editor"],
    tag: "open-source",
    period: "2025 – Present",
  },
  {
    id: "hardbrake",
    title: "HardBrake: A Fast, A robust media compressor",
    description: "A fast and efficient media compression tool built with Tauri and Rust. It supports a wide range of formats and offers a user-friendly interface for both basic and advanced users.",
    repoUrl: "https://github.com/tahsinature/hardbrake",
    screenshot: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    techStack: ["Rust", "Tauri 2.0"],
    tag: "open-source",
    period: "2021 – Present",
  },
  {
    id: "cci",
    title: "CCI – Center for Cultural Integrity",
    description: "Built and maintain the official website for CCI, a nonprofit dedicated to preserving and promoting cultural heritage and identity.",
    liveUrl: "https://culturalintegrity.org",
    screenshot: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    techStack: ["React", "Vite", "MDX", "TypeScript"],
    tag: "volunteer",
    period: "2024 – Present",
    // featured: true,
  },
  {
    id: "amod",
    title: "AMOD – Arakan Mayyu Organization for Development",
    description: "Developed and maintain the website for AMOD, a community-driven organization focused on settlement services for the new comers in Ontario, Canada.",
    liveUrl: "https://arakanmayyu.tahsin.us/",
    screenshot: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    techStack: ["React", "Vite", "MDX", "TypeScript"],
    tag: "volunteer",
    period: "2024 – Present",
    // featured: true,
  },
];

/* ═══════════════════════════════════════════════════════
 *  Community Contributions (Activity Log)
 *
 *  Each entry represents a public contribution — a PR, comment, answer,
 *  issue, talk, blog post, or any other community interaction.
 *
 *  Add new entries at the top (newest first).
 * ═══════════════════════════════════════════════════════ */

export type ContributionTag = "pull-request" | "comment" | "issue" | "answer" | "blog-post" | "talk" | "review" | "open-source";

export type ContributionPlatform = "github" | "stackoverflow" | "dev.to" | "medium" | "youtube" | "twitter" | "other";

export interface Contribution {
  /** Unique id */
  id: string;
  /** Short title describing the contribution */
  title: string;
  /** Brief description — what you did, how it helped */
  description?: string;
  /** Link to the contribution */
  url: string;
  /** ISO date string (YYYY-MM-DD) */
  date: string;
  /** What kind of contribution */
  tag: ContributionTag;
  /** Where it happened */
  platform: ContributionPlatform;
  /** Optional: repo or project name (e.g. "facebook/react") */
  repo?: string;
}

/*
 * ── Sample contributions ──
 *
 * Replace these with your real contributions. They're here so
 * the page isn't empty when you first load it.
 */
export const contributions: Contribution[] = [
  {
    id: "amazon-pay-vuln-fix",
    title: "Fixed moderate & high vulnerabilities in Amazon Pay Node.js SDK",
    description: "Submitted a PR to upgrade axios and chai, resolving known moderate and high security vulnerabilities in Amazon's official Pay API SDK.",
    url: "https://github.com/amzn/amazon-pay-api-sdk-nodejs/pull/22",
    date: "2024-02-05",
    tag: "pull-request",
    platform: "github",
    repo: "amzn/amazon-pay-api-sdk-nodejs",
  },
  {
    id: "raycast-open-in-browser",
    title: "Requested 'Open in Browser' action for port-manager extension",
    description: "Proposed adding a button to open a port directly in the browser — handy when juggling multiple projects and forgetting which port maps to what.",
    url: "https://github.com/raycast/extensions/issues/10283",
    date: "2024-01-22",
    tag: "issue",
    platform: "github",
    repo: "raycast/extensions",
  },
  {
    id: "lazygit-copy-commit-url",
    title: "Reported error when copying Commit URL in lazygit",
    description: "Filed a bug with reproduction steps and screenshots showing the commit URL copy action crashing. Led to PR #3007 being merged within days.",
    url: "https://github.com/jesseduffield/lazygit/issues/3002",
    date: "2023-09-10",
    tag: "issue",
    platform: "github",
    repo: "jesseduffield/lazygit",
  },
  {
    id: "air-port-in-use",
    title: "Commented on 'port address already in use' issue in Air",
    description: "Contributed to a long-running discussion around Air's hot-reload leaving orphan processes, helping narrow down reproduction steps.",
    url: "https://github.com/air-verse/air/issues/216#issuecomment-983550776",
    date: "2021-11-25",
    tag: "comment",
    platform: "github",
    repo: "air-verse/air",
  },
  {
    id: "notable-unused-attachments",
    title: "Requested ability to scan and delete unused attachments in Notable",
    description: "Proposed a cleanup command to detect orphaned attachment files created by undo/re-paste cycles. Acknowledged as useful by the maintainer.",
    url: "https://github.com/notable/notable/issues/1326",
    date: "2020-09-30",
    tag: "issue",
    platform: "github",
    repo: "notable/notable",
  },
  {
    id: "clipto-duplicate-notes",
    title: "Reported all notes getting duplicated in Clipto",
    description: "Reported a critical duplication bug affecting 7 000+ notes. Root cause turned out to be a browser-specific sync issue; fixed in a subsequent release.",
    url: "https://github.com/clipto-pro/Desktop/issues/60",
    date: "2020-05-05",
    tag: "issue",
    platform: "github",
    repo: "clipto-pro/Desktop",
  },
  {
    id: "clipto-disable-shortcuts",
    title: "Requested option to disable individual shortcuts in Clipto",
    description: "Filed a feature request to allow disabling specific keyboard shortcuts that conflicted with VS Code. Shipped in Clipto v2.4.0.",
    url: "https://github.com/clipto-pro/Desktop/issues/43",
    date: "2020-03-06",
    tag: "issue",
    platform: "github",
    repo: "clipto-pro/Desktop",
  },
];

/** All tags that exist in the contributions list */
export const contributionTags: ContributionTag[] = ["pull-request", "comment", "issue", "answer", "blog-post", "talk", "review", "open-source"];

/** Human-friendly labels for tags */
export const tagLabels: Record<ContributionTag, string> = {
  "pull-request": "Pull Request",
  comment: "Comment",
  issue: "Issue",
  answer: "Answer",
  "blog-post": "Blog Post",
  talk: "Talk",
  review: "Review",
  "open-source": "Open Source",
};

/** Accent color class for each tag (Tailwind) */
export const tagColors: Record<ContributionTag, string> = {
  "pull-request": "bg-accent/15 text-accent border-accent/30",
  comment: "bg-accent/15 text-accent border-accent/30",
  issue: "bg-warm/15 text-warm border-warm/30",
  answer: "bg-primary/15 text-primary border-primary/30",
  "blog-post": "bg-primary/15 text-primary border-primary/30",
  talk: "bg-warm/15 text-warm border-warm/30",
  review: "bg-accent/15 text-accent border-accent/30",
  "open-source": "bg-accent/15 text-accent border-accent/30",
};

/** Border-left accent for each tag */
export const tagBorderColors: Record<ContributionTag, string> = {
  "pull-request": "border-l-accent",
  comment: "border-l-accent",
  issue: "border-l-warm",
  answer: "border-l-primary",
  "blog-post": "border-l-primary",
  talk: "border-l-warm",
  review: "border-l-accent",
  "open-source": "border-l-accent",
};

/** Platform display labels */
export const platformLabels: Record<ContributionPlatform, string> = {
  github: "GitHub",
  stackoverflow: "Stack Overflow",
  "dev.to": "DEV",
  medium: "Medium",
  youtube: "YouTube",
  twitter: "Twitter",
  other: "Web",
};
