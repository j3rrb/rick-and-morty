export type Character = {
  name: string;
  origin: {
    name: string;
  };
  image: string;
  episode: {
    episode: string;
    name: string;
  }[];
};

export type Episode = {
  name: string;
  episode: string;
  air_date: string;
  characters: {
    name: string;
  }[];
};

export type InfoCardType = {
  name: string;
  image?: string;
  description: {
    label: string;
    value: string;
  }[];
  details: {
    label: string;
    value: Character['episode'][] | Episode['characters'][];
  }[];
};

export type CharsCards = {
  characters: {
    info: {
      count?: number;
      pages?: number;
      next?: number;
      prev?: number;
    };
    results: Character[];
  };
};

export type EpsCards = {
  episodes: {
    info: {
      count?: number;
      pages?: number;
      next?: number;
      prev?: number;
    };
    results: Episode[];
  };
};
