import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ThreadSearchbarProps {
  onSearchChange: (searchTerm: string) => void;
}

const ThreadSearchbar: React.FC<ThreadSearchbarProps> = ({
  onSearchChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full sm:w-72">
      <label className="input input-bordered flex w-full items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search threads..."
          onChange={handleChange}
        />
        <MagnifyingGlassIcon className="h-4 w-4 opacity-70" />
      </label>
    </div>
  );
};

export default ThreadSearchbar;
