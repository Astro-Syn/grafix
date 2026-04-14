import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";


type Board = {
  id: string;
  name: string;
};

export default function Dashboard() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [name, setName] = useState("");
  const nav = useNavigate();


  const fetchBoards = async () => {
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching boards:", error);
      return;
    }

    setBoards(data || []);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  
  const createBoard = async () => {
    if (!name.trim()) return; 

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user found");
      return;
    }

    const { error } = await supabase.from("boards").insert({
      name,
      user_id: user.id,
    });

    if (error) {
      console.error("Error creating board:", error);
      return;
    }

    setName("");        
    fetchBoards();      
  };

  console.log('Dashboard rendered')

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Inspo Boards</h1>

    
      <div style={{ marginBottom: "20px" }}>
        <p>DASHBOARD WORKS</p>
        <input
          placeholder="Board name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createBoard}>Create</button>
      </div>

    
      <div>
        {boards.length === 0 ? (
          <p>No boards yet. Create one 👀</p>
        ) : (
          boards.map((board) => (
            <div
              key={board.id}
              onClick={() => nav(`/board/${board.id}`)}
              style={{
                cursor: "pointer",
                padding: "10px",
                border: "1px solid white",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              {board.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}