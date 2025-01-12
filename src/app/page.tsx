"use client";

import { useEffect, useState } from "react";
import { supabase } from "./client"; // Import the Supabase client
import axios from "axios"; // We need axios for GitHub API requests

export default function Home() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]); // State for storing repositories

  // Check the logged-in user on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      // Fetch repositories if the user is logged in
      if (user) {

        console.log(user)
        fetchUserRepos(user.user_metadata.user_name);
      }
    };

    
    checkUser();
  }, []);

  // Fetch GitHub repositories
  const fetchUserRepos = async (id: string) => {
    try {
      console.log("Hi this is ",id)
      const response = await axios.get(`https://api.github.com/users/${id}/repos`);
      //console.log("These are repos", repos)
      setRepos(response.data); // Set repositories data
      console.log("These are repos", repos)
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  // Trigger GitHub OAuth login
  const handleGithubLogin = async () => {
    console.log("Hello")
    try {
      const { data ,  error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          scopes: 'read:user'
        }
      });


      if (error) {
        console.error("GitHub Login error:", error);
        return;
      }

      console.log(data)

      const user  = await supabase.auth.getUser();
      const session = supabase.auth.getSession();
    } catch (error) {
      console.error("GitHub Login error:", error);
    }
  };

  // Logout the user
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRepos([]); // Clear repositories on logout
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>GitHub Repositories</h1>
      {!user ? (
        <button onClick={handleGithubLogin}>Login with GitHub</button>
      ) : (
        <>
          <h2>Welcome, {user.email}</h2>
          {repos.length > 0 ? (
            <ul>
              {repos.map((repo: any) => (
                <li key={repo.id}>{repo.name}</li>
              ))}
            </ul>
          ) : (
            <p>No repositories found.</p>
          )}

          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
