export default function EmptyState() {

  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      py-20
    ">

      <h2 className="
        text-3xl
        font-bold
        mb-3
      ">
        Aucun événement trouvé
      </h2>

      <p className="text-slate-500">
        Essayez un autre filtre.
      </p>

    </div>
  );
}