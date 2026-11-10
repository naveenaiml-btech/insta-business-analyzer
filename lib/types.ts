export interface InstagramProfile {
  username: string;
  fullName: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  website?: string;
  email?: string;
  phone?: string;
  recentCaptions: string[];
}

export interface AnalysisResult {
  business_name: string;
  category: string;
  services: string[];
  content_themes: string[];
  target_audience: string;
  contact_info: {
    email?: string;
    phone?: string;
    website?: string;
    location?: string;
  };
  interest_level: "low" | "medium" | "high";
  tags: string[];
  recommended_action: string;
  summary: string;
}

export interface AnalysisRow extends AnalysisResult {
  id: string;
  created_at: string;
  instagram_url: string;
  username: string;
}
