import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("portfolio")
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Please fill in the form");
    }
    if (data) {
      setFormError(null);
      navigate('/')
    }
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchSmoothies();
  }, [id, navigate]);

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>
      </form>
    </div>
  );
};

export default Update;
