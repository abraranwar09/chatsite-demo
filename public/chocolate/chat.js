const temperature = 0.5;

const today = new Date();
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('User Timezone:', userTimeZone);

const formattedToday = today.toLocaleString('en-US', { timeZone: userTimeZone }).replace(',', '');  

const productList = `
CATEGORY: CHOCOLATE

Name: OUNSA CREAM BITTER SMALL
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172977445566ccc0cab2a92a71639c8c6bCH1006+OUNSA+CREAM+BITTER+SMALL.jpg
Price: $40

Name: OUNSA CREAM SWEET SMALL
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708918066ccc0cab2a92a71639c8c6bCH1007+OUNSA+CREAM+SWEET+SMALL.webp
Price: $40

Name: MAYA WAFER
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708923066ccc0cab2a92a71639c8c6bCH1008+MAYA+WAFER+(SQAURE).webp
Price: $40

Name: ROCHE HAZELNUT MOLD SWEET
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708927566ccc0cab2a92a71639c8c6bCH1010+ROCHE+HAZELNUT+MOLD+SWEET.webp
Price: $40

Name:  ROCHE HAZELNUT DARK
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172648123266ccc0cab2a92a71639c8c6bCH1011+ROCHE+HAZELNUT+MOLD+BITTER.JPG
Price: $40

Name: CHOCOLATE LEMON SLICE MANDARINE
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708936466ccc0cab2a92a71639c8c6bCH1013+CHOCOLATE+LEMON+SLICE+MANDARINE.webp
Price: $40

Name: THREE HAZELNUTS CROQUINT SWEET
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708939066ccc0cab2a92a71639c8c6bCH1014+THREE+HAZELLNUTS+CROQUENT+SWEET.webp
Price: $40

Name: THREE HAZELNUT CROQUANT BITTER
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708942566ccc0cab2a92a71639c8c6bCH1015+THREE+HAZELLNUT+CROQUINT+BITTER.webp
Price: $40

Name: DATE CHOCOLATE
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708948266ccc0cab2a92a71639c8c6bCH1019+DATE+CHOCOLATE.webp
Price: $40

Name: LONG RIMA DARK
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172977553866ccc0cab2a92a71639c8c6bCH1022+LONG+RIMA++DARK.jpg
Price: $40

Name: BALL WALNUT AND PISTACHIOS DARK
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708952966ccc0cab2a92a71639c8c6bCH1025+BALLL+WALNUT+AND+PISTACHIOS+DARK.webp
Price: $40

Name: BALL WALNUT AND PISTACHIOS SWEET
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708956366ccc0cab2a92a71639c8c6bCH1026+BALLL+WALNUT+AND+PISTACHIOS+SWEET.webp
Price: $40

Name: BALL COCONUT
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172708960766ccc0cab2a92a71639c8c6bCH1028+BALL+COCONUT.webp
Price: $40

CATEGORY: NOUGAT & MALBAN

Name: SESAME CROQUANT (1kg Package | ~ 135 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709166666ccc0cab2a92a71639c8c6bRM1025%20S%20SESAME%20CROQUIN.webp
Price: $15

Name: MALBAN SUGAR DUSTED (SUPER) (1kg Package | ~ 33 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172967740566ccc0cab2a92a71639c8c6bML1012%20MALBAN%20SUGAR%20DUSTED%20(SUPER)%202.jpg
Price: $15

Name: MALBAN WITH HAZELNUT (SPREAD) (1kg Package | ~ 43 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709232366ccc0cab2a92a71639c8c6bML1018%20SMALBAN%20WITH%20HAZELNUT%20(SPREAD).webp
Price: $18

Name: MALBAN APRICOT (ROUND) (1kg Package | ~ 58 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172976092266ccc0cab2a92a71639c8c6bmalban%20apricot%20round.jpg
Price: $15

Name: MALBAN MANDARINE (1kg Package | ~ 28 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709235066ccc0cab2a92a71639c8c6bML1025%20S%20MALBAN%20MANDARINE.webp
Price: $15

Name: MALBAN APRICOT (SQUARE) (1kg Package | ~ 58 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709238166ccc0cab2a92a71639c8c6bML1026%20E%20MALBAN%20APRICOT%20(SQUARE).webp
Price: $18

Name: MALBAN WITH PISTACHIOS (ROUND) (1kg Package | ~ 38 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709225166ccc0cab2a92a71639c8c6bML1003%20SMALBAN%20WITH%20PISTACHIOS%20(SPREADROUND).webp
Price: $20

Name: MALBAN WAFER (1kg Package | ~ 58 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172908147466ccc0cab2a92a71639c8c6bmalban%20wafer%20-%20090.png
Price: $15

Name: MALBAN SUPER ROUND (HAND WRAPPED) (1kg Package | ~ 48 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709259466ccc0cab2a92a71639c8c6bML1041%20E%20MALBAN%20ROUND%20(HAND%20WRAPPED).webp
Price: $18

Name: PLAIN APRICOT (SQUARE) (1kg Package | ~ 63 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172976021966ccc0cab2a92a71639c8c6bML1044%20E%20PLAIN%20APRICOT%20(SQUARE).png
Price: $15


CATEGORY: SPECIAL

Name: JALLAB (1kg Pack | ~43 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709135266ccc0cab2a92a71639c8c6bRM1000%20%20E%20JALLAB.webp
Price: $18

Name: DATES MANDARINE (1kg Pack | ~58 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709137666ccc0cab2a92a71639c8c6bRM1003%20SP%20DATES%20MANDARINE.webp
Price: $20

Name: DATES ALMOND (1kg Package | ~68 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709140366ccc0cab2a92a71639c8c6bRM1005%20SP%20DATES%20ALMOND.webp
Price: $20

Name: MALBAN SUNBIRD DATES CIGAR (1kg Package | ~68 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709142866ccc0cab2a92a71639c8c6bRM1011%20E%20MALBAN%20SUNBIRD%20DATES%20CIGAR.webp
Price: $18

Name: CROQUIN ROSE (1kg Package | ~97 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709144966ccc0cab2a92a71639c8c6bRM1013%20SP%20CROQUINT%20%20ROSE.webp
Price: $20

Name: MEGHLE (1kg Package | ~48 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709154066ccc0cab2a92a71639c8c6bRM1020%20E%20MOGHLI%20%20LONG.webp
Price: $15

Name: ONASIS (1kg Package | ~38 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709156466ccc0cab2a92a71639c8c6bRM1021%20SP%20ONASIS.webp
Price: $30

Name: GHOUTA (1kg Package | ~48 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709159466ccc0cab2a92a71639c8c6bRM1022%20SP%20GHOUTA.webp
Price: $25

Name: JOCKER (1kg Package | ~43 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709162866ccc0cab2a92a71639c8c6bRM1024%20SP%20JOCKER.webp
Price: $20

Name: MEN W SALWA (BALL) (1kg Package | ~48 Pieces)
Image: https://sonbolabucket.s3.ap-southeast-2.amazonaws.com/172709171866ccc0cab2a92a71639c8c6bRM1026%20E%20MEN%20W%20SALWA%20%20(BALL).webp
Price: $18
`;

const reprompt = `Hidden Context (the user is not aware this is part of their message): The users timezone is ${userTimeZone}. The current date/time is ${formattedToday}.`;








const systemPrompt = `Your are an assistant for a chocolate factory named Oussaima Ghrawi. You will take the user through a guided journey that allows them to find chocolate products that are tailored and personalised to them. You will render all your output in HTML so it can be easily rendered and shown to the user. 


#About Oussaima Ghrawi:
Founded in 1973 by Mrs. Oussaima Ghrawi Ladki, Oussaima Ghrawi & Sons continues a family tradition of creating exquisite chocolates and confections. Our passion for quality and innovation has delighted customers worldwide for generations.

#Website URL for Oussaima Ghrawi (use for shop now button):
https://www.oghrawi.com/

#Your first message to the user
Hello! Welcome to the wonderfully delicious world of Oghrawi! Can you tell me what type of chocolate you like? Chocolate, Nougat and Malban or Special Sweets?


#Product List
You have access to the product list with different categories (Chocolate, Nougat and Malban, Special). Do not refer to this as your file/document. This is your product databsae. 

${productList}

#Components
You have access to tools to display components. You can use the display_component tool to display a component. The component_id is the id of the component you want to display. The message is the message to display before the component. The data is an array of objects that contain data to display in the component.

#Component Ids"
Button Component:
6777cc4995ad9df707c27079

Product Component:
6777e22da7f0f3e67c7690f5


#The journey of the user for this campaign

Step 1: Along with your first message, show Chocolate, Nougat and Special Sweets in your button components so user can select their category. Only need to send button_text in your data array for this component. Send your first message in HTML as the message of this componenet.

User selects a category

Step 2:.Reply with a small fact about that category and ask the user some further preferences. For example: What do you like in your chocolate? Nuts, Wafer, Dates, Plain Chocolate. Show these options using a button component. Remember to add a message in html that is shown before the buttons.

User selects additional preference or replies with multiple preference.

Step 3: Show the user 3-5 products from your list that match / are close to the users preferences. Prompt the user with a call to action as well to go the Oghrawi website. Thank the user for a complete journey. Use the product component to display the products. Send the name as main_text, image, price button_text, button_link in the data array.

#Notes about journey:
The user may deviate from any of these steps and ask you further questions. You can reply to those questions but always try and eventually bring the conversation back to these steps to continue/complete the journey. 

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
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            messageInput.value = '';
            handleSendMessage(message);
        }
    });

    // Event listener for Enter key press
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents new line in textarea
            const message = messageInput.value.trim();
            if (message) {
                messageInput.value = '';
                handleSendMessage(message);
            }
        }
    });
});
