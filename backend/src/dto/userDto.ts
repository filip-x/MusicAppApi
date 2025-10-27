import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
}
