import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsOptional()
  duration: number;
}
