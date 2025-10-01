/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

interface NeedMoreHelpProps {
  title?: string;
  description?: string;
}

const NeedMoreHelp: React.FC<NeedMoreHelpProps> = ({ 
  title = "Need More Help?", 
  description = "If you have additional questions or need support, you can:" 
}) => {
  return (
    <div className="border border-[#2a2a2a] rounded-xl p-6 bg-[#020617]">
      <h2 className="font-oswald font-medium text-2xl text-[#F7B831] mb-4">
        {title}
      </h2>
      <p className="font-inter font-normal text-sm leading-[114%] text-[#90a2b9] mb-4">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href="https://t.me/spinxfun" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors"
        >
          <img src="/image/support.svg" alt="Support" className="w-5 h-5" />
          <span>Join our Telegram community</span>
        </a>
        <Link href="/how-it-works">
          <a className="flex items-center gap-2 text-[#F7B831] hover:text-[#F7B831]/80 transition-colors">
            <img src="/image/documentation.svg" alt="Docs" className="w-5 h-5" />
            <span>Learn how verification works</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NeedMoreHelp;