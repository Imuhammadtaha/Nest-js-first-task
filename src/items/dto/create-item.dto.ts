import { IsString, IsNumber, Min, Length, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  description?: string;
}
