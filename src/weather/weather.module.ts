import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { OpenweathermapService } from 'src/openweathermap/openweathermap.service';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService, OpenweathermapService],
})
export class WeatherModule {}
