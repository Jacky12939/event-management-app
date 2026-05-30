interface Props {

  category: string;

  setCategory: (
    value: string
  ) => void;
}

export default function EventFilters({
  category,
  setCategory,
}: Props) {

  return (

    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
      className="
        px-4
        py-3
        rounded-2xl
        bg-white
        dark:bg-slate-800
        border
        border-slate-200
        dark:border-slate-700
      "
    >

      <option value="">
        Toutes catégories
      </option>

      <option value="Concert">
        Concert
      </option>

      <option value="Business">
        Business
      </option>

      <option value="Technologie">
        Technologie
      </option>

    </select>
  );
}