import { useState } from "react";
import { generateDocument } from "../services/aiDocumentService";

export default function useAIDocument() {

    const [loadingType, setLoadingType] = useState(null);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const generate = async (applicationId, type) => {

        try {

            setLoadingType(true);

            const response = await generateDocument(
                applicationId,
                type
            );

            setTitle(
                type === "COVER_LETTER"
                    ? "AI Generated Cover Letter"
                    : "AI Generated HR Email"
            );

            setContent(response.content);

            setOpen(true);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to generate document."
            );

        } finally {

            setLoadingType(false);

        }

    };

    const closeModal = () => {

        setOpen(false);

        setContent("");

    };

    return {

        loadingType,

        open,

        title,

        content,

        generate,

        closeModal

    };

}