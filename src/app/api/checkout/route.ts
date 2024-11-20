export async function GET() {
    // Create the HTML content with a button wrapped in a div
    const html = `
    <style>
      .checkout-wrapper {
        display: flex;
        justify-content: center;
      }
      #checkout-button-container {
        max-width: 448px;
        width: 100%;
        border: 1px solid #e0e0e0;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }
    </style>
    <div class="checkout-wrapper">
        <div id="checkout-button-container">
            <p>This is where the checkout button will go</p>
            <p>Hello there</p>
            <a href="/app/products" target="_blank">
            <button 
                style="
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 4px;
                "
            >
                Checkout Now
            </button>
            </a>
        </div>
    </div>
    `

    // Create a script that will inject the HTML into the page
    const script = `
    (function() {
      const container = document.createElement('div');
      container.innerHTML = ${JSON.stringify(html)};
      
      // Append both the style and the content
      while (container.firstChild) {
        document.currentScript.parentElement.appendChild(container.firstChild);
      }
    })();
    `

    // Return the script with the appropriate content type
    return new Response(script, {
        headers: {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*',
        },
    })
}
