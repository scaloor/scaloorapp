
import { readFileSync } from 'fs'


export async function buildCheckoutHtml() {
    const html = `
    <!-- <script src="https://js.stripe.com/v3/"></script> -->
<section>
    <form id="payment-form" class="checkout-form">
        <!-- Product Information -->
        <div>
            <h2 id="product-name">Product Name</h2>
            <p id="product-price">$40.00</p>
            <img src="https://eewvmilsxsdrbeekjzwn.supabase.co/storage/v1/object/public/scaloor-bucket/business/bus_ug5cz5vymkqqdnqcbi4m5mw5/checkout/thumbnail/chk_juax48jb982320z7lu1kunjk.png"
                alt="Product Name" width="200" height="200" class="product-image">
        </div>

        <!-- Product Description -->
        <div class="description">
            <p id="product-description">Product description goes here</p>
        </div>

        <!-- Customer Information -->
        <div class="input-group">
            <input type="text" placeholder="Name" class="input">
            <input type="email" placeholder="Email" class="input">
            <input type="tel" placeholder="Phone" class="input">
            <input type="text" placeholder="Address" class="input">
        </div>

        <!-- Placeholder for payment element -->
        <div id="payment-element">
            <!-- Stripe Payment Element would be inserted here -->
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button">Submit</button>
    </form>
</section>
<style>
    /* Define CSS variables inline */
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --muted-foreground: 215.4 16.3% 46.9%;
        --input: 214.3 31.8% 91.4%;
        --ring: 222.2 84% 4.9%;
        --border: 214.3 31.8% 91.4%;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: light) {
        :root {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --muted-foreground: 215 20.2% 65.1%;
            --input: 217.2 32.6% 17.5%;
            --ring: 212.7 26.8% 83.9%;
            --border: 217.2 32.6% 17.5%;
        }
    }

    .checkout-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 28rem;
        margin: 0 auto;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .input {
        height: 2.5rem;
        width: 100%;
        border-radius: 0.375rem;
        border: 1px solid hsl(var(--border));
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        transition: box-shadow 0.2s ease;
    }

    .input::placeholder {
        color: hsl(var(--muted-foreground));
    }

    .input:focus-visible {
        outline: none;
        border: none;
        box-shadow: 0 0 0 2px hsl(var(--background)),
            0 0 0 4px hsl(var(--ring));
    }

    .input:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    @media (min-width: 768px) {
        .input {
            font-size: 0.875rem;
        }
    }

    .product-image {
        width: 80%;
        height: auto;
        object-fit: cover;
    }

    /* Base button styles */
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        /* gap-2 */
        white-space: nowrap;
        border-radius: 0.375rem;
        /* rounded-md */
        font-size: 0.875rem;
        /* text-sm */
        font-weight: 500;
        /* font-medium */
        height: 2.5rem;
        /* h-10 */
        padding: 0.5rem 1rem;
        /* px-4 py-2 */
        transition-property: color, background-color;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
    }

    /* Default variant */
    .button {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
    }

    .button:hover {
        background-color: hsl(var(--primary) / 0.9);
    }

    /* Focus styles */
    .button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px hsl(var(--background)),
            0 0 0 4px hsl(var(--ring));
    }

    /* Disabled state */
    .button:disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    /* SVG icons inside buttons */
    .button svg {
        pointer-events: none;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
    }

    .description {
        width: fit-content;
        word-wrap: break-word;
    }
</style>
    `
    return html
}