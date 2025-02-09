async function handleToolCalls(data, skeletonLoader) {
    if (data.finish_reason === 'tool_calls') {
        const toolCallPromises = data.tool_calls.map(async (toolCall) => {
            const functionName = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments);
            
            let functionResponse;
            switch (functionName) {
                case 'open_google':
                    functionResponse = await openGoogle(args.query);
                    break;
                case 'generateProfile':
                    functionResponse = await generateProfile(args.taskDescription, args.industry, args.additionalRequirements, args.model);
                    break;
                case 'display_component':
                    functionResponse = await displayComponent(args.component_id, args.message, args.data);
                    break;
                case 'show_hero_section':
                    functionResponse = await showHeroSection(args.description, args.title);
                    break;
                case 'show_product_section':
                    functionResponse = await showProductSection();
                    break;
                default:
                    console.warn(`Unhandled function name: ${functionName}`);
                    return null;
            }
            
            return {
                tool_call_id: toolCall.id,
                function_name: functionName,
                function_response: functionResponse
            };
        });

        // Execute all tool calls in parallel and get results
        const toolResults = await Promise.all(toolCallPromises);
        
        // Submit all results together
        const sessionId = localStorage.getItem('session_id');
        const response = await fetch('/ai/tool-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session_id: sessionId,
                tool_responses: toolResults
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.response) {
            console.log('tool call submitted');
            
            // console.log(skeletonLoader);
            document.querySelector('.skeleton-loader').remove();
            displayMessage(responseData.response, 'ai');
        }
    }
}
