import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getUser, updateUser } from "../api/api";
import { UserFormData } from "../types/type";
import { toast } from "react-toastify";
import ButtonWithLoader from "../components/ButtonWithLoader";
import PageLoader from "../components/PageLoader";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<UserFormData>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const userData = await getUser(Number(id));
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await updateUser(Number(id), formData);
      toast.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Edit User</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
