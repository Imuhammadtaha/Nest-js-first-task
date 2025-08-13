import { Injectable, NotFoundException } from '@nestjs/common';
import { mockItems } from '../mock/data';
import { Item } from '../items/entities/items.entites';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = mockItems;

  findAll(): Item[] {
    return this.items;
  }
  findOne(id: number): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }

  create(dto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.items.length + 1,
      name: dto.name,
      price: dto.price,
      description: dto.description ?? '',
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, dto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, dto);
    return item;
  }

  remove(id: number): void {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Item with ID ${id} not found`);
    this.items.splice(index, 1);
  }
}
