import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  async create(data: any): Promise<any> {
    const product = this.productRepository.create(data);

    return this.productRepository.save(product).then((product) => {
      return product;
    });
  }

  async findAll(): Promise<Product[]> {
    const product = this.productRepository.find();

    if (!product) {
      throw new NotFoundException('Essa Loja não possui produtos.');
    }
    return this.productRepository.find();
  }

  async findOne(options: FindOneOptions<Product>): Promise<any> {
    const product = this.productRepository.findOne(options);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return product;
  }

  async update(id: number, data: any): Promise<any> {
    const product = await this.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const updatedProduct = this.productRepository.merge(product, data);

    return this.productRepository.save(updatedProduct);
  }

  async remove(options: FindOneOptions<Product>): Promise<void> {
    const product = await this.productRepository.findOne(options);

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.productRepository.delete(product.id);
  }
}
