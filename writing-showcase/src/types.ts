export interface Writing {
  id: string;
  title: string;
  content: string;
  backgroundImageUrl?: string;
  musicEmbedCode?: string;
  createdAt: number;
}

export interface SiteSettings {
  musicEmbedCode: string;
  siteTitle: string;
}

export type ViewState = "home" | "writing" | "admin";
