document.getElementById('componentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const componentName = document.getElementById('component_name').value;
    const componentHtml = document.getElementById('component_html').value;
    
    const response = await fetch('/api/components', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ component_name: componentName, component_html: componentHtml })
    });
    
    if (response.ok) {
        alert('Component saved successfully!');
    } else {
        alert('Failed to save component.');
    }
});
