import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketPlace } from './entities/marketplace.entity';
import { CreateMarketPlaceDto } from './dto/CreateMarketPlace.dto';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
  }),
)
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('marketplaces')
  async findAllMarketplaces() {
    return this.marketplaceService.findAll();
  }

  @Get(':id')
  async findOneMarketplace(
    @Param('id') marketplaceId: number,
  ): Promise<MarketPlace> {
    const marketplace = await this.marketplaceService.findOne({
      where: {
        id: marketplaceId,
      },
    });

    if (!marketplace) {
      throw new NotFoundException('Marketplace não encontrado.');
    }

    return marketplace;
  }

  @Post()
  async create(@Body() data: CreateMarketPlaceDto) {
    return this.marketplaceService.create(data);
  }

  @Delete(':id')
  async remove(@Param('id') marketplaceId: number): Promise<string> {
    try {
      await this.marketplaceService.remove({
        where: {
          id: marketplaceId,
        },
      });
      return 'Marketplace removido com sucesso.';
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível remover o marketplace',
      );
    }
  }
}
