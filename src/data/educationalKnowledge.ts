export interface FinancialGlossaryItem {
  term: string;
  termHi: string;
  simpleDefinition: string;
  simpleDefinitionHi: string;
  ruralAnalogyHi: string;
  commonScamTrick: string;
}

export const BHARAT_GLOSSARY: FinancialGlossaryItem[] = [
  {
    term: 'SEBI Registration',
    termHi: 'सेबी पंजीकरण (SEBI Registration)',
    simpleDefinition: 'A mandatory legal license issued by SEBI to investment advisers, brokers, and analysts.',
    simpleDefinitionHi: 'शेयर बाज़ार में सलाह या सेवा देने के लिए सरकार (सेबी) द्वारा दिया जाने वाला कानूनी लाइसेंस।',
    ruralAnalogyHi: 'जैसे बिना सरकारी लाइसेंस के कोई डॉक्टर क्लिनिक नहीं खोल सकता, वैसे ही बिना सेबी नंबर के कोई पैसे निवेश करवाने की सलाह नहीं दे सकता।',
    commonScamTrick: 'ठग फर्जी नंबर (जैसे INA999...) बनाकर खुद को सेबी मान्यता प्राप्त बताते हैं।'
  },
  {
    term: 'Guaranteed Returns',
    termHi: 'गारंटीड रिटर्न (निश्चित मुनाफ़ा)',
    simpleDefinition: 'A promise of fixed high profits on market instruments. Under SEBI rules, this is strictly illegal.',
    simpleDefinitionHi: 'शेयर बाज़ार में फिक्स ब्याज या गारंटीड मुनाफ़े का वादा करना कानूनन अपराध है। बाज़ार हमेशा जोखिम भरा होता है।',
    ruralAnalogyHi: 'जैसे कोई कहे कि बंजर जमीन पर बिना बारिश के 3 दिन में सोना उग आएगा—बाजार में कोई भी निश्चित मुनाफ़ा नहीं दे सकता।',
    commonScamTrick: 'शुरुआत में स्क्रीन पर नकली 300% का लाभ दिखाकर बड़ी रकम ऐंठना।'
  },
  {
    term: 'Pre-IPO / SME Allotment',
    termHi: 'प्री-आईपीओ या कोटा आवंटन',
    simpleDefinition: 'Official IPO applications must go exclusively through bank ASBA or registered brokers.',
    simpleDefinitionHi: 'शेयर बाज़ार में नई कंपनी के शेयर केवल आधिकारिक बैंक (ASBA) या अधिकृत ब्रोकर के ज़रिये ही मिलते हैं।',
    ruralAnalogyHi: 'सरकारी राशन की दुकान का कोटा जैसे किसी अनजान व्यक्ति के पर्सनल गूगल-पे से नहीं खरीदा जा सकता, वैसे ही आईपीओ भी पर्सनल खाते से नहीं मिलता।',
    commonScamTrick: 'प्राइवेट यूपीआई या बैंक खाते में पैसे मंगवाकर फर्जी शेयर अलॉटमेंट लेटर भेजना।'
  },
  {
    term: 'Demat Re-KYC Urgency',
    termHi: 'डीमैट ब्लॉक और आपातकालीन री-केवाईसी',
    simpleDefinition: 'Brokers never send links with countdown timers threatening account seizure within 2 hours.',
    simpleDefinitionHi: 'असली ब्रोकर कभी भी 2 घंटे में खाता बंद करने की धमकी देकर अनजान लिंक पर बैंक डिटेल नहीं मांगते।',
    ruralAnalogyHi: 'जैसे बैंक का कर्मचारी घर आकर लॉकर की चाबी नहीं मांगता, वैसे ही कोई ब्रोकर मैसेज में ओटीपी या पासवर्ड नहीं मांगता।',
    commonScamTrick: 'क्लोन लिंक (जैसे zerodha-update.vip) भेजकर यूजर आईडी और पासवर्ड चुराना।'
  }
];

export const OFFICIAL_CHANNELS = {
  sebiScores: {
    name: 'SEBI SCORES 2.0 (Toll-Free Grievance)',
    portal: 'https://scores.sebi.gov.in',
    helpline: '1800 22 7575 / 1800 266 7575',
    timings: 'Monday to Friday, 9:30 AM to 5:30 PM',
    purpose: 'Complaints against registered intermediaries, brokers, mutual funds, listed firms'
  },
  cybercrime: {
    name: 'National Cyber Crime Reporting Portal (I4C)',
    portal: 'https://cybercrime.gov.in',
    helpline: '1930 (Direct Dial Immediate Golden Hour)',
    timings: '24x7 Nationwide Helpline',
    purpose: 'Immediate freeze of fraudulent UPI/banking transactions during digital financial scams'
  },
  nsdl: {
    name: 'NSDL Investor Care / IDeAS',
    portal: 'https://nsdl.co.in',
    helpline: '022 4886 7000',
    purpose: 'Verify actual holding statement (CAS) independently of broker app'
  }
};
