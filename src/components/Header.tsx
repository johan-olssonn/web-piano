type Props = {
  loadingPercentage: number;
};

export default function Header({ loadingPercentage }: Props) {
  return (
    <div className="flex items-center">
      <h1 className="text-white font-bold p-2 select-none">WEB PIANO</h1>
      {loadingPercentage !== 100 && (
        <p className="text-white text-sm">Loading {loadingPercentage}%...</p>
      )}
    </div>
  );
}
