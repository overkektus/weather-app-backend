import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class GetPlaceByCoordinatesQuery {
  @ApiProperty()
  @IsLatitude()
  @IsNotEmpty()
  lat: string;

  @ApiProperty()
  @IsLongitude()
  @IsNotEmpty()
  lng: string;
}
