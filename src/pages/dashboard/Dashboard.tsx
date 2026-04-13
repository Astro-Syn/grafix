import {useState, useEffect} from 'react';
import { supabase } from '../../lib/supabase';

type Board = {
    id: string;
    name: string;
}


export default function Dashboard() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [name, setName] = useState("");

    const fetchBoards = async () => {
        const { data, error } =  await supabase
        .from("boards")
        .select("*")
        .order("created_at", { ascending: false });

        if (!error) setBoards(data || []);
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    const createBoard = async () => {
        const {
            data: { user },

        } = await supabase.auth.getUser();

        if (!user) return;

        await supabase.from("boards").insert({
            name, 
            user_id: user.id,
        })
    }

    return (
    
    <div>
      <h1>My Inspo Boards</h1>

      
      <div>
        <input
          placeholder="Board name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createBoard}>Create</button>
      </div>

    
      <div>
        {boards.map((board) => (
          <div key={board.id}>
            {board.name}
          </div>
        ))}
      </div>
    </div>
    )
}