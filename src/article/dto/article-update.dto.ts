import { IsString, isString } from 'class-validator';

export class ArticleUpdateDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsString()
  author: string;
}
