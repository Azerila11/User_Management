import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../api/api";
import PageLoader from "../components/PageLoader";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(currentPage);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, token, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id: number) => {
    setDeletingUserId(id);
    try {
      await deleteUser(id);
      setUsers(users.filter((user: any) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingUserId(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="space-x-4">
          <Link
            to="/users/add"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add User
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user: any) => (
              <div key={user.id} className="border p-4 rounded-lg shadow">
                <img
                  src={user.avatar}
                  alt={`${user.first_name}'s avatar`}
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <h2 className="text-xl font-semibold text-center mt-2">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-600 text-center">{user.email}</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <Link
                    to={`/users/${user.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    View
                  </Link>
                  <Link
                    to={`/users/edit/${user.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={`bg-red-500 text-white px-3 py-1 rounded ${
                      deletingUserId === user.id ? "spinner" : ""
                    }`} // Add spinner class when deleting this user
                  >
                    {deletingUserId === user.id ? "Deleting..." : "Delete"}{" "}
                    {/* Show loading text while deleting */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
