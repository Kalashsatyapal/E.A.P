import { useEffect, useState } from 'react';
import axios from 'axios';

const UploadHistory = () => {
  const [files, setFiles] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/excel/my-uploads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFiles(res.data);
    } catch (err) {
      alert('Failed to fetch files');
    }
  };

  const deleteFile = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/excel/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchFiles(); // Refresh list
    } catch (err) {
      alert('Failed to delete');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Uploaded Files</h2>

        {files.length === 0 && <p>No uploads found.</p>}

        {files.map(file => (
          <div key={file._id} className="border-b py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{file.originalName}</p>
              <p className="text-sm text-gray-500">Uploaded at: {new Date(file.uploadedAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedData(file.data)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Preview
              </button>
              <button
                onClick={() => deleteFile(file._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {selectedData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Preview Data</h3>
            <div className="overflow-auto max-h-96 border rounded">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(selectedData[0] || {}).map((key, index) => (
                      <th key={index} className="border px-4 py-2 text-left text-sm">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      {Object.values(row).map((val, j) => (
                        <td key={j} className="border px-4 py-2 text-sm">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 text-sm text-red-600 hover:underline"
              onClick={() => setSelectedData(null)}
            >
              Close Preview
            </button>
          </div>
        )}

        <a
          href="/dashboard"
          className="block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default UploadHistory;
