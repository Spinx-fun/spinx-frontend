// pages/r/[referralCode].tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ReferralPage = () => {
  const router = useRouter();
  const { referralCode } = router.query;

  useEffect(() => {
    if (referralCode) {
      // Save the referral code to local storage
      localStorage.setItem('referralCode', referralCode as string);
      
      // Optionally, send the referral code to the backend
      // axios.post('/api/referrals', { referralCode });

      // Redirect to the home page
      router.push('/jackpot');
    }
  }, [referralCode]);

  return <div className='h-screen bg-[#0D0C0F]'></div>;
};

export default ReferralPage;