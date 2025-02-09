const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  

const mediaList = `
#Action

Lucy
Type: Movie
Movie Genre: Action, Sci-Fi
Description: A woman gains superhuman abilities after a drug is absorbed into her system.
Cover Image URL: ./assets/movie-bg/Lucy.jpg
Image 2 URL: ./assets/recommend/lucy/recommendation-wide-2.jpg
Caption for Image 2: "Morgan Freeman as Prof. Norman"
Image 3 URL: ./assets/recommend/Lucy/recommendation-wide-1.jpg
Caption for Image 3: "Scarlett Johansson as Lucy"

Taken 2
Type: Movie
Movie Genre: Action, Thriller
Description: In Istanbul, retired CIA operative Bryan Mills and his wife are taken hostage by the father of a kidnapper Mills killed while rescuing his daughter.
Cover Image URL: ./assets/movie-bg/taken.jpg
Image 2 URL: ./assets/recommend/taken/recommendation-wide-2.jpg
Caption for Image 2: "Maggie Grace as Kim"
Image 3 URL: ./assets/recommend/taken/recommendation-wide-1.jpg
Caption for Image 3: "Liam Neeson in action"

6 Underground
Type: Movie
Movie Genre: Action, Thriller
Description: Six individuals from all around the globe, each the very best at what they do, have been chosen to delete their pasts to change the future.
Cover Image URL: ./assets/movie-bg/6_underground.jpg
Image 2 URL: ./assets/recommend/underground/recommendation-wide-2.jpg
Caption for Image 2: "Mélanie Laurent as Two"
Image 3 URL: ./assets/recommend/underground/recommendation-wide-1.jpg
Caption for Image 3: "Ryan Reynolds as One"

#Sci-Fi

iBoy
Type: Movie
Movie Genre: Sci-Fi, Thriller
Description: A teenager wakes from a coma to discover that fragments from his broken smartphone have been embedded into his brain and turned him into an actualized app with superhuman powers.
Cover Image URL: ./assets/movie-bg/iBoy.jpg
Image 2 URL: ./assets/recommend/iBoy/recommendation-wide-2.jpg
Caption for Image 2: "Bill Milner as Tom"
Image 3 URL: ./assets/recommend/iBoy/recommendation-wide-1.jpg
Caption for Image 3: "Bill Milner in action"

The Umbrella Academy
Type: Series
Movie Genre: Sci-Fi, Fantasy
Description: A family of former child heroes, now grown apart, must reunite to continue to protect the world.
Cover Image URL: ./assets/movie-bg/the_umbrella_academy.jpg
Image 2 URL: ./assets/recommend/umbrella/recommendation-wide-2.jpg
Caption for Image 2: "Aidan Gallagher as Number Five"
Image 3 URL: ./assets/recommend/umbrella/recommendation-wide-1.jpg
Caption for Image 3: "The Umbrella Academy in action"

#Drama

Pride & Prejudice
Type: Movie
Movie Genre: Drama, Romance
Description: Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?
Cover Image URL: ./assets/movie-bg/pride_prejudice.jpg
Image 2 URL: ./assets/recommend/pride/recommendation-wide-2.jpg
Caption for Image 2: "Matthew Macfadyen as Mr. Darcy"
Image 3 URL: ./assets/recommend/pride/recommendation-wide-1.jpg
Caption for Image 3: "Elizabeth and Mr. Darcy"

Dynasty
Type: Series
Movie Genre: Drama
Description: Follows two of America's wealthiest families as they feud for control over their fortune and their children.
Cover Image URL: ./assets/movie-bg/dynasty.jpg
Image 2 URL: ./assets/recommend/dynasty/recommendation-wide-2.jpg
Caption for Image 2: "Elizabeth Gillies as Fallon"
Image 3 URL: ./assets/recommend/dynasty/recommendation-wide-1.jpg
Caption for Image 3: "The Carringtons"

Fate: The Winx Saga
Type: Series
Movie Genre: Fantasy, Drama
Description: Bloom was born on December 10, 2004, to unknown parents. When she was a baby, she was stolen by witches and taken to Aster Dell. Rosalind eventually destroyed Aster Dell and saved Bloom.
Cover Image URL: ./assets/movie-bg/winx.jpg
Image 2 URL: ./assets/recommend/fate/recommendation-wide-2.jpg
Caption for Image 2: "Danny Griffin as Sky"
Image 3 URL: ./assets/recommend/fate/recommendation-wide-1.jpg
Caption for Image 3: "Bloom and Sky"

#Horror

Deliver Us from Evil
Type: Movie
Movie Genre: Horror, Thriller
Description: New York police officer Ralph Sarchie investigates a series of crimes. He joins forces with an unconventional priest, schooled in the rites of exorcism, to combat the possessions that are terrorizing their city.
Cover Image URL: ./assets/movie-bg/deliver_us_from_evil.jpg
Image 2 URL: ./assets/recommend/deliver/recommendation-wide-2.jpg
Caption for Image 2: "Olivia Munn as Jen"
Image 3 URL: ./assets/recommend/deliver/recommendation-wide-1.jpg
Caption for Image 3: "Sarchie in action"

The Haunting of Bly Manor
Type: Series
Movie Genre: Horror, Drama
Description: After an au pair’s tragic death, Henry hires a young American nanny to care for his orphaned niece and nephew who reside at Bly Manor with the chef Owen, groundskeeper Jamie, and housekeeper, Mrs. Grose.
Cover Image URL: ./assets/movie-bg/the_haunting.jpg
Image 2 URL: ./assets/recommend/haunting/recommendation-wide-2.jpg
Caption for Image 2: "Amelia Eve as Jamie Taylor"
Image 3 URL: ./assets/recommend/haunting/recommendation-wide-1.jpg
Caption for Image 3: "The Haunting of Bly Manor"

The Exorcism of Emily Rose
Type: Movie
Movie Genre: Horror, Drama
Description: A lawyer takes on a negligent homicide case involving a priest who performed an exorcism on a young girl.
Cover Image URL: ./assets/movie-bg/the_exorcism_of_emily.jpg
Image 2 URL: ./assets/recommend/emily/recommendation-wide-2.jpg
Caption for Image 2: "Tom Wilkinson as Father Moore"
Image 3 URL: ./assets/recommend/emily/recommendation-wide-1.jpg
Caption for Image 3: "Jennifer Carpenter as Emily Rose"

#Mystery

Archive 81
Type: Series
Movie Genre: Mystery, Thriller, Action
Description: An archivist hired to restore a collection of tapes finds himself reconstructing the work of a filmmaker and her investigation into a dangerous cult.
Cover Image URL: ./assets/movie-bg/archives_81.jpg
Image 2 URL: ./assets/recommend/archive/recommendation-wide-2.jpg
Caption for Image 2: "Julia Chan as Anabelle"
Image 3 URL: ./assets/recommend/archive/recommendation-wide-1.jpg
Caption for Image 3: "Dan Turner in action"

Midnight Mass
Type: Series
Movie Genre: Mystery, Horror
Description: An isolated island community experiences miraculous events - and frightening omens - after the arrival of a charismatic, mysterious young priest.
Cover Image URL: ./assets/movie-bg/midnightmass.jpg
Image 2 URL: ./assets/recommend/midnight/recommendation-wide-2.jpg
Caption for Image 2: "Hamish Linklater as Father Paul"
Image 3 URL: ./assets/recommend/midnight/recommendation-wide-1.jpg
Caption for Image 3: "Father Paul in action"

#Fantasy

Stranger Things
Type: Series
Movie Genre: Sci-Fi, Fantasy, Drama
Description: This is not yours to fix alone. You act like you're all alone out there in the world, but you're not. You're not alone.
Cover Image URL: ./assets/movie-bg/stranger.jpg
Image 2 URL: ./assets/recommend/stranger/recommendation-wide-2.jpg
Caption for Image 2: "Gaten Matarazzo as Dustin"
Image 3 URL: ./assets/recommend/stranger/recommendation-wide-1.jpg
Caption for Image 3: "Eleven and Dustin"

The 7 Lives of Lea
Type: Series
Movie Genre: Fantasy, Drama
Description: Follows a woman who stumbles upon the body of Ismael, a teenager who disappeared thirty years earlier, with the event taking her back to 1991 and seeing her wake up every morning in the body of a different person.
Cover Image URL: ./assets/movie-bg/7_lives_of_lea.jpg
Image 2 URL: ./assets/recommend/lea/recommendation-wide-2.jpg
Caption for Image 2: "Khalil Ben Gharbia as Ismaël"
Image 3 URL: ./assets/recommend/lea/recommendation-wide-1.jpg
Caption for Image 3: "Raïka Hazanavicius as Léa"

Snowpiercer
Type: Series
Movie Genre: Fantasy, Drama
Description: Seven years after the world has become a frozen wasteland, the remnants of humanity inhabit a perpetually-moving train that circles the globe, where class warfare, social injustice, and the politics of survival play out.
Cover Image URL: ./assets/movie-bg/snowpiercer.jpg
Image 2 URL: ./assets/recommend/snow/recommendation-wide-2.jpg
Caption for Image 2: "Mickey Sumner as Bess Till"
Image 3 URL: ./assets/recommend/snow/recommendation-wide-1.jpg
Caption for Image 3: "Daveed Diggs as Andre Layton"
`;

const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;








const systemPrompt = `Your are an assistant for Nissan. You will take the user through a guided journey that allows them to discover the new Nissan Patrol Nismo. You will act as a salesperson for Nissan throughout this journey and attempt to get the user to book a test drive. Embelish the response instructions below with proper sales techniques.


#Description of Nissan: Nissan Motor Corporation (日産自動車株式会社, Nissan Jidōsha kabushiki gaisha) is a Japanese multinational automobile manufacturer headquartered in Yokohama, Kanagawa, Japan. The company sells its vehicles under the Nissan and Infiniti brands, and formerly the Datsun brand, with in-house performance tuning products (including cars) under the Nismo and Autech brands. The company traces back to the beginnings of the 20th century, with the Nissan zaibatsu or called Nissan Group.


#Website URL for Nissan: Visit https://www.nissan-global.com/EN/

#Nismo Overview: The Nissan Patrol NISMO is the stuff of legend. Envisioned by elite engineers, raised on the track and treasured by owners, the NISMO is the ultimate marque of performance, luxury and respect. More tests. More engineering. More perfecting of the driving experience. Tuned to flawlessness, the NISMO’s redefined aerodynamics, race-proven engineering and Takumi engine is nothing short of extraordinary. The growl of the exhaust is a product of a legendary V8 and concentrated 428 HP.



#Your first message to the user
Dont we all wish for an unforgettable and luxorious driving experience?



#Components
You have access to tools to display components. You can use the display_component tool to display a component. The component_id is the id of the component you want to display. The message is the message to display before the component. The data is an array of objects that contain data to display in the component.

#Component Ids"
Button Component:
677b876a3f242ae7554c18bd

Grid Button Component:
677b997b25988a3819bfc107

Thumbnail Slider Component:
677ba39b5b7ef359dd719d1e

Detail Slider Component:
677eaffdc8beb942dbe30f94

Detail Slider Two Component:
677eb8b972647703c7d1d152

CTA Button Component:
677bb8e653a230351e1812ca


#Journey of the User for This Campaign:

How to start: Show option buttons for the following using your button component with the display_component tool:
"Yes! Tell me more!"
"No I am not interested"


Send only button_text in your data array.

In the message with the component, send the first message. Do not use any headers. SAY ONLY THE FIRST MESSAGE.

<IMPORTANT>
from this point on you will use sales techniques to modify all the responses you send to the user and to tool calls. Be persausive and use sales techniques to get the user to book a test drive.
</IMPORTANT>

If the user selects "Yes! Tell me more!" display the following options using your button component with the display_component tool:
I would love that
Maybe next time! Thank you!

Send only button_text in your data array. In the message with the component say only: "Let me give you a tour of the Nissan Patrol Nismo!" add sales techniques to the response. keep it short.

If the user selects "I would love that" display the following options using your detail slider component with the display_component tool:
Slide 1:
Image:
./assets/recommend/option-product-1.jpg
Description: Its distinctive presence is unmistakable. The aerodynamics have been refined even more to embody the character of the Patrol NISMO.

Slide 2:
Image:
./assets/recommend/option-product-2.jpg
Description: It’s first-class all the way. What the outside exudes in confidence the inside oozes in style and plushness. NISMO’s racing pedigree is prominent in its steering wheel.

In your message with the component say: "Here are some of the features of the Nissan Patrol Nismo! Enjoy exploring the gallery." add sales techniques to the response. keep it short.

If they select "View Gallery" display the following options using your detail slider two component with the display_component tool:
Image: ./assets/recommend/rec_wide_1_1.jpg
Description: NISMO 22 INCH ALLOY WHEELS: (gpt add something here in one short line to describe why the wheel is so special)

Image: ./assets/recommend/rec_wide_1_2.jpg
Description: NISMO DUAL EXHAUST FINISHING: (gpt add something here in one short line to describe why this is so special)

Image: ./assets/recommend/rec_wide_1_3.jpg
Description: NISMO F1 INSPIRED LED REAR FOG LIGHT: (gpt add something here in one short line to describe why this is so special)

If the user selects "Book A Test Drive Now", tell them you would be delighted to book one for them. ask them the following questions one by one to collect their information:
What is your name?
What is your phone number?
What is your email address?
What is your preferred date and time for the test drive?

After this information is collected, thank the user for their time and say: "Our team will be in touch shortly to confirm your test drive. Thank you for your time. We hope to see you in a Nissan Patrol Nismo real soon!"

If the user selects "This is not my kind of thing" then show them a CTA button component with the display_component tool. You only need to show one button with button_text: "VISIT OUR WEBSITE" and button_link: "https://www.nissan-global.com/EN/".
Only send button_text and button_link in your data array.
In the message with the component say: "No worries! We'd love to change your mind though. Don't forget to visit our website to see other types of Nissan vehicles."

#Notes about journey:
The user may deviate from any of these steps and ask you further questions. You can reply to those questions but always try and eventually bring the conversation back to these steps to continue/complete the journey. 

When asked to show a video for a case study, simply show the video in a responsive iframe on an new line. Do not add any further details after the video. Ensure there is a padding of 20px before the video. If there is no video for the case study, tell the user that there is no video for that case study.

Do not use markdown in your response.
`;


async function sendMessage(message) {
    
    // Step 1: Get session_id from local storage
    const session_id = localStorage.getItem('session_id');
    const userId = localStorage.getItem('userId'); // Assuming user_id is stored in local storage
    
    // Step 2: Send a request to the AI
    const requestBody = {
        session_id: session_id,
        user_id: userId,
        message: message + reprompt,
        tools: tools,
        custom_prompt: systemPrompt,
        custom_temp: temperature
    };

    try {
        const response = await fetch('/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.finish_reason === 'stop') {
            console.log(data);
            return data;
        } else if (data.finish_reason === 'tool_calls') {
            console.log(data);
            return data;
            // await handleToolCalls(data);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

//expose sendMessage globally
window.sendMessage = sendMessage;

document.addEventListener('DOMContentLoaded', () => {
    // Create a session ID using the current timestamp
    const timestamp = Date.now();
    const sessionId = `session_${timestamp}`;
    
    // Save the session ID to local storage
    localStorage.setItem('session_id', sessionId);

    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');


    // Function to handle sending message
    async function handleSendMessage(message) {
        if (message) {
            if (message === 'Start') {
                //display nothing on start message  
            } else {
                displayMessage(message, 'user');  
            }

            // Create and display the skeleton loader
            const skeletonLoader = document.createElement('div');
            skeletonLoader.className = 'skeleton-loader';
            document.querySelector('.chat-messages').appendChild(skeletonLoader);

            const data = await sendMessage(message);

            if (data.finish_reason === 'tool_calls') {
                console.log(data);
                console.log('its a tool call');
                                
                await handleToolCalls(data, skeletonLoader);
            } else if (data.finish_reason === 'stop') {
                // Remove the skeleton loader
                skeletonLoader.remove();
                displayMessage(data.response, 'ai');
            }
        }
    }

    // Expose handleSendMessage globally
    window.handleSendMessage = handleSendMessage;

    handleSendMessage('Start');
    var firstMessage = document.getElementsByClassName('user-message')[0];

// Event listener for send button click
sendButton.addEventListener('click', sendMessageHandler);
sendButton.addEventListener('touchend', sendMessageHandler);

// Event listener for Enter key press
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents new line in textarea
        sendMessageHandler();
    }
});

function sendMessageHandler() {
    const message = messageInput.value.trim();
    if (message) {
        messageInput.value = '';
        handleSendMessage(message);
    }
}
});
