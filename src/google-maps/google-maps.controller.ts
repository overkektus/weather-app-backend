import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPlace } from 'src/favorite-place/place.interface';
import { GetPlaceByCoordinatesQuery } from './dtos/getPlaceByCoordinates.query';
import { GetPlacesByAddressQuery } from './dtos/getPlacesByAddress.query';
import { PlaceDTO } from './dtos/place.dto';
import { GoogleMapsService } from './google-maps.service';

@ApiTags('Google Maps')
@Controller('google-maps')
export class GoogleMapsController {
  constructor(private readonly googleMapsService: GoogleMapsService) {}

  @ApiOperation({ summary: 'Get place by address' })
  @Get('/address')
  async getPlacesByAddress(
    @Query() queryParams: GetPlacesByAddressQuery,
  ): Promise<IPlace> {
    const geocodeResult = await this.googleMapsService.getGeocode({
      address: queryParams.address,
    });
    const place = new PlaceDTO(geocodeResult);
    const timeOffset = await this.googleMapsService.getTimeoffsetByCoordinates(
      place.lat,
      place.lng,
    );
    place.timeOffset = timeOffset;
    return place;
  }

  @ApiOperation({ summary: 'Get place by coordinates' })
  @Get('/coordinates')
  async getPlaceByCoordinates(
    @Query() queryParams: GetPlaceByCoordinatesQuery,
  ): Promise<IPlace> {
    const geocodeResult = await this.googleMapsService.getGeocode({
      lat: queryParams.lat,
      lng: queryParams.lng,
    });
    const place = new PlaceDTO(geocodeResult);
    const timeOffset = await this.googleMapsService.getTimeoffsetByCoordinates(
      place.lat,
      place.lng,
    );
    place.timeOffset = timeOffset;
    return place;
  }
}
