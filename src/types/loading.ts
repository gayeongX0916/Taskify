export type LoadingProps = {
  isLoading: boolean;
  start: (key?: string) => void;
  stop: (key?: string) => void;
  key?: string;
};
