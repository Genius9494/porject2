export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  src: any;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  description_raw: string;
  background_image_additional?: string;
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: any | null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: Platform[];
  parent_platforms: ParentPlatform[];
  //  السعر
  price: number;
  //  السعر
  genres: Genre[];
  stores: Store[];
  clip: string | null;
  tags: Tag[];
  esrb_rating: EsrbRating | null;
  short_screenshots: Screenshot[];
  
}

// دالة لتطبيع البيانات غير الكاملة
export const normalizeGame = (partial: Partial<Game>): Game => {
  return {
    id: partial.id ?? 0,
    slug: partial.slug ?? '',
    name: partial.name ?? 'Unknown Game',
    released: partial.released ?? 'Unknown',
    src: partial.src ?? '',
    //  السعر
    price: partial.price ?? 0, 
    //  السعر    


    tba: partial.tba ?? false,
    background_image: partial.background_image ?? '',
    rating: partial.rating ?? 0,
    rating_top: partial.rating_top ?? 5,
    ratings: partial.ratings ?? [],
    ratings_count: partial.ratings_count ?? 0,
    reviews_text_count: partial.reviews_text_count ?? 0,
    added: partial.added ?? 0,
    added_by_status: partial.added_by_status ?? {
      yet: 0,
      owned: 0,
      beaten: 0,
      toplay: 0,
      dropped: 0,
      playing: 0
    },
    description_raw: partial.description_raw ?? '',
    background_image_additional: partial.background_image_additional ?? '',
    metacritic: partial.metacritic ?? null,
    playtime: partial.playtime ?? 0,
    suggestions_count: partial.suggestions_count ?? 0,
    updated: partial.updated ?? '',
    user_game: partial.user_game ?? null,
    reviews_count: partial.reviews_count ?? 0,
    saturated_color: partial.saturated_color ?? '',
    dominant_color: partial.dominant_color ?? '',
    platforms: partial.platforms ?? [],
    parent_platforms: partial.parent_platforms ?? [],
    genres: partial.genres ?? [],
    stores: partial.stores ?? [],
    clip: partial.clip ?? null,
    tags: partial.tags ?? [],
    esrb_rating: partial.esrb_rating ?? null,
    short_screenshots: partial.short_screenshots ?? [],
  };
};

//الاخبار
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  tags?: string[];
  publishedAt: string;
};
// require('dotenv').config();


