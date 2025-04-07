import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section className="min-h-screen text-gray-800 flex flex-col items-center justify-center p-8 text-center gap-8">
            <img
                src="/chanakya_and_chandragupta_maurya.jpg"
                alt="Chanakya Illustration"
                className="w-80 h-80 object-cover rounded-xl shadow-md"
            />

            <h1 className="text-5xl font-bold tracking-tight text-[#bfae64]">
                404 - Page Not Found
            </h1>

            <p className="text-lg text-gray-700 max-w-xl">
                Oops! The path you're trying to take does not lead to wisdom. Let’s guide you back to the right one.
            </p>

            <Link to="/" className="flex items-center gap-4 border border-[#bfae64] hover:bg-[#f4eacb] text-[#bfae64] font-semibold py-3 px-6 rounded-md transition duration-300">
                <i className="fi fi-rr-music"></i>
                <span>Listen to Chanakya Niti</span>
            </Link>

            <p className="mt-10 text-sm text-gray-500 italic">
                "A person should not be too honest. Straight trees are cut first and honest people are screwed first." – Chanakya
            </p>
        </section>
    );
};

export default PageNotFound;
