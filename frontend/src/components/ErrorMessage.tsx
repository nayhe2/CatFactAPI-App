interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return <p className="mt-2 text-sm text-red-500">{message}</p>;
}
