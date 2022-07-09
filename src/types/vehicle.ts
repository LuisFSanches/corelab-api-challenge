export interface IVehicle {
  _id: string;
  name: string;
  brand:string,
  price: number;
  color: string;
  productionYear: number;
  plate: string;
  description: string;
  isFavorite: boolean;
  createdAt: Date;
}
