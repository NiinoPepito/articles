import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';
import { ArticleCreateDto } from '../dto/article-create.dto';

Injectable();
export class CreateArticleService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(data: ArticleCreateDto) {
    try {
      return this.articleRepository.save(data);
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating article');
    }
  }
}
