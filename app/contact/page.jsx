import Banner_750 from "../banners/banner_720";

// app/contact/page.tsx
export const metadata = {
  title: "Contact Smart Trade Manager",
  description: "Need help or have questions? Contact Smart Trade Manager via email at houarieddref5@gmail.com.",
};

export default function ContactPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Contact Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 flex-1">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          For any questions, feedback, or collaboration inquiries, feel free to reach out to us via email:
        </p>
        <p className="mt-4 text-xl text-yellow-400 font-semibold">
          houarieddref5@gmail.com
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
