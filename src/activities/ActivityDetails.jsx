import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useParams } from "react-router";
import { deleteActivity, getActivity } from "../api/activities";

export default function ActivityDetails() {
  const { token } = useAuth;
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const syncActivity = async () => {
      const data = await getActivity(id);
      setActivity(data);
    };
    syncActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  if (!activity) return <p>Loading...</p>;

  return (
    <article>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>by {activity.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </article>
  );
}
