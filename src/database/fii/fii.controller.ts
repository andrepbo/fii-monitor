import {
  Get,
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FiiService } from './fii.service';
import { FiiEntity } from '../entities/fii.entity/fii.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrUpdateFiiDto } from './dto/create-or-update-fii.dto';

@ApiTags('FIIs')
@Controller('fiis')
export class FiiController {
  constructor(private readonly fiiService: FiiService) {}

  @Get()
  @ApiOperation({ summary: 'Get all FIIs' })
  @ApiResponse({ status: 200, description: 'List of FIIs', type: [FiiEntity] })
  async findAll(): Promise<FiiEntity[]> {
    return this.fiiService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create or update a FII' })
  @ApiBody({ type: CreateOrUpdateFiiDto })
  @ApiResponse({
    status: 201,
    description: 'FII created or updated',
    type: FiiEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async upsert(@Body() data: CreateOrUpdateFiiDto): Promise<FiiEntity> {
    return this.fiiService.upsertFii(data);
  }
}
