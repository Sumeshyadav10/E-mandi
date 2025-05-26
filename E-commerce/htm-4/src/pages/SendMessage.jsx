import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const SendMessagePage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachments([...attachments, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("content", formData.content);

      attachments.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      await axiosInstance.post("/messages", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Message sent successfully!");
      setFormData({ subject: "", content: "" });
      setAttachments([]);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-6 py-12">
      <div className="w-full max-w-2xl p-10 bg-white rounded-3xl shadow-xl border border-green-300">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
          Send Seller Request
        </h2>

        {success && (
          <p className="text-green-600 text-center mb-4 font-semibold">
            {success}
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center mb-4 font-semibold">
            {error}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">
              Subject
            </label>
            <input
                id="subject"
                type="text"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                />

                {/* <textarea
                id="content"
                rows="5"
                placeholder={`Write your message here...\n- Farmer's Name (or farm name)\n- Contact Details (phone number, email)\n- Farm Location (address, region)\n- ID Proof (required for seller registration)`}
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                />

                <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-green-400 focus:outline-none" */}
                {/* /> */}

          </div>

          <div>
            <label htmlFor="content" className="block mb-2 font-semibold text-gray-700">
              Message
            </label>
            <textarea
                id="content"
                rows="5"
                placeholder={`Write your message here...\n- Farmer's Name (or farm name)\n- Contact Details (phone number, email)\n- Farm Location (address, region)\n- ID Proof (required for seller registration)`}
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg border border-gray-300 bg-gray-50 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
          </div>

          {/* Attachments */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Attach Important Documents
            </label>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-green-100 p-2 rounded-md"
                >
                  <span className="text-sm text-gray-800">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-lg bg-green-600 hover:bg-green-500 text-white font-bold text-lg transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessagePage;
