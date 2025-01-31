import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EmailApp = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_qc4cnjl", "template_953yy5s", form.current, {
        publicKey: "MXqwukC1Qf2sfugaW",
      })
      .then(
        () => {
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000);
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-4">
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Contact Us
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="user_email"
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
      {showPopup && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default EmailApp;
