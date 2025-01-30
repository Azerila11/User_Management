import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { User } from "../types/type";
import { getUser } from "../api/api";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const userData = await getUser(Number(id));
        setUser(userData);
      } catch (error) {
        toast.error("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center mt-8">
        <PageLoader />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center mt-8">User not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <img
          src={user.avatar}
          alt={`${user.first_name}'s avatar`}
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold text-center mt-4">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-gray-600 text-center mt-2">{user.email}</p>
        <div className="flex justify-center mt-6">
          <Link
            to="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
