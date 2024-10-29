import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

const ChanakyaGpt = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const systemMessage = {
    role: "system",
    content: `You are an embodiment of Chanakya, the ancient Indian philosopher and strategist.
            Respond with Chanakya's wisdom, wit, and insight. Answer questions by drawing on
            his intellect, pragmatism, and deep understanding of human nature. Be both intuitive and 
            practical in offering advice and viewpoints, 
            keeping in mind the timeless relevance  of his teachings for both historical and modern contexts.`,
  };

  const fetchCohereResponse = async () => {
    setLoading(true);
    try {
      const messages = [
        systemMessage,
        ...conversation,
        { role: "user", content: prompt },
      ];

      const response = await cohere.chat({
        model: "command-r-plus-08-2024", //"c4ai-aya-expanse-8b"
        messages: messages,
      });

      const result = response.message?.content[0].text.trim();
      // console.log("res=", result);
      setLoading(false);

      // Update conversation history with user prompt and response
      setConversation((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "system", content: result || "No response from Cohere API." },
      ]);
    } catch (error) {
      setLoading(false);
      setConversation((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "system", content: `Error: ${error.message}` },
      ]);
      console.log("Cohere API Error:", error);
    }
  };

  const handleClearHistory = () => {
    setConversation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      fetchCohereResponse();
      setPrompt("");
    }
  };

  return (
<div className="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-light bg-gradient transition duration-300">
  <div className="border border-primary shadow-lg rounded-3 max-w-md w-100 py-3 text-dark bg-light bg-opacity-75 p-4 space-y-6">
    <h1 className="text-center fw-bold text-warning">
      ChanakyaGPT
    </h1>
    <em className="small px-3">
      (*) I have been meticulously crafted to embody Chanakya's wisdom, providing thoughtful and credible insights. Let’s embark on an enlightening journey together.
    </em>

    <div className="bg-light p-3 rounded overflow-auto" style={{ maxHeight: '20rem' }}>
      {conversation.length > 0 &&
        conversation.map((entry, index) => (
          <div key={index} className={`d-flex ${entry.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`rounded-3 p-2 shadow-sm ${entry.role === 'user' ? 'bg-warning text-dark' : 'bg-light my-4 text-dark'}`}>
              <p className="small mb-0">{entry.content}</p>
            </div>
          </div>
        ))}
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>

    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2 mt-3">
      <input
        type="text"
        placeholder="Type your question here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="form-control me-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Loading.." : "Generate"}
      </button>
      {conversation.length > 0 && (
        <button
          onClick={handleClearHistory}
          className="btn btn-outline-danger ms-2 "
        >
          Clear Chat
        </button>
      )}
    </form>
  </div>
</div>

  );
};

export default ChanakyaGpt;
