import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseConfig";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    void fetchData();
    setLoading(false);
  }, []);

  const deleteAccount = async () => {
    try {
      const {
        data: { user },
        error: getUserError,
      } = await supabase.auth.getUser();

      if (getUserError || !user) {
        console.error("Error fetching user data:", getUserError);
        alert("Failed to fetch user data.");
        return;
      }

      const { error: deleteError } = await supabase.rpc("delete_user", {
        user_id: user.id,
      });

      if (deleteError) {
        console.error("Error deleting account:", deleteError);
        alert(`Failed to delete account: ${deleteError.message}`);
      } else {
        alert("Account deleted successfully");
        navigate("/landing");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An unexpected error occurred while deleting your account.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <div className="content-container flex items-center justify-center bg-neutral p-10">
        <div className="flex flex-col items-center">
          {user && user.user_metadata && (
            <img
              src={(user.user_metadata.avatar_url as string) || ""}
              alt="User avatar"
              className="h-20 w-20 rounded-full"
            />
          )}
          {user && user.user_metadata && (
            <h1 className="text-3xl font-bold mt-4">
              {user.user_metadata.full_name}
            </h1>
          )}
          {user && <p className="text-lg mt-2">{user.email}</p>}
          <button
            className="mt-4 bg-blue-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
