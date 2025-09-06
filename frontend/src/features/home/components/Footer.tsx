import { Mail } from "lucide-react";
import facebook from "../../../assets/svgs/facebook.svg";
import twitter from "../../../assets/svgs/twitter.svg";
import linkedin from "../../../assets/svgs/linkedin.svg";

const Footer = () => {
  return (
    <footer className="bg-[#4F200D] text-[#F6F1E9] py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-[#FFD93D] mb-3">Invoxy</h2>
          <p className="text-sm text-[#F6F1E9]/80">
            Simplify your freelance invoicing. Create, send, and track payments
            seamlessly with our modern invoicing platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD93D] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#FF9A00] transition">
                Home
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-[#FF9A00] transition">
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-[#FF9A00] transition"
              >
                How It Works
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-[#FF9A00] transition">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD93D] mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#blog" className="hover:text-[#FF9A00] transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#FF9A00] transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#support" className="hover:text-[#FF9A00] transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD93D] mb-4">Contact</h3>
          <p className="text-sm mb-4">Have questions? Reach us anytime at:</p>
          <a
            href="mailto:support@invoxy.com"
            className="flex items-center gap-2 text-sm hover:text-[#FF9A00] transition mb-6"
          >
            <Mail size={16} /> support@invoxy.com
          </a>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#FF9A00] transition">
              <img src={facebook} className="w-6" />
            </a>
            <a href="#" className="hover:text-[#FF9A00] transition">
              <img src={twitter} className="w-6" />
            </a>
            <a href="#" className="hover:text-[#FF9A00] transition">
              <img src={linkedin} className="w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-[#F6F1E9]/20 pt-6 text-center text-sm text-[#F6F1E9]/70">
        © {new Date().getFullYear()} Invoxy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
