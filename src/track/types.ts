interface ITrack {
  _id: string;
  name: string;
  artistId?: string;
  albumId?: string;
  duration: number;
}

export { ITrack };
