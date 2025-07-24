import { FiiService } from './fii.service';
import { FiiEntity } from '../entities/fii.entity/fii.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FiiService', () => {
  let service: FiiService;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn((dto) => dto),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FiiService,
        {
          provide: getRepositoryToken(FiiEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FiiService>(FiiService);

    jest.clearAllMocks();
  });

  it('should insert a new FII if not existing', async () => {
    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.save.mockResolvedValue({ ticker: 'HGLG11' });

    const result = await service.upsertFii({ ticker: 'HGLG11' });

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { ticker: 'HGLG11' },
    });
    expect(mockRepository.save).toHaveBeenCalled();
    expect(result.ticker).toBe('HGLG11');
  });

  it('should update an existing FII', async () => {
    const existing = { id: 1, ticker: 'HGLG11', name: 'Old Name' } as FiiEntity;
    mockRepository.findOne.mockResolvedValue(existing);
    mockRepository.save.mockResolvedValue({ ...existing, name: 'New Name' });

    const result = await service.upsertFii({
      ticker: 'HGLG11',
      name: 'New Name',
    });

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { ticker: 'HGLG11' },
    });
    expect(mockRepository.save).toHaveBeenCalledWith({
      ...existing,
      name: 'New Name',
    });
    expect(result.name).toBe('New Name');
  });

  it('should list all FIIs', async () => {
    mockRepository.find.mockResolvedValue([{ ticker: 'HGLG11' }]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].ticker).toBe('HGLG11');
  });

  it('should find FII by ticker', async () => {
    mockRepository.findOne.mockResolvedValue({ ticker: 'HGLG11' });

    const result = await service.findByTicker('HGLG11');
    expect(result?.ticker).toBe('HGLG11');
  });
});
