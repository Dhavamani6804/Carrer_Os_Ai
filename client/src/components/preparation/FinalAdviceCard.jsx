function FinalAdviceCard({ advice }) {

  return (

    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">

      <h2 className="text-2xl font-bold">

        Final Advice

      </h2>

      <p className="mt-5 leading-8">

        {advice}

      </p>

    </div>

  );

}

export default FinalAdviceCard;