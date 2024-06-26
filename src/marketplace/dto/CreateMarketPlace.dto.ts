import { IsBase64, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMarketPlaceDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsBase64()
  logo: string;
}
