import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
interface CardProps {
    title: string;
    imageSrc: string;
    description: string;
  }
  
  interface RevealOnScrollProps {
    children: React.ReactNode;
    additionalProp?: boolean;
    delay:string;

  }
  
  const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children,additionalProp,delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isStyleTemporaryActive, setIsTemporaryStyleActive] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const scrollObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsTemporaryStyleActive(true);
          setIsVisible(true);
          setTimeout(() => {
            setIsTemporaryStyleActive(false);
          }, 3000);
          scrollObserver.unobserve(entry.target);
        }
      });
  
      if (ref.current) {
        scrollObserver.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          scrollObserver.unobserve(ref.current);
        }
      };
    }, []);
  
    const classes = `transition-opacity duration-1000 ${delay}
          ${isVisible ? "opacity-100" : "opacity-0" 
    } ${isStyleTemporaryActive&&additionalProp&&"scale-[1.2]"}  `;
  
    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  };
  const Card2: React.FC<CardProps> = ({ title, imageSrc, description }) => {
    return (
        <div
          className="cursor-pointer  max-w-[18rem] group p-6 bg-white hover:bg-primary hover:bg-opacity-80  hover:text-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.15]"
        >
          <img className="h-35 w-full group-hover:text-white rounded mb-2 hover:scale-[1.15]" src={imageSrc} alt="ai" loading='lazy' />
          <a href="#" className="text-[#00004b] group-hover:text-white">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:scale-75">{title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-500 group-hover:text-black group-hover:font-semibold dark:text-gray-400 hover:scale-105">{description}</p>
        </div>
      );
    
};
const Card: React.FC<CardProps> = ({ title, imageSrc, description }) => {
    return (
        <div
          className="cursor-pointer hover:bg-black hover:bg-opacity-95 hover:text-white group max-w-[18rem] p-6 bg-white border border-gray rounded-lg shadow dark:bg-gray-800 hover:shadow-md transition-transform transform hover:scale-[1.2]"
        >              
          <div className="flex">

          <img className="flex-none h-14 w-14 mr-2 rounded mb-2 " src={imageSrc} alt="ai" loading='lazy'
 />
          <a href="#" className="text-primary hover:text-primary-dark group-hover:text-white flex-auto">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900  dark:text-white">{title}</h5>
          </a>
          </div>
          <p className="mb-3 font-normal text-gray-500 group-hover:text-white group-hover:font-semibold dark:text-gray-400">{description}</p>
        </div>
      );
    
};
const forwardCards = [
    {
      imageSrc: '/src/images/task/task-01.jpg',
      title: 'Need a help in Claim?',
      description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
    },
    {
      imageSrc: '/src/images/landing/livres.webp',
      title: 'Need a help in Claim?',
      description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
    },
    {
      imageSrc: '/src/images/product/product-01.png',
      title: 'Need a help in Claim?',
      description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
    },
    {
      imageSrc: '/src/images/landing/dataset.jpg',
      title: 'Need a help in Claim?',
      description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
    },
  ];
  const backwardCards = [
    {
      imageSrc: "/src/images/landing/fruits.webp",
      title: "Need a help in Claim?",
      description: "Go to this step by step guideline process on how to certify for your weekly benefits:",
    },
    {
      imageSrc: "/src/images/landing/fruits.webp",
      title: "Need a help in Claim?",
      description: "Go to this step by step guideline process on how to certify for your weekly benefits:",
    },
    {
      imageSrc: "/src/images/landing/livres.webp",
      title: "Need a help in Claim?",
      description: "Go to this step by step guideline process on how to certify for your weekly benefits:",
    },
    {
      imageSrc: "/src/images/landing/livres.webp",
      title: "Need a help in Claim?",
      description: "Go to this step by step guideline process on how to certify for your weekly benefits:",
    },
  ];

import ClientLayout from '../../layout/clientLayout'
const Landing: React.FC = () => {
  return (
    <ClientLayout>
<RevealOnScroll additionalProp={false} delay="">
<section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 " >
        <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
            <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Transforming Challenges 
<span className='text-primary'> Into Solutions</span></h1>
            <p className="max-w-2xl mb-6 group-hover:scale-[0.8]  text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to our collaborative data science platform, 
where industry challenges meet innovative solutions. 
Unlock the potential of real-world problem-solving 
by connecting with a global community of
data science developers.</p>
        <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

            <a href="#" className=" inline-flex items-center justify-center bg-primary px-5 py-3 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1]  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                Join Now
            </a> 
            
            <a href="#" className="hover:bg-black hover:text-white inline-flex items-center justify-center bg-white px-5 py-3 text-black font-medium text-center  border border-primary-300 rounded-lg hover:text-white hover:scale-[1.1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                Explore
            </a> 
            </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hover:scale-[1.2]">
            <img src="/src/images/landing/ai3.jpg" alt="mockup"/>
        </div>                
    </div>
    </section>
</RevealOnScroll>
<RevealOnScroll delay=''>
<section className="bg-gray-100 bg-opacity-85  dark:bg-gray-800">
        <div className="max-w-screen-xl px-4  py-8 mx-auto lg:py-24 lg:px-6 ">
        <h2 className="text-4xl font-extrabold text-black dark:text-white pb-4">Competitions</h2>
          <div className="grid md:grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-2">
          {forwardCards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
          </div>
          <h2 className="text-4xl font-extrabold text-black text-opacity-[1.5] dark:text-white py-4 ">Datasets</h2>
          <div className="grid md:grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-2">
          
          {forwardCards.map((card, index) => (
        <Card2 key={index} {...card} />
      ))}
           
          </div>
        </div>
</section>
</RevealOnScroll>
<RevealOnScroll additionalProp={false} delay="">
<section>
<div id="aboutUs" className="sm:flex items-center max-w-screen-xl bg-white">
    <div className="sm:w-1/2 p-10">
        <RevealOnScroll additionalProp={true} delay="">
        <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
        </RevealOnScroll>
    </div>
    <div className="sm:w-1/2 p-5">
        <div className="text group cursor-pointer">
            <span className="text-gray-500 border-b-2 group-hover:translate-x-6 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl group-hover:scale-[1.05]">About <span className="text-indigo-600">TektAI</span>
            </h2>
            <p className="text-gray-700  group-hover:scale-[0.85]">
            TektAI is a pioneering platform at the forefront of revolutionizing collaboration between industry challenges and data science developers. With a dynamic space for hosting competitions, fostering team collaboration, and recognizing outstanding contributions, TektAI is the nexus where innovation meets real-world problem-solving. Join us in creating a vibrant community where skills are honed, solutions are crafted, and the boundaries of what's possible in data science are continually pushed
            </p>
        </div>
    </div>
</div>
</section>
</RevealOnScroll>
 
 <RevealOnScroll additionalProp={false} delay="">
    <section id="contactUs" className="bg-primary bg-opacity-85 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto bg-white p-7 rounded-lg text-center hover:translate-y-12 hover:translate-x-12">
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-black tracking-tight text-gray-900 dark:text-white">Contact Us</h2>
                <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                />
                 <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                ></textarea>
              </div>

                <a href="#" className="text-white bg-primary hover:bg-black hover:bg-opacity-90 focus:ring-4 hover:scale-[1.1] focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Send Message</a>
            </div>
        </div>
    </section>
  </RevealOnScroll>
  <RevealOnScroll delay=''>
  <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Product</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#" className=" hover:underline">Competitions</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Datasets</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Models</a>
                        </li>
                  
                    </ul>
                </div>
                <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#" className="hover:underline">LinkedIn</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Twitter</a>
                        </li>
                        <li className="mb-4">
                         <a href="#" className="hover:underline">Facebook</a>
                        </li>
                        <li className="mb-4">
                            <a href="#contactUs" className="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Licensing</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Terms</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#aboutUs" className=" hover:underline">About</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Careers</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Brand Center</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Blog</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Documentation</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Competitions</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Datasets</a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="hover:underline">Models</a>
                        </li>
                    
                    </ul>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
            <div className="text-center">
                <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img src="/src/images/landing/logo-transparent.png" className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                    TektAI    
                </a>
                <span className="block text-sm text-center text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} TektAI. All Rights Reserved.
                </span>
                <ul className="flex justify-center mt-5 space-x-5">
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  </RevealOnScroll>
    </ClientLayout>
  );
};

export default Landing;
