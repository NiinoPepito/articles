import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';

Injectable();
export class GetArticlesByIdService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getOneArticleById(id: number) {
    return await this.articleRepository.findOneBy({ id });
  }
}
