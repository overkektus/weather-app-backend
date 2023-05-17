import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePlaceService } from './favorite-place.service';

describe('FavoritePlaceService', () => {
  let service: FavoritePlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritePlaceService],
    }).compile();

    service = module.get<FavoritePlaceService>(FavoritePlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
