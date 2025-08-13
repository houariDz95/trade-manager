import Banner_750 from "../banners/banner_720";

// app/about/page.tsx
export const metadata = {
  title: "About Smart Trade Manager",
  description: "Learn about Smart Trade Manager, a simple yet powerful browser-based trade tracking tool designed to help you stay disciplined and reach your profit goals.",
};

export default function AboutPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* About Section */}
      <section className="bg-gray-800 py-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Replace with AdSense code */}
          <div className="bg-gray-700 text-gray-400 p-6 rounded-lg">
            <script async="async" data-cfasync="false" src="//pl27414194.profitableratecpm.com/f2606ec16f0802c60171ef271990790a/invoke.js"></script>
            <div id="container-f2606ec16f0802c60171ef271990790a"></div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-center px-6 py-20 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          About TradeTrack
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
          TradeTrack is a smart trading tool designed to help you protect your balance, minimize risk, 
          and stay profitable even after multiple losses. 
          <br />
          <br />
          Whether you’re a beginner or a pro trader, our algorithm calculates the ideal trade amount 
          based on your chosen risk percentage and payout ratio. 
          <br />
          <br />
          Your trading data is stored securely in your browser using local storage — no accounts or complicated setups required.
        </p>
      </section>

      {/* Ad Section */}
      <section className="bg-gray-800 py-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Replace with AdSense code */}
          <div className="bg-gray-700 text-gray-400 p-6 rounded-lg">
            <Banner_750 />
          </div>
        </div>
      </section>
    </div>
  );
}
