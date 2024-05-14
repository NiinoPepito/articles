import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArticleService } from '../use-case/create-article.service';
import { DeleteArticleService } from '../use-case/delete-article.service';
import { GetArticlesByIdService } from '../use-case/get-article-by-id.service';
import { GetArticlesService } from '../use-case/get-articles.service';
import { GetArticlesByAuthorService } from '../use-case/get-articles-by-author.service';
import { UpdateArticleService } from '../use-case/update-article.service';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('articles')
export class ArticleController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(
    private readonly createArticleService: CreateArticleService,
    private readonly getArticlesByIdService: GetArticlesByIdService,
    private readonly getArticlesService: GetArticlesService,
    private readonly deleteArticleService: DeleteArticleService,
    private readonly updateArticleService: UpdateArticleService,
    private readonly getArticlesByAuthorService: GetArticlesByAuthorService,
  ) {}

  // @Get() est un decorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllArticles() {
    return this.getArticlesService.getAllarticles();
  }

  // @Get('author/:author) Permet de déclarer une route accessible avec la méthode GET
  // avec un paramètre d'url nommé author
  // on appel ensuite la méthode getArticlesByAuthor de notre service
  @Get('author/:author')
  getArticlesByAuthor(@Param('author') author: string) {
    return this.getArticlesByAuthorService.getArticlesByAuthor(author);
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.getArticlesByIdService.getOneArticleById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createArticle(@Body() data: ArticleCreateDto) {
    return this.createArticleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ) {
    return this.updateArticleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteArticleService.deleteArticle(id);
  }
}
