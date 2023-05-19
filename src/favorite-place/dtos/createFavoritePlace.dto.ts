import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaceByCoordinatesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsLongitude()
  lng: string;
}

export class CreatePlaceByAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
