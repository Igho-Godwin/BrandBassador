type FileSrc = {
  alt: string;
  src: string;
};
type Feed = {
  title: string;
  date: string;
  video: FileSrc;
  image: FileSrc;
  cashReward: number;
};

export default Feed;
