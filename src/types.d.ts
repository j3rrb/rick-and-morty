export type Character = {
  name: string;
  location: {
    name: string;
  };
  image: string;
  episode: Episode[];
};

export type Episode = {
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
};

export type InfoCardType = {
  name: string;
  image?: string;
  description: {
    label: string;
    value: any;
  }[];
  details: any[];
};
