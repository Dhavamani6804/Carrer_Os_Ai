function MentorMessage({ sender, message }) {

    const isUser = sender === "USER";

    return (

        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >

            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-900"
                }`}
            >

                {message}

            </div>

        </div>

    );

}

export default MentorMessage;