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
            <Link href="/how-it-works">How it Works</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/whitepaper">Whitepaper</Link>
          </div>
        </div>

        <div className="lg:m-auto">
          <div className="mb-2">Legal:</div>
          <div className="flex flex-col">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/responsible-gaming">Responsible Gambling</Link>
          </div>
        </div>

        <div className="lg:m-auto">
          <div className="mb-2">Social Links:</div>

          <div className="flex flex-col">
            <a href="https://x.com/SpinX_fun?t=lipYq20FQLdkgyvtcpWyDw&s=09" target="_blank" rel="noreferrer">X</a>
            <a href="https://t.me/spinxfun" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://pump.fun/coin/4QAuuGj2mMjEPwsX61Sx9gwfNLcKVPotSWV3vUZfv28g" target="_blank" rel="noreferrer">Buy SPX</a>
            <a href="https://github.com/Spinx-fun/spinx-contract" target="_blank" rel="noreferrer">Github</a>
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
