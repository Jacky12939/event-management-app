import { FiSearch }
from "react-icons/fi";

interface Props {

  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function EventSearch({
  search,
  setSearch,
}: Props) {

  return (

    <div className="
      relative
      w-full
      md:w-[400px]
    ">

      <FiSearch className="
        absolute
        top-4
        left-4
        text-slate-400
      " />

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-2xl
          bg-white
          dark:bg-slate-800
          border
          border-slate-200
          dark:border-slate-700
          outline-none
        "
      />
    </div>
  );
}