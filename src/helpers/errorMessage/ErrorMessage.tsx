interface ErrorProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <p className="error">
      <span>🛑</span> {message}
    </p>
  );
}
