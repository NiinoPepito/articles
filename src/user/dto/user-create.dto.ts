import { MinLength } from 'class-validator';

export class UserCreateDto {
  @MinLength(3, {
    message: 'Le prénom doit contenir au moins 3 caractères',
  })
  firstname: string;

  @MinLength(3, {
    message: 'Le nom doit contenir au moins 3 caractères',
  })
  lastname: string;

  @MinLength(3, {
    message: 'Le mot de passe doit contenir au moins 3 caractères',
  })
  password: string;

  @MinLength(3, {
    message: "L'age doit contenir au moins 3 caractères",
  })
  age: number;
}
