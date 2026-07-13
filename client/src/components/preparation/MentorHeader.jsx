
function MentorHeader({

  role,

  company,

}) {

  return (

    <div className="rounded-[2rem] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white">

      <p className="text-sm uppercase tracking-widest opacity-90">

        CareerOS AI Mentor

      </p>

      <h1 className="mt-3 text-4xl font-bold">

        {role}

      </h1>

      <p className="mt-2 text-lg opacity-90">

        {company}

      </p>

    </div>

  );

}

export default MentorHeader;