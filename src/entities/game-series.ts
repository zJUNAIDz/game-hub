export interface GameSeriesGame {
  id?: number;
  slug?: string;
  name?: string;
  released?: string;
  tba?: boolean;
  background_image?: string;
  rating?: number;
  rating_top?: number;
  ratings?: Record<string, unknown>;
  ratings_count?: number;
  reviews_text_count?: string;
  added?: number;
  added_by_status?: Record<string, unknown>;
  metacritic?: number;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;
  esrb_rating?: EsrbRating;
  platforms?: Platform[];
}

export interface EsrbRating {
  id?: number;
  slug?: string;
  name?: string;
}

export interface Platform {
  platform?: PlatformDetails;
  released_at?: string;
  requirements?: Requirements;
}

export interface PlatformDetails {
  id?: number;
  slug?: string;
  name?: string;
}

export interface Requirements {
  minimum?: string;
  recommended?: string;
}
