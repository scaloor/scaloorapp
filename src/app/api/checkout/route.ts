import { stripe } from "@/lib/stripe"
import { buildCheckoutHtml } from "@/server/actions/public/checkout"


export async function GET() {
    // Create the HTML content with a button wrapped in a div
    const html = await buildCheckoutHtml()
    console.log('HTML:', html)
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    console.log('Stripe key:', stripeKey)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
    })
    console.log('Client secret:', paymentIntent.client_secret)

    // Create a script that will inject the HTML into the page
    const script = `
     (function() {
      // Store the parent element reference immediately
      const scriptParent = document.currentScript.parentElement;

      // First, load Stripe
      const loadStripe = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

      async function initializeContent() {
        await loadStripe;

        // Initialize Stripe
        const stripe = Stripe('${stripeKey}');

        // Create a container and append the HTML
        const container = document.createElement('div');
        container.innerHTML = ${JSON.stringify(html)};
        while (container.firstChild) {
          scriptParent.appendChild(container.firstChild);
        }

        // Initialize Stripe Elements
        const elements = stripe.elements({clientSecret: '${paymentIntent.client_secret}'});
        //const cardElement = elements.create('card');
        //cardElement.mount('#payment-element'); // Mount Stripe's Card Element
        
        const paymentElement = elements.create('payment', {layout: 'tabs'});
        paymentElement.mount('#payment-element'); // Mount Stripe's Card Element

        // Add submit event listener
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
          event.preventDefault();

          console.log('Form submitted!'); // Placeholder log

          // You can handle payment processing here
          /*
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });


          if (error) {
            console.error('Error creating payment method:', error.message);
          } else {
            console.log('Payment method created successfully:', paymentMethod);
          }
          */
        });
      }

      initializeContent();
    })();
    `;

    // Return the script with the appropriate content type
    return new Response(script, {
        headers: {
            'Content-Type': 'application/javascript',
            'Access-Control-Allow-Origin': '*',
        },
    })
}
