import { IsString, isString } from "class-validator";

export class ArticleUpdateDto {
  @IsString()
  title: string;
}
