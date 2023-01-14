export enum Statues {
  ALIVE = "Alive",
  DEAD = "Dead",
  UNKNOWN = "Unknown",
}

export enum Genders {
  FEMALE = "Female",
  MALE = "Male",
  GENDERLESS = "Genderless",
  UNKNOWN = "Unknown",
}

export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
  created: string;
};

export type Character = {
  id: number;
  name: string;
  status: Statues;
  species: string;
  type: string;
  gender: string;
  location: Location;
  origin: Location;
  image: string;
  episode: Episode;
  url: string;
  created: string;
};
