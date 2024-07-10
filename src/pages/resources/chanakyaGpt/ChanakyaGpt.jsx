import { useState } from "react";
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey : process.env.REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser : true
})

const ChanakyaGpt = () => {
  const [prompt, setPrompt] = useState();
  const [response, setResponse] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(prompt);
    //making an api call to groq
    try {
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
    console.log(response.choices[0]?.message?.content || '');
    setResponse(response.choices[0]?.message?.content);
    } catch(error){
      console.log("Error occured")
    }
  }

  return (
    <div className="font-bold flex justify-center h-screen items-center rounded-lg">
            <form onSubmit={e => handleSubmit(e)} className="shadow-md p-10">
                <div className="flex justify-center items-center flex-col gap-7">
                    <h1 className="text-3xl font-semibold">Ask me anything</h1>
                    <input onChange={e => setPrompt(e.target.value)} value={prompt} type="text" placeholder="ask me anything" className="w-full text-xl font-normal border-gray-300 rounded-lg border-2 p-2"/>
                    <button className="text-white w-full bg-black mt-2 p-2 rounded-md cursor-pointer">Search</button>
                </div>
                <div className="font-normal mt-2">
                {response && <>
                    {response}</>}
                </div>
            </form>
        </div>
  )
}

export default ChanakyaGpt;
