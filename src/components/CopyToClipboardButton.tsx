import React, { useState } from 'react';

interface CopyToClipboardButtonProps {
    content: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ content }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async (content: string) => {
        try {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            setIsCopied(false);
            console.error('Unable to copy to clipboard:', error);
        }
    };

    return (
        <div>
            <button onClick={() => copyToClipboard(content)} className="hover:opacity-90 text-[#F7B831]">
                {isCopied ?
                    'Copied'
                    :
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9375 0H3.9375C3.78832 0 3.64524 0.0592633 3.53975 0.164753C3.43426 0.270242 3.375 0.413316 3.375 0.5625V3.375H0.5625C0.413316 3.375 0.270242 3.43426 0.164753 3.53975C0.0592633 3.64524 0 3.78832 0 3.9375V12.9375C0 13.0867 0.0592633 13.2298 0.164753 13.3352C0.270242 13.4407 0.413316 13.5 0.5625 13.5H9.5625C9.71168 13.5 9.85476 13.4407 9.96025 13.3352C10.0657 13.2298 10.125 13.0867 10.125 12.9375V10.125H12.9375C13.0867 10.125 13.2298 10.0657 13.3352 9.96025C13.4407 9.85476 13.5 9.71168 13.5 9.5625V0.5625C13.5 0.413316 13.4407 0.270242 13.3352 0.164753C13.2298 0.0592633 13.0867 0 12.9375 0ZM9 12.375H1.125V4.5H9V12.375ZM12.375 9H10.125V3.9375C10.125 3.78832 10.0657 3.64524 9.96025 3.53975C9.85476 3.43426 9.71168 3.375 9.5625 3.375H4.5V1.125H12.375V9Z" fill="#F7B831" />
                    </svg>}
            </button>
        </div>
    );
};

export default CopyToClipboardButton