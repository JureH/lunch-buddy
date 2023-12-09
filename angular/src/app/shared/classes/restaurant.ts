import { Comment } from './comment';

export class Restaurant {
    _id!: string;
    name!: string;
    address!: string;
    coordinates!: [number];
    phone_number!: string;
    rating!: number;
    website!: string;
    comments?: Comment[];
  }