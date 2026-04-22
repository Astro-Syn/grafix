import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";


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


  const deleteBoard = async (id: string) => {
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  
  setBoards((prev) => prev.filter((b) => b.id !== id));
};

const renameBoard = async (id: string, newName: string) => {
  const { error } = await supabase
    .from("boards")
    .update({ name: newName })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  
  setBoards((prev) =>
    prev.map((b) =>
      b.id === id ? { ...b, name: newName } : b
    )
  );
};

  return (
    <div className='dashboard-wrapper'>
      <h1 className='dashboard-title'>My Grafix Boards</h1>

    
      <div style={{ marginBottom: "20px" }}>
        
        <input
          placeholder="Board name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createBoard}>Create</button>
      </div>

    
      <div>
        {boards.length === 0 ? (
          <p>No boards yet. Create one! </p>
        ) : (
          boards.map((board) => (
            <div
            className='board-holder'
              key={board.id}
              onClick={() => nav(`/board/${board.id}`)}
            >
              <span>{board.name}</span>

              <div className="dashboard-btn-container">


              
                <button onClick={(e) => {
                  e.stopPropagation();
      const newName = prompt("Enter new board name:");
      if (newName) {
        renameBoard(board.id, newName);
      }
    }}>
      Rename
    </button>

    <button onClick={(e) => {
      e.stopPropagation();
      deleteBoard(board.id)
    }}>
      Delete
    </button>
    </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}