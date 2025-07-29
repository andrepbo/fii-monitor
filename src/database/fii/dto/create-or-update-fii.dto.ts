import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrUpdateFiiDto {
  @ApiProperty({ example: 'HGLG11', description: 'Ticker symbol of the FII' })
  @IsString()
  ticker: string;

  @ApiProperty({ example: 'CSHG Logística', description: 'Name of the FII' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Logística', description: 'Sector of the FII' })
  @IsString()
  sector: string;

  @ApiProperty({ example: 0.95, description: 'Price-to-book ratio (P/VP)' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  pvp: number;

  @ApiProperty({ example: 0.8, description: 'Dividend yield (0 to 1 scale)' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  dividendYield?: number;
}
