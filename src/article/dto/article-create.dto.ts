import { IsString, isString, MinLength } from "class-validator";

export class ArticleCreateDto {
  @IsString()
  title: string;

  @IsString()
  content: string
  ;
  @IsString()
  author: string;
}
