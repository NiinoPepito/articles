import { IsString, isString, MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  author: string;
}
