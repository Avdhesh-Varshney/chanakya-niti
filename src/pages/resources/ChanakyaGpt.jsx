import { useState } from "react";
import Groq from 'groq-sdk';
import { ClipLoader } from "react-spinners";
import '../../css/ChanakyaGpt.css';
const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
})

const ChanakyaGpt = () => {
  const [prompt, setPrompt] = useState();
  const [response, setResponse] = useState();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prompt);
    //making an api call to groq
    try {
      setLoader(true);
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `
                Answer this question as if you are chanakya and the question is :
                    ${prompt}
                `
          }
        ],
        model: "llama3-8b-8192"
      });
      setLoader(false);
      console.log(response.choices[0]?.message?.content || '');
      setResponse(response.choices[0]?.message?.content);
    } catch (error) {
      console.log("Error occured")
    }
    setPrompt('');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="row w-100 justify-content-center rounded-lg">
    <form onSubmit={e => handleSubmit(e)} className="col-md-6 p-4 shadow-md  rounded-xl bg-secondary">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-center">Ask your questions</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <input onChange={e => setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type something..." className="form-control text-xl font-normal border-gray-300 rounded-lg mb-3 p-2" />
          {loader ? 
            <button className="btn btn-light w-100 mt-2 p-2 rounded-md" disabled><ClipLoader /></button> : 
            <button className="btn btn-dark w-100 mt-2 p-2 rounded-md">Search</button>}
        </div>
      </div>
      <div className="font-normal mt-3">
        {response && <>{response}</>}
      </div>
    </form>
  </div>
</div>

  )
}

export default ChanakyaGpt;
