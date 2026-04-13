import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


type Pin = {
    id: string;
    image_url: string;
};

export default function BoardPage() {
    const { id } = useParams();
    const [pins, setPins] = useState<Pin[]>([]);
    const [imageUrl, setImageUrl] = useState("");
    return (
        <div>
            Board Page
        </div>
    )
}