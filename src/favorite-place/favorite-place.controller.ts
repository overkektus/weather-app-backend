import { Controller, Get, Post, Body, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IPlace } from './place.interface';
import { FavoritePlaceService } from './favorite-place.service';
import {
  CreatePlaceByCoordinatesDto,
  CreatePlaceByAddressDto,
} from './dtos/createFavoritePlace.dto';
import { DeletePlaceByIdQuery } from './dtos/deleteFavoritePlace.query';

@ApiTags('Favorite Place')
@Controller('favorite-place')
export class FavoritePlaceController {
  constructor(private readonly favoritePlaceService: FavoritePlaceService) {}

  @ApiOperation({ summary: 'Get favorite all places' })
  @Get()
  async getFavoritePlaces(): Promise<IPlace[]> {
    const places = await this.favoritePlaceService.getAllPlaces();
    return places;
  }

  @ApiOperation({ summary: 'Create favorite place by coordinates' })
  @Post('/coordinates')
  async createPlaceByCoordinates(
    @Body() createPlaceByCoordinatesDto: CreatePlaceByCoordinatesDto,
  ): Promise<IPlace> {
    const newPlace = await this.favoritePlaceService.createPlaceByCoordinates(
      createPlaceByCoordinatesDto,
    );
    return newPlace;
  }

  @ApiOperation({ summary: 'Create favorite place by address' })
  @Post('/address')
  async createPlaceByAddress(
    @Body() createPlaceByAddressDto: CreatePlaceByAddressDto,
  ): Promise<IPlace> {
    const newPlace = await this.favoritePlaceService.createPlaceByAdress(
      createPlaceByAddressDto,
    );
    return newPlace;
  }

  @ApiOperation({ summary: 'Delete favorite place by place_id' })
  @Delete()
  async deletePlaceByPlaceId(
    @Query() queryParams: DeletePlaceByIdQuery,
  ): Promise<IPlace> {
    const deletedPlace = await this.favoritePlaceService.deletePlace(
      queryParams.placeId,
    );
    return deletedPlace;
  }
}
