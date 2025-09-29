import React from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'home' }) => {
  const wallet = useWallet();
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: activeItem === 'home' ? '/image/home-active.svg' : '/image/home.svg',
      activeIcon: '/image/home-active.svg',
      href: '/'
    },
    {
      id: 'create',
      label: 'Profile',
      icon: activeItem === 'create' ? '/image/create-active.svg' : '/image/create.svg',
      activeIcon: '/image/create-active.svg',
      href: '/create-challenge'
    },
    {
      id: 'documentation',
      label: 'Whitepaper ',
      icon: '/image/documentation.svg',
      href: '/whitepaper.pdf',
      external: true
    },
    {
      id: 'support',
      label: 'Support',
      icon: '/image/support.svg',
      href: '/',
      external: true
    }
  ];

  const menuItemsNotConnected = [
    {
      id: 'home',
      label: 'Home',
      icon: activeItem === 'home' ? '/image/home-active.svg' : '/image/home.svg',
      activeIcon: '/image/home-active.svg',
      href: '/'
    },
    {
      id: 'documentation',
      label: 'Whitepaper ',
      icon: '/image/documentation.svg',
      href: '/whitepaper.pdf',
      external: true
    },
    {
      id: 'support',
      label: 'Support',
      icon: '/image/support.svg',
      href: '/',
      external: true
    }
  ];

  return (
    <div
      className="fixed left-0 top-0 h-screen flex-shrink-0"
      style={{
        width: '248px',
        background: '#0e172b'
      }}
    >
      {/* Logo */}
      <div className="p-6">
        <img
          src="/logo.png"
          alt="SpinX Logo"
          className="w-[78px] h-[32px]"
        />
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#324158] mb-4" />

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {wallet.connected ?
          menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
            >
              <a
                className={`flex items-center gap-3 px-3 py-2 rounded-[5px] w-[216px] h-[36px] ${activeItem === item.id
                  ? 'bg-gradient-to-r from-[rgba(61,153,112,0.2)] to-[rgba(14,23,43,0.2)]'
                  : 'hover:bg-[#1a2439]'
                  }`}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <img
                  src={activeItem === item.id ? item.activeIcon : item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                />
                <span
                  className={`font-inter text-[14px] leading-[114%] ${activeItem === item.id ? 'font-medium text-[#1be088]' : 'font-normal text-white'
                    }`}
                >
                  {item.label}
                </span>
              </a>
            </Link>
          ))
          :
          menuItemsNotConnected.map((item) => (
            <Link
              key={item.id}
              href={item.href}
            >
              <a
                className={`flex items-center gap-3 px-3 py-2 rounded-[5px] w-[216px] h-[36px] ${activeItem === item.id
                  ? 'bg-gradient-to-r from-[rgba(61,153,112,0.2)] to-[rgba(14,23,43,0.2)]'
                  : 'hover:bg-[#1a2439]'
                  }`}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <img
                  src={activeItem === item.id ? item.activeIcon : item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                />
                <span
                  className={`font-inter text-[14px] leading-[114%] ${activeItem === item.id ? 'font-medium text-[#1be088]' : 'font-normal text-white'
                    }`}
                >
                  {item.label}
                </span>
              </a>
            </Link>
          ))
        }
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-4 left-4 right-4">
        {/* Banner */}
        <div className="px-4 mt-8 mb-4">
          <img
            src="/image/banner-216x90.svg"
            alt="Banner"
            className="w-[216px] h-[90px] rounded-md"
          />
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/#">
            <a className="font-inter font-normal text-[12px] leading-[133%] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.6)]">
              Terms
            </a>
          </Link>
          <span className="font-inter font-normal text-[12px] leading-[133%] text-[rgba(255,255,255,0.4)]">-</span>
          <Link href="/#">
            <a className="font-inter font-normal text-[12px] leading-[133%] text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.6)]">
              Privacy Policy
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
