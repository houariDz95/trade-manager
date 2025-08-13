import SmartTradeManagerPage from "@/components/track"
import Banner_750 from "../banners/banner_720";

export const metadata = {
  title: "Smart Trade Manager - Manual Trading Tool",
  description: "Manage manual trades with Smart Trade Manager. Track wins and losses, calculate optimal stakes, and monitor progress towards your profit goals.",
};


export const Trade = () => {
    return(
        <div>
            <section className="bg-gray-900 py-6">
                <div className="max-w-4xl mx-auto text-center">
                {/* Replace with AdSense code */}
                <div className="bg-gray-700 text-gray-400 p-6 rounded-lg">
                    <script async="async" data-cfasync="false" src="//pl27414194.profitableratecpm.com/f2606ec16f0802c60171ef271990790a/invoke.js"></script>
                    <div id="container-f2606ec16f0802c60171ef271990790a"></div>
                </div>
                </div>
            </section>

            <SmartTradeManagerPage />

            <section className="bg-gray-900 py-6">
              <div className="max-w-4xl mx-auto text-center">
                {/* Replace with AdSense code */}
                <div className="bg-gray-700 text-gray-400 p-6 rounded-lg">
                  <Banner_750 />
                </div>
              </div>
            </section>
        </div>
    )
}

export default Trade