function FormSection({

    title,

    children,

}) {

    return (

        <div className="space-y-6">

            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2">

                {title}

            </h2>

            {children}

        </div>

    );

}

export default FormSection;