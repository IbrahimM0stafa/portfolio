export type ProjectDeviceType = 'desktop' | 'mobile' | 'responsive';

export interface ProjectView {
  id: string;
  label: string;
  imagePath: string;
  fallbackImagePath?: string;
  altText: string;
  caption?: string;
  videoPath?: string;
  deviceType?: ProjectDeviceType;
  isOverlayMobile?: boolean; // For layered desktop + mobile compositions
  badge?: string;
  isVerifiedAsset?: boolean; // Genuine asset vs application preview blueprint
  browserUrl?: string;       // Fake address-bar URL shown in the browser mockup
}

export interface ProjectMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProjectTech {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'database' | 'ai';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: string;
  period: string;
  summary: string;
  problemStatement: string;
  engineeringSolutions: string[];
  keyFeatures: string[];
  techStack: ProjectTech[];
  metrics?: ProjectMetric[];
  views: ProjectView[];
  caseStudyUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  accentColor?: string;
}
