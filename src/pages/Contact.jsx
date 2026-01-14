import { useState } from "react";
import SEO from "../components/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Using Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_API_KEY_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
          redirect: "https://web3forms.com/success"
        }),
      });

      const result = await response.json();
      console.log("Form submission result:", result);
      
      if (result.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.error("Form submission failed:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        description="Contact Investment Banking House (IBH) for investment banking services, investment trading solutions, automated trading services, MT4/MT5 trading platforms, and forex trading solutions in India. Get in touch with our investment trading team."
        keywords="contact investment banking house, contact ibh, investment banking services, investment trading, algorithmic trading company india, automated trading services india, forex trading platform india, investment trading contact"
        ogDescription="Contact Investment Banking House (IBH) for investment banking services, investment trading solutions, and automated trading services in India."
        canonical="https://www.ibhalgo.com/contact"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "@id": "https://www.ibhalgo.com/contact#webpage",
          "url": "https://www.ibhalgo.com/contact",
          "name": "Contact Investment Banking House - Investment Trading Services",
          "description": "Contact Investment Banking House (IBH) for investment banking services and investment trading solutions in India.",
          "mainEntity": {
            "@id": "https://www.ibhalgo.com/#organization"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.ibhalgo.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://www.ibhalgo.com/contact"
              }
            ]
          }
        })}
      </script>
      <div className="min-h-screen w-full overflow-x-hidden flex items-start justify-center px-3 sm:px-4 md:px-6 pt-20 sm:pt-22 md:pt-10 pb-12 sm:pb-16">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2 tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.14em] bg-gradient-to-r from-[#3a3a3a] via-[#262626] to-[#4b4b4b] bg-clip-text text-transparent uppercase drop-shadow-[0_1px_2px_rgba(26,26,26,0.35)] break-words">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[rgba(48,39,32,0.68)] max-w-2xl mx-auto leading-relaxed mb-3 px-2 break-words">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Glow Effect - Hidden on mobile to prevent overflow */}
          <div className="hidden md:block absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
          
          {/* Main Form */}
          <div className="relative bg-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-white/20 shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Name Field */}
                <div className="group">
                  <label htmlFor="name" className="block text-white/90 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 tracking-wide">
                    FULL NAME <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30"
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-white/90 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 tracking-wide">
                    EMAIL ADDRESS <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30"
                  />
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {/* Phone Field */}
                <div className="group">
                  <label htmlFor="phone" className="block text-white/90 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 tracking-wide">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30"
                  />
                </div>

                {/* Subject Field */}
                <div className="group">
                  <label htmlFor="subject" className="block text-white/90 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 tracking-wide">
                    SUBJECT <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-white/90 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 tracking-wide">
                  MESSAGE <span className="text-purple-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 resize-none hover:border-white/30 sm:rows-6"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center text-sm sm:text-base tracking-wide">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 text-green-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center backdrop-blur-sm animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-semibold text-sm sm:text-base">Message sent successfully! We'll get back to you soon.</span>
                  </div>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-400/50 text-red-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center backdrop-blur-sm animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="font-semibold text-sm sm:text-base">Failed to send message. Please try again or email us directly.</span>
                  </div>
                </div>
              )}
            </form>

            {/* Contact Info */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-center space-y-2">
                <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                  PREFER EMAIL?
                </p>
                <a 
                  href="mailto:mukkawarshravan04@gmail.com" 
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm sm:text-base font-semibold group break-all"
                >
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="break-all">Investmentbankinghouse@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
