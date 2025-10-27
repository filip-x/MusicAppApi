import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PlaylistDto {
  @ApiModelProperty()
  name: string;
}
