import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArtistDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  starting_date: Date;
}
