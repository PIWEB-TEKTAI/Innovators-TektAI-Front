import React from 'react';

const Footer: React.FC = () => {
        // Define your Google Maps API Key
        const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

        // Generate Google Maps Static API URL
        const staticMapUrl = `https://www.google.com/maps/place/ESPRIT+Ecole+Sup%C3%A9rieure+Priv%C3%A9e+d'Ing%C3%A9nierie+et+de+Technologies/@36.8991051,10.1892737,15z/data=!4m6!3m5!1s0x12e2cb75abbb1733:0x557a99cdf6c13b7b!8m2!3d36.8991051!4d10.1892737!16s%2Fg%2F11dybgg6rl?entry=ttu${GOOGLE_MAPS_API_KEY}`;
    
    return (
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
                  <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact</h3>
                    <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                Phone: <a href="tel:YOUR_PHONE_NUMBER">+216 52 717 171</a>
                            </li>
                            <li className="mb-4">
                                Email: <a href="#">Tektai@gmail.com</a>
                            </li>
                            <li className="mb-4">
                                Address: Esprit , El ghazela , Ariana
                            </li>
                        </ul>
                    </div>
               </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
          <div className="text-center">
              <a href="#" className="flex items-center justify-center mb-5 mr-4 text-2xl font-semibold text-gray-900 dark:text-white">
                  <img src="/src/images/landing/logo-transparent.png" className="h-6 mr-2 sm:h-9" alt="Landwind Logo" />
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
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                            <g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M24,4h-18c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM10.954,22h-2.95v-9.492h2.95zM9.449,11.151c-0.951,0 -1.72,-0.771 -1.72,-1.72c0,-0.949 0.77,-1.719 1.72,-1.719c0.948,0 1.719,0.771 1.719,1.719c0,0.949 -0.771,1.72 -1.719,1.72zM22.004,22h-2.948v-4.616c0,-1.101 -0.02,-2.517 -1.533,-2.517c-1.535,0 -1.771,1.199 -1.771,2.437v4.696h-2.948v-9.492h2.83v1.297h0.04c0.394,-0.746 1.356,-1.533 2.791,-1.533c2.987,0 3.539,1.966 3.539,4.522z"></path></g></g>
                         </svg>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </footer>

    );
};

export default Footer;
