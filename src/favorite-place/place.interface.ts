export interface IPlace {
  readonly place_id: string;

  readonly formatted_address: string;

  readonly lat: number;

  readonly lng: number;

  readonly country: string;

  readonly city: string;

  readonly timeOffset?: number;

  readonly imgName?: string;
}
