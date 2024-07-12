import React, { useContext } from 'react';
import '../css/Home.css';

function Home({ ThemeContext }) {
    const theme = useContext(ThemeContext);
    const classAddition = theme === 'dark' ? '-dark' : '';
    
    return (
        <div className={`home-container${classAddition}`}>
            <section className={`home-header${classAddition}`}>
                <h1>Welcome to Fitspo Pal!</h1>
                <p>Take your fitness journey to the next level!!</p>
                <button className={`cta-button${classAddition}`}>Get Started</button>
            </section>
            <section id="workouts" className={`home-content${classAddition}`}>
                <div className={`content-box${classAddition}`}>
                    <h2>Workout Plans</h2>
                    <p>Personalized workout plans fit to your own goals.</p>
                </div>
                <div className={`content-box${classAddition}`}>
                    <h2>Nutrition Guides</h2>
                    <p>Personalized nutrition and diet plans to keep you feeling and looking great!</p>
                </div>
                <div className={`content-box${classAddition}`}>
                    <h2>Track Progress</h2>
                    <p>Track your progress and stay motivated!</p>
                </div>
            </section>
            <section className={`home-features${classAddition}`}>
                <div className={`feature-box${classAddition}`}>
                    <h2>Community Groups</h2>
                    <p>Join the community group chats of fellow fitness gurus to have fun and make friends!</p>
                </div>
                <div className={`feature-box${classAddition}`}>
                    <h2>Expert Trainers</h2>
                    <p>Reach out to our team of licensed and experienced trainers for any help!.</p>
                </div>
            </section>
            <section id="contact" className={`home-contact${classAddition}`}>
                <h2>Contact Us</h2>
                <p>Any questions? Conntact us below!</p>
                <form className={`contact-form${classAddition}`}>
                    <input className='contact-form-input-dark' type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>
    );
}

export default Home;
