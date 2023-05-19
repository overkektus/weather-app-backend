import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';
import { Units } from 'src/openweathermap/openweathermap.service';

export class GetForecastQuery {
  @ApiProperty({ example: '52.520008' })
  @IsString()
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @ApiProperty({ example: '13.404954' })
  @IsString()
  @IsNotEmpty()
  @IsLongitude()
  lng: string;

  @ApiProperty({ example: 'metric' })
  @IsNotEmpty()
  units: Units;
}
