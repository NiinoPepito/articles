import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../entity/article.entity';
import { Repository } from 'typeorm';

Injectable();
export class GetArticlesByAuthorService {
  constructor(
    // on "injecte" le repository de l'entité Article
    // dans la propriété articleRepository de la classe ArticleService
    // pour pouvoir ensuite utiliser les méthodes du repository
    // dans les méthodes de notre service
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // on peut utiliser le paramètre d'url nommé author pour filtrer les articles
  // C'est une méthode asynchrone pour pouvoir utiliser await
  // mettre un await permet de suspendre le processus et attendre la fin de la requête
  // on utilise findBy pour filtrer les articles
  async getArticlesByAuthor(author: string) {
    return await this.articleRepository.findBy({ author });
  }
}
