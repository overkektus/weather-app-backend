import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetPlacesByAddressQuery {
  @ApiProperty({ example: 'Berlin' })
  @IsString()
  @IsNotEmpty()
  address: string;
}
