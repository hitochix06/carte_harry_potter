export interface Character {
  id: number;
  name: string;
  houseColor: string;
  isFavorite: boolean;
  createdAt: Date;
  image: string;
  price: number;
  wand?: string;
  patronus?: string;
  year?: number;
  role?: string;
  description?: string;
}
