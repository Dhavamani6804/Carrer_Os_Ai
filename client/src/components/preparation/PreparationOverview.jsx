function PreparationOverview({

  overview,

}) {

  return (

    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">

      <h2 className="text-2xl font-semibold">

        Preparation Overview

      </h2>

      <p className="mt-4 leading-8 text-slate-600">

        {overview}

      </p>

    </div>

  );

}

export default PreparationOverview;