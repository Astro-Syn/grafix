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

  const fetchPins = async () => {
    const { data, error } = await supabase
      .from("pins")
      .select("*")
      .eq("board_id", id)
      .order("created_at", { ascending: false });

    if (!error) setPins(data || []);
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const addPin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("pins").insert({
      image_url: imageUrl,
      board_id: id,
      user_id: user.id,
    });

    setImageUrl("");
    fetchPins();
  };

  return (
    <div>
      <h1>Board</h1>

      
      <div>
        <input
          placeholder="Paste image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button onClick={addPin}>Add</button>
      </div>

      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {pins.map((pin) => (
          <img
            key={pin.id}
            src={pin.image_url}
            style={{ width: "200px", borderRadius: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}