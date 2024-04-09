import { IsBase64, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  @IsBase64()
  image: string;

  @IsNotEmpty()
  marketplace_id: number;
}
