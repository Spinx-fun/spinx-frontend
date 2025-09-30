// Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <div className="relative bg-[#0a101e] p-4 overflow-hidden w-full">
      <div className="text-[#8B8A8D] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 my-6">
        <div className="lg:m-auto">
          <div className="mb-2">Platform:</div>
          <div className="flex flex-col">
            <a href="/how_it_works_spinx.pdf" target="_blank" rel="noreferrer">How it Works</a>
            <a href="/spinx_faq.pdf" target="_blank" rel="noreferrer">FAQ</a>
            <a href="/spinx_technical_whitepaper.pdf" target="_blank" rel="noreferrer">Whitepaper</a>
          </div>
        </div>

        <div className="lg:m-auto">
          <div className="mb-2">Legal:</div>
          <div className="flex flex-col">
            <a href="/spinx_privacy_policy.pdf" target="_blank" rel="noreferrer">Privacy Policy</a>
            <a href="/spinx_terms_of_service.pdf" target="_blank" rel="noreferrer">Terms of Service</a>
            <a href="/spinx_responsible_gaming.pdf" target="_blank" rel="noreferrer">Responsible Gambling</a>
          </div>
        </div>

        <div className="lg:m-auto">
          <div className="mb-2">Social Links:</div>

          <div className="flex flex-col">
            <a href="https://x.com/SpinX_fun?t=lipYq20FQLdkgyvtcpWyDw&s=09" target="_blank" rel="noreferrer">X</a>
            <a href="https://t.me/spinxfun" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://pump.fun/" target="_blank" rel="noreferrer">Buy SPX</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col my-4 text-center">
        <span className="text-[#8B8A8D]">
          © 2025 SPIN X. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
