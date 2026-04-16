import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import './BoardPage.css';
import { RiImageAddFill } from "react-icons/ri";
import { TbFileSad } from "react-icons/tb";

type Pin = {
  id: string;
  image_url: string;
};

export default function BoardPage() {
  const { id } = useParams();
  const [pins, setPins] = useState<Pin[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [boardName, setBoardName] = useState("");

  const fetchPins = async () => {
    const { data, error } = await supabase
      .from("pins")
      .select("*")
      .eq("board_id", id)
      .order("created_at", { ascending: false });

    if (!error) setPins(data || []);

    
  };

  const deletePosts = async (id: string) => {
    const { error } = await supabase
    .from("pins").delete()
    .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchPins();
  }

    const fetchBoard = async () => {
  if (!id) return;

  const { data, error } = await supabase
    .from("boards")
    .select("name")
    .eq("id", id)
    .single();

  if (!error && data) {
    setBoardName(data.name);
  }
};

  useEffect(() => {
    fetchPins();
    fetchBoard();
  }, [id]);

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
    <div className='board-wrapper'>
      
      <h1>Your <span className='board-name-text'>{boardName}</span> Board</h1>

      
      <div className='board-upload-wrapper'>
        <input
          className='board-input-container'
          placeholder="Paste image URL..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button 
        className='add-pic-btn'
        onClick={addPin}>
          <RiImageAddFill color={'white'} size={30}/>
        </button>
      </div>

      <div className='board-content-wrapper-main'>
        <div className='board-content-wrapper'>
        
        
       <div className='board-content'>
        <div className='side-boardName-deco'>{boardName}</div>
  {pins.length === 0 ? (
    <p className="empty-board-text">
      There’s no posts for this board yet 
      <TbFileSad color={'white'} size={40}/>
    </p>
  ) : (
    pins.map((pin) => (
      <div key={pin.id} className="pin-container">
        <img
          src={pin.image_url}
          style={{ width: "200px", borderRadius: "10px" }}
        />

        <button
          className='delete-post-btn'
          onClick={(e) => {
            e.stopPropagation();
            deletePosts(pin.id);
          }}
        >
          Remove
        </button>
      </div>
    ))
  )}
</div>

      </div>

       
      </div>
      
    </div>
  );
}