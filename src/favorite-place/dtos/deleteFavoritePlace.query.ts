import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePlaceByIdQuery {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeId: string;
}
