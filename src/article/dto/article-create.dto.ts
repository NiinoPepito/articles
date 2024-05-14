import { MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  title: string;

  @MinLength(3, {
    message: 'Le contenu doit contenir au moins 3 caractères',
  })
  content: string;

  @MinLength(3, {
    message: "L'auteur doit contenir au moins 3 caractères",
  })
  author: string;
}
