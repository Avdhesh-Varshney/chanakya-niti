import React, { useState, useEffect } from 'react';
import '../css/SuccessStories.css'; // Import CSS for styling

const SuccessStories = () => {
    const [name, setName] = useState('');
    const [story, setStory] = useState('');
    const [stories, setStories] = useState([]);

    // Load initial stories and saved stories from local storage
    useEffect(() => {
        const savedStories = JSON.parse(localStorage.getItem('stories')) || [];
        const initialStories = [
            { name: "Chanakya", story: "Known as the father of Indian economics and political science, Chanakya's teachings on governance and strategy in the Arthashastra have shaped political thinking and leadership for centuries.", type: 'initial' },
            { name: "Confucius", story: "Confucius emphasized family, respect, and ethical governance, creating a system of thought that influenced East Asian culture, philosophy, and political systems for over two millennia.", type: 'initial' },
            { name: "Plato", story: "Plato, one of the foundational figures in Western philosophy, wrote works like 'The Republic,' which explores justice, morality, and the ideal state, laying the groundwork for modern philosophy and political theory.", type: 'initial' },
            { name: "Sun Tzu", story: "Author of 'The Art of War,' Sun Tzu's timeless insights on strategy and warfare remain relevant in business, sports, and personal success, advocating for knowledge, preparation, and adaptability.", type: 'initial' },
            
            // Personal stories inspired by these great minds
            { name: "Aditi", story: "Inspired by Chanakya, I've learned to approach my career with a strategic mindset, always planning ahead and thinking about the bigger picture. His teachings have helped me navigate office politics gracefully.", type: 'personal' },
            { name: "Rahul", story: "Confucius's emphasis on respect and family has transformed the way I communicate with my parents and colleagues. His philosophy reminds me daily to prioritize harmony and respect in my relationships.", type: 'personal' },
            { name: "Sneha", story: "Reading Plato’s ideas on justice and morality made me rethink my role in society. I now volunteer regularly, and I've become more conscious of how my actions impact others.", type: 'personal' },
            { name: "Vikram", story: "Sun Tzu's 'Art of War' inspired me to approach challenges in my startup with patience and a focus on adaptability. I’ve learned that preparation and understanding my competitors is crucial.", type: 'personal' },
        ];
        setStories([...initialStories, ...savedStories]);
    }, []);

    // Save stories to local storage whenever they update
    useEffect(() => {
        localStorage.setItem('stories', JSON.stringify(stories.filter(s => s.type === 'user-submitted')));
    }, [stories]);

    const handleSubmit = () => {
        if (name.trim() && story.trim()) {
            setStories([...stories, { name, story, type: 'user-submitted' }]);
            setName('');
            setStory('');
            alert("Your story has been submitted successfully!");
        } else {
            alert("Please fill out both fields.");
        }
    };

    return (
        <div className="container">
            <h1>Success Stories and Inspiration Board</h1>
            <div className="story-form">
                <h3>Share Your Story!</h3>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <textarea 
                    placeholder="Your Success Story" 
                    value={story} 
                    onChange={(e) => setStory(e.target.value)} 
                    required 
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <h2>Inspiration from Great Minds</h2>
            <div className="stories">
                {stories.filter(s => s.type === 'initial').map((s, index) => (
                    <div key={index} className="story initial">
                        <h3>{s.name}</h3>
                        <p>{s.story}</p>
                    </div>
                ))}
            </div>

            <h2>Personal Stories Inspired by Great Minds</h2>
            <div className="stories">
                {stories.filter(s => s.type === 'personal').map((s, index) => (
                    <div key={index} className="story personal">
                        <h3>{s.name}</h3>
                        <p>{s.story}</p>
                    </div>
                ))}
            </div>

            <h2>Stories from Our Community</h2>
            <div className="stories">
                {stories.filter(s => s.type === 'user-submitted').map((s, index) => (
                    <div key={index} className="story user-submitted">
                        <h3>{s.name}</h3>
                        <p>{s.story}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;