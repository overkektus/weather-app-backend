import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  GeocodeResponseData,
  GeocodeResult,
  TextSearchResponseData,
  Place,
  TimeZoneResponseData,
  PlaceDetailsResponseData,
} from '@googlemaps/google-maps-services-js';
import { writeFile } from 'fs/promises';

interface IRequestParams {
  address?: string;
  lat?: string;
  lng?: string;
}

@Injectable()
export class GoogleMapsService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api';

  async getGeocode({
    address,
    lat,
    lng,
  }: IRequestParams): Promise<GeocodeResult> {
    const url = `${this.baseUrl}/geocode/json`;
    const res = await axios.get<GeocodeResponseData>(url, {
      params: {
        address: address,
        latlng: `${lat},${lng}`,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    return res.data.results[0];
  }

  async getPlacesByQuery(query: string): Promise<Place[]> {
    const url = `${this.baseUrl}/place/textsearch/json`;
    const res = await axios.get<TextSearchResponseData>(url, {
      params: {
        query,
        key: process.env.GOOGLE_API_KEY,
      },
    });
    return res.data.results;
  }

  async getTimeoffsetByCoordinates(lat: number, lng: number): Promise<number> {
    try {
      const url = `${this.baseUrl}/timezone/json`;
      const res = await axios.get<TimeZoneResponseData>(url, {
        params: {
          timestamp: +new Date() / 1000,
          location: `${lat},${lng}`,
          key: process.env.GOOGLE_API_KEY,
        },
      });
      return res.data.rawOffset;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async savePlacePhotoByPlaceId(placeId: string): Promise<string | null> {
    try {
      const urlPlaceDetails = `${this.baseUrl}/place/details/json`;
      const placeDetailsRes = await axios.get<PlaceDetailsResponseData>(
        urlPlaceDetails,
        {
          params: {
            place_id: placeId,
            fields: 'photo',
            key: process.env.GOOGLE_API_KEY,
          },
        },
      );

      if (!placeDetailsRes.data.result.photos) {
        return null;
      }

      const { photo_reference } = placeDetailsRes.data.result.photos[0];
      const urlPhoto = `${this.baseUrl}/place/photo`;
      const photoRes = await axios.get(urlPhoto, {
        responseType: 'arraybuffer',
        params: {
          maxwidth: 400,
          photoreference: photo_reference,
          key: process.env.GOOGLE_API_KEY,
        },
      });

      const imgName = `${placeId}.jpg`;

      await writeFile(`./public/${imgName}`, photoRes.data);

      return imgName;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
