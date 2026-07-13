function StrengthWeaknessCard({

  strengths = [],

  weaknesses = [],

}) {

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">

        Strengths & Weaknesses

      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <div>

          <h3 className="font-semibold text-green-700">

            Strengths

          </h3>

          <ul className="mt-3 space-y-2">

            {strengths.map((item) => (

              <li
                key={item}
                className="rounded-xl bg-green-50 p-3"
              >
                ✓ {item}
              </li>

            ))}

          </ul>

        </div>

        <div>

          <h3 className="font-semibold text-red-700">

            Weaknesses

          </h3>

          <ul className="mt-3 space-y-2">

            {weaknesses.map((item) => (

              <li
                key={item}
                className="rounded-xl bg-red-50 p-3"
              >
                ⚠ {item}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>

  );

}

export default StrengthWeaknessCard;