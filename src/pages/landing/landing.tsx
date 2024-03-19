import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../landing/footer';
import '@fortawesome/fontawesome-free/css/all.css';
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

          <img className="flex-none h-14 w-14 mr-2 rounded mb-2 hover:scale-[1.4] " src={imageSrc} alt="ai" loading='lazy'
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
      imageSrc: '/src/images/landing/flight.jpeg',
      title: 'Flight Delay Prediction Challenge',
      description: 'Go to this step by step guideline process on how to certify for your weekly benefits.',
    },
    {
      imageSrc: '/src/images/landing/finance.jpg',
      title: 'Financial Inclusion in Africa',
      description: 'Can you predict who in Africa is most likely to have a bank account?',
    },
    {
      imageSrc: '/src/images/landing/turtle.webp',
      title: 'Turtle Rescue Forecast Challenge',
      description: 'Can you forecast the number of turtles rescued per site per week in Kenya?',
    },
    {
      imageSrc: '/src/images/landing/animal.webp',
      title: 'Animal Classification Challenge',
      description: 'Can you create a binary classification algorithm to distinguish animals?',
    },
  ];
  const backwardCards = [
    {
      imageSrc: "/src/images/landing/imdb.jpeg",
      title: "IMDB Dataset 2023",
      description: "Dataset containing information about movies which appears on IMDB website.",
    },
    {
      imageSrc: "/src/images/landing/car.jpg",
      title: "Car Specification ",
      description: "Technical information and appearance information of nearly 30,000 cars from 124 car companies.",
    },
    {
      imageSrc: "/src/images/landing/bitcon.jpeg",
      title: "Bitcoin Price",
      description: "This dataset provides weekly updates on Bitcoin prices along with related information ",
    },
    {
      imageSrc: "/src/images/landing/git.png",
      title: "Github Social Network",
      description: "A large social network of GitHub developers was collected from the public API in June 2019.",
    },
  ];

import ClientLayout from '../../layout/clientLayout'
const Landing: React.FC = () => {

  const [emailError, setEmailError] = useState('');

  const checkEmail = (value:any) =>{
    setEmail(value)
    if (!value.trim()) {
      setEmailError("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    {
    setEmailError("Please enter a valid email");
    }else {
      setEmailError("");
    }
   }



    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/user/contact', { email, message }); // Send fromEmail instead of email
            setSuccessMessage('Message sent successfully!');
            setEmail(''); // Clear sender's email after sending
            setMessage('');
        } catch (error) {
            setErrorMessage('Failed to send message. Please try again later.');
        }
    };


    useEffect(() => {
      fetchAboutUsContent();
      fetchWhyUsContent();

    }, []);
    const [aboutUsContent, setAboutUsContent] = useState('');
    const [whyUsContent, setWhyUsContent] = useState([]);

    const fetchAboutUsContent = async () => {
      try {
        const response = await axios.get('http://localhost:3000/adminlan/aboutus');
        setAboutUsContent(response.data.content);
      } catch (error) {
        console.error('Error fetching About Us content:', error);
      }
    };
    const fetchWhyUsContent = async () => {
      try {
        const response = await axios.get('http://localhost:3000/adminlan/whyus');
        setWhyUsContent(response.data);
      } catch (error) {
        console.error('Error fetching Why Choose Us content:', error);
      }
    };
  
              
  
  return (
    <ClientLayout>
    <RevealOnScroll additionalProp={false} delay="">
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto lg:ml-8 place-self-center group lg:col-span-7 cursor-pointer">
            <h1 className="max-w-2xl mb-4 group-hover:scale-[1.05] text-black text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              <span className="animated-text">T</span>
              <span className="animated-text" style={{animationDelay: '0.1s'}}>r</span>
              <span className="animated-text" style={{animationDelay: '0.2s'}}>a</span>
              <span className="animated-text" style={{animationDelay: '0.3s'}}>n</span>
              <span className="animated-text" style={{animationDelay: '0.4s'}}>s</span>
              <span className="animated-text" style={{animationDelay: '0.5s'}}>f</span>
              <span className="animated-text" style={{animationDelay: '0.6s'}}>o</span>
              <span className="animated-text" style={{animationDelay: '0.7s'}}>r</span>
              <span className="animated-text" style={{animationDelay: '0.8s'}}>m</span>
              <span className="animated-text" style={{animationDelay: '0.9s'}}>i</span>
              <span className="animated-text" style={{animationDelay: '1s'}}>n</span>
              <span className="animated-text" style={{animationDelay: '1.1s'}}>g</span>
              <br />
              <span className="animated-text" style={{animationDelay: '1.3s'}}>C</span>
              <span className="animated-text" style={{animationDelay: '1.4s'}}>h</span>
              <span className="animated-text" style={{animationDelay: '1.5s'}}>a</span>
              <span className="animated-text" style={{animationDelay: '1.6s'}}>l</span>
              <span className="animated-text" style={{animationDelay: '1.7s'}}>l</span>
              <span className="animated-text" style={{animationDelay: '1.8s'}}>e</span>
              <span className="animated-text" style={{animationDelay: '1.9s'}}>n</span>
              <span className="animated-text" style={{animationDelay: '2s'}}>g</span>
              <span className="animated-text" style={{animationDelay: '2.1s'}}>e</span>
              <span className="animated-text" style={{animationDelay: '2.2s'}}>s</span>
              <span className="animated-text" style={{animationDelay: '2.3s'}}>&nbsp;</span>

              <span className="animated-text text-primary" style={{animationDelay: '2.3s'}}> Into </span>
              <br />
              <span className="animated-text text-primary" style={{animationDelay: '2.4s'}}> Solutions</span>
            </h1>
            <p className="max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Welcome to our collaborative data science platform, 
              where industry challenges meet innovative solutions. 
              Unlock the potential of real-world problem-solving 
              by connecting with a global community of
              data science developers.
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-flex items-center justify-center bg-primary px-5 py-3 mr-3 text-white font-medium text-center text-white-900 border border-primary-300 rounded-lg hover:bg-opacity-90 hover:scale-[1.1]  focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                Join Now
              </a> 
              <a href="#" className="hover:bg-black hover:text-white inline-flex items-center justify-center bg-white px-5 py-3 text-black font-medium text-center  border border-primary-300 rounded-lg  hover:scale-[1.1] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-primary-800">
                Explore
              </a> 
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex hover:scale-[1.2] animate__animated animate__fadeInRight">
            <img src="/src/images/landing/ai3.jpg" alt="mockup"/>
          </div>                

        </div>
      </section>
    </RevealOnScroll>



<section className="bg-gray-100 bg-opacity-85  dark:bg-gray-800">
        <div className="max-w-screen-xl px-4  py-8 mx-auto lg:py-24 lg:px-6 ">
        <RevealOnScroll delay=''>

        <h2 className="text-4xl font-extrabold text-black dark:text-white pb-4">Competitions</h2>
          <div className="grid md:grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-2">
          {forwardCards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
          </div>
       </RevealOnScroll>
       <RevealOnScroll delay=''>

          <h2 className="text-4xl font-extrabold text-black text-opacity-[1.5] dark:text-white py-4 ">Datasets</h2>
          <div className="grid md:grid-cols-3 gap-2 lg:grid-cols-4 sm:grid-cols-2">
          
          {backwardCards.map((card, index) => (
        <Card2 key={index} {...card} />
      ))}
           
          </div>
        </RevealOnScroll>

        </div>
</section>
<RevealOnScroll additionalProp={false} delay="">
<section>
      <div id="aboutUs" className="sm:flex items-center max-w-screen bg-white">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center hover:scale-[1.05]">
            <img src="https://i.imgur.com/WbQnbas.png" alt="About Us" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text group cursor-pointer">
            <span className="text-gray-500 border-b-2 group-hover:translate-x-6 border-indigo-600 uppercase">About us</span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl group-hover:scale-[1.05]">About <span className="text-indigo-600">TektAI</span>
            </h2>
            <p className="text-gray-700  group-hover:scale-[1.05]">
              {aboutUsContent}
            </p>
          </div>
        </div>
      </div>
    </section>
</RevealOnScroll>

<section className="bg-gray-200">
  <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-black dark:text-white">Why Choose Us</h2>
      <div className={`mt-8 grid grid-cols-1 gap-6 md:grid-cols-${Math.min(whyUsContent.length, 2)} lg:grid-cols-${Math.min(whyUsContent.length, 4)}`}>
        {whyUsContent.map((content, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.2] hover:shadow-xl"
          >
            <div className="px-6 py-8">
              <h3 className="text-xl font-semibold text-white mb-2">{content.title}</h3>
              <p className="text-white">{content.contentwhy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


<section className="bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 py-8 lg:py-16">
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-black dark:text-white mb-8">Our Team</h2>
    </div>
    <div className="flex flex-wrap justify-center -mx-4">
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="card-t hover:bg-gray-500 bg-gradient-to-br from-gray-300 to-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.05] hover:shadow-xl">
      <div className="img-container">
        <img className="w-full h-auto" src="src\images\user\feryel.png" alt="Luna Turner" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Feryel Ouerfelli</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Founder</p>
        <div className="flex items-center justify-center space-x-4">
          <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
          <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-github"></i></a>
          <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
     </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="card-t hover:bg-gray-500 bg-gradient-to-br from-gray-300 to-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.05] hover:shadow-xl">
          <div className="img-container">
            <img className="w-full h-auto" src="src\images\user\lina.jpg" alt="Luna Turner" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Lina Laroussi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Founder</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-github"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="card-t bg-gradient-to-br from-gray-300 to-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.05] hover:shadow-xl">
          <div className="img-container">
            <img className="w-full h-auto" src="src\images\user\Rouaida.jpg" alt="Luna Turner" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Rouaida BenRabeh</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Founder</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-github"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="card-t bg-gradient-to-br from-gray-300 to-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.05] hover:shadow-xl">
          <div className="img-container">
            <img className="w-full h-auto" src="src\images\user\fatma.jpg" alt="Luna Turner" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Fatma Abid</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Founder</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-github"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="card-t bg-gradient-to-br from-gray-300 to-gray-300 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.05] hover:shadow-xl">
          <div className="img-container">
            <img className="w-full h-auto" src="src\images\user\emna.jpg" alt="Luna Turner" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Emna Khiari </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Founder</p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fab fa-github"></i></a>
              <a href="#" className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"><i className="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



 <RevealOnScroll additionalProp={false} delay="">
    <section id="contactUs" className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">

        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto bg-white p-7 rounded-lg text-center hover:translate-y-12 hover:translate-x-12">
                <h2 className="mb-4 text-3xl font-extrabold leading-tight text-black tracking-tight text-gray-900 dark:text-white">Contact Us</h2>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    value={email} onChange={(e) =>checkEmail(e.target.value)} 
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                    />
    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                  <span className="absolute right-4 top-6">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
                    <div>
                        <textarea
                            rows={4}
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="text-white bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                        >
                            Send Message
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    </section>
  </RevealOnScroll>

  <RevealOnScroll delay='400'>
  <Footer />
  </RevealOnScroll>
    </ClientLayout>
  );
};

export default Landing;
