import { useRef } from "react";
import ButtonLogin from "~/components/ButtonLogin";
import FAQ from "~/components/FAQ"; // Assuming this component is handled separately for accessibility

export default function Index() {
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Function to scroll to a section using a ref
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const faqData = [
    {
      question: "How does the platform work?",
      answer:
        "Our platform uses advanced analytics to help you convert website visitors into paying customers through targeted engagement strategies.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 14-day free trial with all features included so you can experience the full potential of our platform.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time. There are no long-term contracts or cancellation fees.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide 24/7 email support and live chat during business hours. Premium plans include dedicated phone support.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and security practices to ensure your data is always protected.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {/* Using DaisyUI navbar component */}
      <header className="navbar bg-base-100 sticky top-0 z-50 shadow-sm px-4 md:px-8">
        <div className="navbar-start">
          {/* DaisyUI dropdown for mobile menu */}
          <div className="dropdown">
            {/* Changed div to button for accessibility */}
            <button
              type="button" // Added type="button" for semantic correctness
              className="btn btn-ghost lg:hidden"
              aria-label="Open navigation menu"
            >
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            {/* Dropdown menu content */}
            {/* tabIndex is kept here as it's part of DaisyUI's dropdown functionality */}
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                {/* Using button for scrolling action, styled to look like a link */}
                <button
                  onClick={() => scrollToSection(pricingRef)}
                  className="w-full text-left btn btn-ghost btn-sm" // Added btn classes for DaisyUI styling
                >
                  Pricing
                </button>
              </li>
              <li>
                {/* Using button for scrolling action, styled to look like a link */}
                <button
                  onClick={() => scrollToSection(faqRef)}
                  className="w-full text-left btn btn-ghost btn-sm" // Added btn classes for DaisyUI styling
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          {/* Logo/Site Title - using <a> for potential navigation to home */}
          <a className="btn btn-ghost text-xl" href="/">
            NextMove
          </a>
        </div>
        {/* Desktop navigation menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* Using button for scrolling action */}
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="btn btn-ghost btn-sm"
              >
                {" "}
                {/* Added btn classes for DaisyUI styling */}
                Pricing
              </button>
            </li>
            <li>
              {/* Using button for scrolling action */}
              <button
                onClick={() => scrollToSection(faqRef)}
                className="btn btn-ghost btn-sm"
              >
                {" "}
                {/* Added btn classes for DaisyUI styling */}
                FAQ
              </button>
            </li>
          </ul>
        </div>
        {/* Navbar end section, likely for login/auth buttons */}
        <div className="navbar-end">
          {/* Assuming ButtonLogin is an interactive element */}
          <ButtonLogin />
        </div>
      </header>

      {/* Hero Section */}
      {/* Using DaisyUI hero component */}
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Turn visitors into customers</h1>
            <p className="py-6">
              Delivers impactful and attention-grabbing notifications to
              confront website visitors with the harsh realities, driving
              engagement and conversions.
            </p>
            {/* Primary call to action button */}
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          {/* Grid layout for feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            {/* Using DaisyUI card component */}
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body items-center text-center">
                {/* SVG icons (decorative) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3 className="card-title text-2xl mt-4">
                  Fast Implementation
                </h3>
                <p>
                  Get up and running in minutes with our simple integration
                  process.
                </p>
              </div>
            </div>
            {/* Feature Card 2 */}
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body items-center text-center">
                {/* SVG icons (decorative) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="card-title text-2xl mt-4">
                  Conversion Analytics
                </h3>
                <p>
                  Detailed insights to understand customer behavior and optimize
                  your approach.
                </p>
              </div>
            </div>
            {/* Feature Card 3 */}
            <div className="card bg-base-200 shadow-sm">
              <div className="card-body items-center text-center">
                {/* SVG icons (decorative) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="card-title text-2xl mt-4">24/7 Support</h3>
                <p>
                  Our dedicated team is always available to help you succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      {/* Added accessibility roles and labels */}
      <div
        ref={pricingRef}
        className="py-16 bg-base-200"
        id="pricing"
        role="region"
        aria-labelledby="pricing-heading"
      >
        <div className="container mx-auto px-4">
          <h2
            id="pricing-heading"
            className="text-4xl font-bold text-center mb-4"
          >
            Make your product a no-brainer purchase
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            Choose your perfect plan.
          </p>

          {/* Grid layout for pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="text-xl">Individual Creator</h3>
                <p>YOU are your team</p>
                <div className="flex items-end my-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-gray-500 ml-1">USD /client /month</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>1 client</span>
                  </li>
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>1 website</span>
                  </li>
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Simple analytics</span>
                  </li>
                </ul>
                <div className="card-actions justify-center mt-6">
                  {/* Button for call to action */}
                  <button className="btn btn-primary btn-block">
                    Get NextMove
                  </button>
                </div>
                <p className="text-center text-sm mt-4">
                  Pay once. Access forever.
                </p>
              </div>
            </div>

            {/* Pro Plan Card */}
            <div className="card bg-base-100 shadow-sm border-2 border-primary">
              <div className="card-body">
                {/* DaisyUI badge */}
                <div className="badge badge-primary mb-2">POPULAR</div>
                <h3 className="text-xl">Agency</h3>
                <p>Supercharge your team</p>
                <div className="flex items-end my-4">
                  <span className="text-4xl font-bold">Contact Us</span>
                  <span className="text-gray-500 ml-1"></span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Unlimited Popups</span>
                  </li>
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Unlimited websites</span>
                  </li>
                  <li className="flex items-start">
                    {/* SVG icons (decorative) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-success mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Simple analytics</span>
                  </li>
                </ul>
                <div className="card-actions justify-center mt-6">
                  {/* Button for call to action */}
                  <button className="btn btn-primary btn-block">
                    Get NextMove
                  </button>
                </div>
                <p className="text-center text-sm mt-4">
                  Pay once. Access forever.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm mt-8">
            *With great power comes great responsibility. Use NextMove
            responsibly.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      {/* Added accessibility roles and labels */}
      <div
        ref={faqRef}
        className="py-16 bg-base-100"
        id="faq"
        role="region"
        aria-labelledby="faq-heading"
      >
        {/* Assuming FAQ component handles its internal accessibility and DaisyUI styling */}
        <FAQ faqItems={faqData} />
      </div>

      {/* Call to Action */}
      {/* Added accessibility roles and labels */}
      <div
        className="py-16 bg-primary text-primary-content"
        role="region"
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold mb-4">
            Ready to transform your business?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using NextMove to increase
            conversions and grow their revenue.
          </p>
          {/* Large button for call to action */}
          <button className="btn btn-lg">Get Started Today</button>
        </div>
      </div>

      {/* Footer */}
      {/* Using DaisyUI footer component */}
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Company</span>
          {/* Footer links */}
          <a className="link link-hover" href="https://www.linkedin.com/">
            About Us
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            Contact
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            Careers
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            Press Kit
          </a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          {/* Footer links */}
          <a className="link link-hover" href="https://www.linkedin.com/">
            Terms of Use
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            Privacy Policy
          </a>
          <a className="link link-hover" href="https://www.linkedin.com/">
            Cookie Policy
          </a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            {/* Social links with accessibility labels */}
            <a href="https://www.linkedin.com/" aria-label="Twitter link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/" aria-label="YouTube link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/" aria-label="Facebook link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {/* Bottom footer section */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <p>Copyright © 2023 - All rights reserved by NextMove</p>
      </div>
    </div>
  );
}
