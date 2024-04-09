import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { MarketPlace } from './entities/marketplace.entity';
import { CreateMarketPlaceDto } from './dto/CreateMarketPlace.dto';

@Injectable()
export class MarketplaceService {
  @InjectRepository(MarketPlace)
  private marketplaceRepository: Repository<MarketPlace>;

  async create(data: CreateMarketPlaceDto): Promise<MarketPlace> {
    const marketPlace = this.marketplaceRepository.create(data);

    await this.CnpjAlreadyExists(marketPlace.cnpj);

    return this.marketplaceRepository.save(marketPlace).then((marketplace) => {
      return marketplace;
    });
  }

  async findAll(): Promise<MarketPlace[]> {
    return this.marketplaceRepository.find();
  }

  async findOne(options: FindOneOptions<MarketPlace>): Promise<MarketPlace> {
    const marketPlace = this.marketplaceRepository.findOne(options);

    if (!marketPlace) {
      throw new NotFoundException('MarketPlace não encontrado.');
    }

    return marketPlace;
  }

  async update(id: number, data: CreateMarketPlaceDto): Promise<MarketPlace> {
    const marketPlace = await this.findOne({
      where: { id },
    });

    if (!marketPlace) {
      throw new NotFoundException('MarketPlace não encontrado.');
    }

    const updatedMarketPlace = this.marketplaceRepository.merge(
      marketPlace,
      data,
    );

    return this.marketplaceRepository.save(updatedMarketPlace);
  }

  async remove(options: FindOneOptions<MarketPlace>): Promise<void> {
    const marketPlace = await this.marketplaceRepository.findOne(options);

    if (!marketPlace) {
      throw new NotFoundException('MarketPlace não encontrado.');
    }

    await this.marketplaceRepository.delete(marketPlace.id);
  }

  async CnpjAlreadyExists(cnpj: string): Promise<void> {
    const marketPlace = await this.marketplaceRepository.findOne({
      where: { cnpj },
    });

    if (marketPlace) {
      throw new BadRequestException('CNPJ já cadastrado.');
    }
  }
}
