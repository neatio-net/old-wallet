import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    pageLink: {
      home: `Home`,
      create: `Create`,
      transfer: `Transfer`,
      staking: `Staking`,
      terms: `Terms`
    },

    pages: {
      // HOME
      home: {
        pageName: `WALLET`,
        pageDesc: `This is NEAT Web Wallet.`,
        },
      create: {
          pageName: `CREATION`,
          cardChoose: `Please choose a wallet type.`,
          },
      send: {
            pageName: `SENDING`,
            cardChoose: `What's your wallet type?`,
            },
      staking: {
            pageName: `STAKING`,
            cardChoose: `What's your wallet type?`,
            },
      edtool: {
              pageName: `EDTOOLS`,
              cardChoose: `What would you like to do?`,
              },
      // MINTING
      about: {
        pageTitle: `Terms and Conditions, Risks Of Use and Disclaimer`,
        pageTitle2: `Who we are?`,
        pageSubTitle2: `We are a team of software engineers and developers passionate about blockchain technology with a strong belief in the freedom and privacy of each individual. Our team is a perfect blend of core developers and UX/UI designers. We all love Bitcoin since it introduced us the amazing world of blockchain technology, we also love Ethereum and the smart contract technology but since both BTC and ETH became store of value rather than a peer-to-peer electronic cash system (like it was stated in the Bitcoin whitepaper by Satoshi Nakamoto) we decided to bring Neatio to life.`,
       



        feature2Title: `SECURE`,
        feature2SubTitle: `Neatio is secure. Ultra Secure.`,
        feature2Desc: `Making full use of the advantages of the blockchain technology and in combination with the BFT (Byzantine Fault Tolerance) consensus protocol, Neatio is an ultra secure payment solution, since the transactions are confirmed as soon as they are included in the block. With Neatio there is no need for block confirmations, making it ideal for merchants in day-to-day use and in our crazy, fast-forward lives that we are living today.`,
        
        feature3Title: `SCALABLE`,
        feature3SubTitle: `Neatio is highly scalable.`,
        feature3Desc: `As mentioned before, Neatio blockchain is composed of one main chain and multiple derived side-chains all connected together acting like one single blockchain network, making the platform ultra scalable. In theory there is no limit on how many side-chains can run on the network. In our tests we managed to hit a peak of over 3500 TPS on the main-chain only, which we think is more than enough for today's scalability requirements.`,


        feature4Title: `ECO`,
        feature4SubTitle: `Neatio is ECO Friendly.`,
        feature4Description: `The Neatio network is based on the PoS ( Proof-Of-Stake) mechanism and is maintained by its validators, making it energy efficient, thus environmentally friendly. At Neatio you don’t need expensive mining equipment since you can run a Neatio network node on an average laptop or a $10 Cloud Server (VPS).`,

        feature5Title: `HANDY`,
        feature5SubTitle: `Neatio is User Friendly.`,
        feature5Description: `We also decided to use only 2 decimals for a more pleasant and familiar user experience since everyone is used to the traditional money system rather than the crypto divisibility system. In theory it is the same thing but psychologically is not. Why?  Because people are expecting to see a price of, let’s say, 4.99 USD for a coffee rather than 0.00009999 BTC or 0.0033000000000000 ETH.`,
      },
      createPK: {        
        walletAddress: `Your wallet address is:`,
        disclaimer1: `KINDLY REMINDER!`,
        disclaimer2: ` Do not forget to download your PrivateKey.`,
        disclaimer3: ` Do not forget to download your PrivateKey and back it up.`,
        disclaimer4: ` The wallet cannot be recovered if you lose your PrivateKey.`,


      },
      createKS: {        
        walletAddress: `Your wallet address is:`,
        disclaimer1: `KINDLY REMINDER!`,
        disclaimer2: ` Download the KeyStore, back it up and remember your password.`,
        disclaimer3: ` Wallet cannot be recovered if you lose this KeyStore or password.`,
        disclaimer4: ` Please set up a strong password with no less than 9 characters.`,
        disclaimer5: ` Do not forget it! Your funds depends on it and cannot be reset. `,


      },

      // TERMS
      terms: {
        pageTitle: `Terms and Conditions, Risks Of Use and Disclaimer`,
        listItems: [
          `TERMS AND CONDITIONS`, 
          `These
          Terms and Conditions constitute a legally binding agreement made between you,
          whether personally or on behalf of an entity (“you”) and, Neatio
          and/or NEAT (“we,” “us” or “our”), concerning your
          access to and use of the www.neatio.org website
          and the subdomains “wallet.neatio.org” and
          “scanner.neatio.org” as well as any other media form, media
          channel, mobile website or mobile application related, linked, or otherwise
          connected thereto (collectively, the “website”).
          You
          agree that by accessing the website, you have read, understood, and agree to be
          bound by all of these Terms and Conditions and you
          agree that you are responsible for compliance with any applicable local laws.
           If
          you do not agree with all of these Terms and Conditions, then you are expressly
          prohibited from using the website and you must discontinue use immediately.
          Supplemental
          terms and conditions or documents that may be posted on the website from time
          to time are hereby expressly incorporated herein by reference. We reserve the
          right, in our sole discretion, to make changes or modifications to these Terms
          and Conditions at any time and for any reason.
          We will
          alert you about any changes by updating the “Last updated” date of these Terms
          and Conditions, and you waive any right to receive specific notice of each such
          change.
          It is
          your responsibility to periodically review these Terms and Conditions to stay
          informed of updates. You will be subject to, and will be deemed to have been
          made aware of and to have accepted, the changes in any revised Terms and
          Conditions by your continued use of the Site after the date such revised Terms
          and Conditions are posted.
          The
          information provided on the website is not intended for distribution to or use
          by any person or entity in any jurisdiction or country where such distribution
          or use would be contrary to law or regulation or which would subject us to any
          registration requirement within such jurisdiction or country.
          
          
          The materials on “www.neatio.org” and/or
          the subdomains “wallet.neatio.org” and “scanner.neatio.org” website are
          provided on the “as is” basis. The website “www.neatio.org” and their
          developers and/or the contributors makes no warranties, expressed or implied,
          and hereby disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability, fitness for a
          particular purpose, or noninfringement of intellectual property or other
          violation of rights. Also  “www.neatio.org” does not warrant or make any
          representations concerning the accuracy, likely results, or reliability of the
          use of the materials on its websites or otherwise relating to such materials or
          on any websites linked to this website.
          `,

          `RISKS OF USE`,
 
          `The risk associated with
          the Ethernet core agreement since Neatio (NEAT) is based on the Ethernet
          protocol development, any failure, unpredictable functional problems, or
          attacks that occur in any Ethernet core protocol can cause Neatio (NEAT) or our
          applications to stop working or can behave in an unpredictable manner.
           
          The risk associated with
          using third party apps, websites and/or tools that can obtains the user's login
          credentials or private keys will be possible to directly control the user’s funds.
          In order to minimize the risk, the user must protect its electronic device to
          prevent unauthorized access requests from accessing and accessing the device
          content.
           
           
          The risk that our
          applications and/or products may not meet the expectations of users since our
          applications and/or products are currently in the development phase and may be
          subject to major changes before the release of the official versions.
           
          Phishing and/or Theft risks associated with hackers, other organizations or even countries have the potential to attempt to interrupt our applications and/or functionality in any way, including service attacks, Sybil attacks, malware attacks, or consistent attacks.
           
          The risk of uninsured
          losses since the coins stored in your account is not insured like the
          money stored in the bank accounts or any other financial institutions.
           
          The risk of the presence
          and/or application failure, meaning that our websites and/or platforms
          may break down due to various reasons, and therefore may not be able to provide
          the normal, expected, services.
          `,
          `DISCLAIMER`, 
 
          `Our website is used only for the purpose
          of conveying information and does not constitute an opinion on the trading of
          Neatio (NEAT) cryptocurrency. Any such proposal shall be carried out under a
          trustworthy term and with the permission of the applicable securities law and
          other relevant laws. The above information or analysis shall not constitute
          investment decisions or specific recommendations.
          The website does not constitute any
          investment advice on the form of securities, investment intent or abetting
          investment.
          Our website is not composed nor construed as providing
          any transaction or any invitation to buy or sell, nor any form of securities or
          any form of contract or commitment.
          We express the intention that the user has a clear understanding
          of the risks of the cryptocurrency platform. Once the investor participates in
          the investment, he / she will understand and accept the risk of the project and
          be willing to bear all the corresponding results or consequences.
          We expressly disclaims that Neatio (NEAT) will not bear
          any direct or indirect damages resulting from any participation in our project,
          including this website and any software and/or materials provided on our
          websites and social media channels.
          `,

          `Last updated: March 03, 2021`
        ]        
      },
      
      }
    },
    
    
  }



const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
  silentTranslationWarn: true
});

export default i18n;
