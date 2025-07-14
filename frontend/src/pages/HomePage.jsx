// import React from 'react';

// const HomePage = () => {
//   const steps = [
//     { title: 'Discover', desc: 'Browse exciting campus events tailored to your interests', color: 'blue' },
//     { title: 'Register', desc: 'Quick and easy registration with QR code generation', color: 'green' },
//     { title: 'Attend', desc: 'Seamless check-in process using your personalized QR code', color: 'purple' },
//     { title: 'Get Recognized', desc: 'Automatic e-certificates and achievement portfolio', color: 'orange' }
//   ];

//   const smartFeatures = [
//     ['Smart QR Entry', 'Lightning-fast check-in with personalized QR codes.'],
//     ['Auto E-Certificates', 'Instant certificate generation upon event completion.'],
//     ['Built-in Chatbot', '24/7 AI assistant to help guide users.']
//   ];

//   const clubBenefits = [
//     ['Centralized Dashboard', 'Manage all your events from one place.'],
//     ['Live Attendance Stats', 'Real-time participation tracking.'],
//     ['Easy Promotion', 'Built-in tools to reach your target audience.'],
//     ['Certificate Automation', 'Automatic generation and distribution.']
//   ];

//   const eventGallery = [
//     ['Annual Tech Summit 2024', 'March 15, 2024', '250+ students'],
//     ['Cultural Fest Celebration', 'March 20, 2024', '400+ students'],
//     ['Sports Championship', 'March 25, 2024', '180+ students']
//   ];

//   const testimonials = [
//     {
//       quote: 'GLUBS increased our event turnout by 200%! The automated certificate system saves us hours of work.',
//       name: 'Alex Chen',
//       role: 'Tech Club Lead'
//     },
//     {
//       quote: 'Finally, I never miss events anymore! The notifications and QR check-in make everything so smooth.',
//       name: 'Sarah Patel',
//       role: '3rd Year CSE Student'
//     }
//   ];

//   return (
//     <div className="font-sans text-gray-900">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 shadow-sm">
//         <div className="text-xl font-bold text-blue-600">GLUBS</div>
//         <ul className="flex gap-6 text-sm font-medium">
//           <li>Features</li>
//           <li>Benefits</li>
//           <li>Events</li>
//         </ul>
//         <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Sign In</button>
//       </nav>

//       {/* Hero Section */}
//       <section className="text-center py-16 bg-gradient-to-b from-white to-blue-50">
//         <p className="text-sm text-blue-500 font-medium mb-2">Your Gateway to Campus Opportunities</p>
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Never Miss a Campus <span className="text-blue-600">Opportunity Again</span></h1>
//         <p className="max-w-2xl mx-auto text-gray-600 mb-6">
//           Discover, register, and attend university events with ease. Get recognized for your participation and build your campus profile.
//         </p>
//         <div className="flex justify-center gap-4">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold">Explore Events</button>
//           <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded font-semibold">For Organizers</button>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 px-4 bg-white">
//         <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
//         <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {steps.map((step, i) => (
//             <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-${step.color}-100 text-${step.color}-600 flex items-center justify-center font-bold`}>
//                 {i + 1}
//               </div>
//               <h3 className="font-semibold mb-2">{step.title}</h3>
//               <p className="text-sm text-gray-600">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Smart Features */}
//       <section className="py-16 bg-blue-50 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Smart Features</h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
//           {smartFeatures.map(([title, desc], i) => (
//             <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="font-semibold mb-2">{title}</h3>
//               <p className="text-sm text-gray-600">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Clubs Will Love GLUBS */}
//       <section className="py-16 bg-white px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Why Clubs Will Love GLUBS</h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
//           {clubBenefits.map(([title, desc], i) => (
//             <div key={i} className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <h3 className="font-semibold mb-2">{title}</h3>
//               <p className="text-sm text-gray-600">{desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Event Gallery Preview */}
//       <section className="py-16 px-4 bg-blue-50">
//         <h2 className="text-2xl font-bold text-center mb-10">Event Gallery Preview</h2>
//         <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {eventGallery.map(([title, date, audience], i) => (
//             <div key={i} className="bg-white shadow-md rounded-lg overflow-hidden">
//               <div className="bg-gray-300 h-40" />
//               <div className="p-4">
//                 <h3 className="font-semibold">{title}</h3>
//                 <p className="text-sm text-gray-500">{date}</p>
//                 <p className="text-xs text-gray-600 mt-1">{audience}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 bg-white px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">What Our Community Says</h2>
//         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
//           {testimonials.map((t, i) => (
//             <div key={i} className="bg-gray-50 p-6 rounded shadow-sm">
//               <p className="text-sm italic mb-4">“{t.quote}”</p>
//               <div className="font-semibold">{t.name}</div>
//               <div className="text-xs text-gray-500">{t.role}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="bg-blue-600 text-white py-16 text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
//         <p className="mb-6">Join thousands of students already using GLUBS to enhance their campus experience</p>
//         <div className="flex justify-center gap-4">
//           <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold">Register as Student</button>
//           <button className="bg-white text-blue-600 px-6 py-2 rounded font-semibold">Register as Organizer</button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white text-sm py-10 px-4">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
//           <div>
//             <h3 className="font-bold text-lg mb-2">GLUBS</h3>
//             <p>Your gateway to campus opportunities and meaningful connections.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Quick Links</h4>
//             <ul>
//               <li>About Us</li>
//               <li>Features</li>
//               <li>Pricing</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Support</h4>
//             <ul>
//               <li>Help Center</li>
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>API Docs</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Connect</h4>
//             <ul>
//               <li>Twitter</li>
//               <li>LinkedIn</li>
//               <li>Instagram</li>
//               <li>Discord</li>
//             </ul>
//           </div>
//         </div>
//         <div className="text-center mt-8 text-gray-400">© 2025 GLUBS. All rights reserved.</div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;





// import React from "react";
// import {
//   Search,
//   UserPlus,
//   CalendarCheck2,
//   Award,
//   QrCode,
//   FileText,
//   Bot,
//   LayoutDashboard,
//   BarChart3,
//   Megaphone,
//   CheckCircle,
//   Twitter,
//   Linkedin,
//   Instagram,
//   MessageCircle
// } from "lucide-react";

// const features = [
//   {
//     title: "Discover",
//     icon: <Search className="text-blue-600 w-6 h-6" />,
//     description: "Browse through exciting campus events tailored to your interests.",
//   },
//   {
//     title: "Register",
//     icon: <UserPlus className="text-green-600 w-6 h-6" />,
//     description: "Quick and easy registration with smart QR code generation.",
//   },
//   {
//     title: "Attend",
//     icon: <CalendarCheck2 className="text-purple-600 w-6 h-6" />,
//     description: "Seamless check-in process using your personalized QR code.",
//   },
//   {
//     title: "Get Recognized",
//     icon: <Award className="text-orange-600 w-6 h-6" />,
//     description: "Receive automatic e-certificates and build your portfolio.",
//   },
// ];

// const smartFeatures = [
//   {
//     title: "Smart QR Entry",
//     icon: <QrCode className="text-blue-600 w-6 h-6" />,
//     description: "Lightning-fast check-in with personalized QR codes.",
//   },
//   {
//     title: "Auto E-Certificates",
//     icon: <FileText className="text-green-600 w-6 h-6" />,
//     description: "Instant certificate generation upon event completion.",
//   },
//   {
//     title: "Built-in Chatbot",
//     icon: <Bot className="text-purple-600 w-6 h-6" />,
//     description: "24/7 AI assistant to help guide users and answer queries.",
//   },
// ];

// const clubBenefits = [
//   {
//     title: "Centralized Dashboard",
//     icon: <LayoutDashboard className="text-blue-600 w-6 h-6" />,
//     description: "Manage all your events from one intuitive interface.",
//   },
//   {
//     title: "Live Attendance Stats",
//     icon: <BarChart3 className="text-green-600 w-6 h-6" />,
//     description: "Real-time insights into event participation.",
//   },
//   {
//     title: "Easy Promotion",
//     icon: <Megaphone className="text-purple-600 w-6 h-6" />,
//     description: "Built-in marketing tools to reach your audience.",
//   },
//   {
//     title: "Certificate Automation",
//     icon: <CheckCircle className="text-orange-600 w-6 h-6" />,
//     description: "Automatic certificate generation and distribution.",
//   },
// ];

// const HomePage = () => {
//   return (
//     <div className="font-sans text-gray-900">
//       {/* Hero */}
//       <section className="text-center py-16 bg-gradient-to-b from-white to-blue-50 px-4">
//         <h1 className="text-4xl font-bold mb-4">
//           Never Miss a Campus <span className="text-blue-600">Opportunity Again</span>
//         </h1>
//         <p className="max-w-xl mx-auto text-gray-600 mb-6">
//           Discover, register, and attend university events with ease. Get recognized for your participation and build your campus profile.
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded">Explore Events</button>
//           <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded">For Organizers</button>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 bg-white px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {features.map((feature, idx) => (
//             <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Smart Features */}
//       <section className="py-16 bg-blue-50 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Smart Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
//           {smartFeatures.map((feature, idx) => (
//             <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Clubs Love */}
//       <section className="py-16 bg-white px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Why Clubs Will Love GLUBS</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {clubBenefits.map((benefit, idx) => (
//             <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{benefit.icon}</div>
//               <h3 className="font-semibold mb-2">{benefit.title}</h3>
//               <p className="text-sm text-gray-600">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white text-sm py-10 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div>
//             <h3 className="font-bold text-lg mb-2">GLUBS</h3>
//             <p>Your gateway to campus opportunities and meaningful connections.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Quick Links</h4>
//             <ul>
//               <li>About Us</li>
//               <li>Features</li>
//               <li>Pricing</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Support</h4>
//             <ul>
//               <li>Help Center</li>
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>API Docs</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Connect</h4>
//             <ul className="flex gap-4">
//               <li><Twitter className="w-5 h-5" /></li>
//               <li><Linkedin className="w-5 h-5" /></li>
//               <li><Instagram className="w-5 h-5" /></li>
//               <li><MessageCircle className="w-5 h-5" /></li>
//             </ul>
//           </div>
//         </div>
//         <div className="text-center mt-8 text-gray-400">© 2025 GLUBS. All rights reserved.</div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;



// import React from "react";
// import {
//   Search,
//   UserPlus,
//   CalendarCheck2,
//   Award,
//   QrCode,
//   FileText,
//   Bot,
//   LayoutDashboard,
//   BarChart3,
//   Megaphone,
//   CheckCircle,
//   Twitter,
//   Linkedin,
//   Instagram,
//   MessageCircle
// } from "lucide-react";

// const features = [
//   {
//     title: "Discover",
//     icon: <Search className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Browse through exciting campus events tailored to your interests.",
//   },
//   {
//     title: "Register",
//     icon: <UserPlus className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Quick and easy registration with smart QR code generation.",
//   },
//   {
//     title: "Attend",
//     icon: <CalendarCheck2 className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "Seamless check-in process using your personalized QR code.",
//   },
//   {
//     title: "Get Recognized",
//     icon: <Award className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
//     description: "Receive automatic e-certificates and build your portfolio.",
//   },
// ];

// const smartFeatures = [
//   {
//     title: "Smart QR Entry",
//     icon: <QrCode className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Lightning-fast check-in with personalized QR codes.",
//   },
//   {
//     title: "Auto E-Certificates",
//     icon: <FileText className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Instant certificate generation upon event completion.",
//   },
//   {
//     title: "Built-in Chatbot",
//     icon: <Bot className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "24/7 AI assistant to help guide users and answer queries.",
//   },
// ];

// const clubBenefits = [
//   {
//     title: "Centralized Dashboard",
//     icon: <LayoutDashboard className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Manage all your events from one intuitive interface.",
//   },
//   {
//     title: "Live Attendance Stats",
//     icon: <BarChart3 className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Real-time insights into event participation.",
//   },
//   {
//     title: "Easy Promotion",
//     icon: <Megaphone className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "Built-in marketing tools to reach your audience.",
//   },
//   {
//     title: "Certificate Automation",
//     icon: <CheckCircle className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
//     description: "Automatic certificate generation and distribution.",
//   },
// ];

// const HomePage = () => {
//   return (
//     <div className="font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
//       {/* Hero */}
//       <section className="text-center py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
//         <h1 className="text-4xl font-bold mb-4">
//           Never Miss a Campus <span className="text-blue-600 dark:text-blue-400">Opportunity Again</span>
//         </h1>
//         <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
//           Discover, register, and attend university events with ease. Get recognized for your participation and build your campus profile.
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Explore Events</button>
//           <button className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-6 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">For Organizers</button>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 bg-white dark:bg-gray-900 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {features.map((feature, idx) => (
//             <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Smart Features */}
//       <section className="py-16 bg-blue-50 dark:bg-gray-800 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Smart Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
//           {smartFeatures.map((feature, idx) => (
//             <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Clubs Love */}
//       <section className="py-16 bg-white dark:bg-gray-900 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Why Clubs Will Love GLUBS</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {clubBenefits.map((benefit, idx) => (
//             <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
//               <div className="mb-4 flex justify-center">{benefit.icon}</div>
//               <h3 className="font-semibold mb-2">{benefit.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white dark:bg-black text-sm py-10 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div>
//             <h3 className="font-bold text-lg mb-2">GLUBS</h3>
//             <p>Your gateway to campus opportunities and meaningful connections.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Quick Links</h4>
//             <ul>
//               <li>About Us</li>
//               <li>Features</li>
//               <li>Pricing</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Support</h4>
//             <ul>
//               <li>Help Center</li>
//               <li>Privacy Policy</li>
//               <li>Terms of Service</li>
//               <li>API Docs</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Connect</h4>
//             <ul className="flex gap-4">
//               <li><Twitter className="w-5 h-5" /></li>
//               <li><Linkedin className="w-5 h-5" /></li>
//               <li><Instagram className="w-5 h-5" /></li>
//               <li><MessageCircle className="w-5 h-5" /></li>
//             </ul>
//           </div>
//         </div>
//         <div className="text-center mt-8 text-gray-400">© 2025 GLUBS. All rights reserved.</div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;






// import React from "react";
// import {
//   Search,
//   UserPlus,
//   CalendarCheck2,
//   Award,
//   QrCode,
//   FileText,
//   Bot,
//   LayoutDashboard,
//   BarChart3,
//   Megaphone,
//   CheckCircle,
//   Twitter,
//   Linkedin,
//   Instagram,
//   MessageCircle
// } from "lucide-react";

// const features = [
//   {
//     title: "Discover",
//     icon: <Search className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Browse through exciting campus events tailored to your interests.",
//   },
//   {
//     title: "Register",
//     icon: <UserPlus className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Quick and easy registration with smart QR code generation.",
//   },
//   {
//     title: "Attend",
//     icon: <CalendarCheck2 className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "Seamless check-in process using your personalized QR code.",
//   },
//   {
//     title: "Get Recognized",
//     icon: <Award className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
//     description: "Receive automatic e-certificates and build your portfolio.",
//   },
// ];

// const smartFeatures = [
//   {
//     title: "Smart QR Entry",
//     icon: <QrCode className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Lightning-fast check-in with personalized QR codes.",
//   },
//   {
//     title: "Auto E-Certificates",
//     icon: <FileText className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Instant certificate generation upon event completion.",
//   },
//   {
//     title: "Built-in Chatbot",
//     icon: <Bot className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "24/7 AI assistant to help guide users and answer queries.",
//   },
// ];

// const clubBenefits = [
//   {
//     title: "Centralized Dashboard",
//     icon: <LayoutDashboard className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
//     description: "Manage all your events from one intuitive interface.",
//   },
//   {
//     title: "Live Attendance Stats",
//     icon: <BarChart3 className="text-green-600 dark:text-green-400 w-6 h-6" />,
//     description: "Real-time insights into event participation.",
//   },
//   {
//     title: "Easy Promotion",
//     icon: <Megaphone className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
//     description: "Built-in marketing tools to reach your audience.",
//   },
//   {
//     title: "Certificate Automation",
//     icon: <CheckCircle className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
//     description: "Automatic certificate generation and distribution.",
//   },
// ];

// const HomePage = () => {
//   return (
//     <div className="font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
//       {/* Hero */}
//       <section className="text-center py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
//         <h1 className="text-4xl font-bold mb-4">
//           Never Miss a Campus <span className="text-blue-600 dark:text-blue-400">Opportunity Again</span>
//         </h1>
//         <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-6">
//           Discover, register, and attend university events with ease. Get recognized for your participation and build your campus profile.
//         </p>
//         <div className="flex flex-wrap justify-center gap-4">
//           <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 hover:scale-105 transition-transform duration-300">Explore Events</button>
//           <button className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-6 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800 hover:scale-105 transition-transform duration-300">For Organizers</button>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 bg-white dark:bg-gray-900 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {features.map((feature, idx) => (
//             <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Smart Features */}
//       <section className="py-16 bg-blue-50 dark:bg-gray-800 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Smart Features</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
//           {smartFeatures.map((feature, idx) => (
//             <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
//               <div className="mb-4 flex justify-center">{feature.icon}</div>
//               <h3 className="font-semibold mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Why Clubs Love */}
//       <section className="py-16 bg-white dark:bg-gray-900 px-4">
//         <h2 className="text-2xl font-bold text-center mb-10">Why Clubs Will Love GLUBS</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
//           {clubBenefits.map((benefit, idx) => (
//             <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
//               <div className="mb-4 flex justify-center">{benefit.icon}</div>
//               <h3 className="font-semibold mb-2">{benefit.title}</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white dark:bg-black text-sm py-10 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div>
//             <h3 className="font-bold text-lg mb-2">GLUBS</h3>
//             <p>Your gateway to campus opportunities and meaningful connections.</p>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Quick Links</h4>
//             <ul className="space-y-1">
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">About Us</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Features</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Pricing</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Support</h4>
//             <ul className="space-y-1">
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Help Center</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Privacy Policy</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Terms of Service</li>
//               <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">API Docs</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-semibold mb-2">Connect</h4>
//             <ul className="flex gap-4">
//               <li><Twitter className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
//               <li><Linkedin className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
//               <li><Instagram className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
//               <li><MessageCircle className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
//             </ul>
//           </div>
//         </div>
//         <div className="text-center mt-8 text-gray-400">© 2025 GLUBS. All rights reserved.</div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import {
  Search,
  UserPlus,
  CalendarCheck2,
  Award,
  QrCode,
  FileText,
  Bot,
  LayoutDashboard,
  BarChart3,
  Megaphone,
  CheckCircle,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    title: "Discover",
    icon: <Search className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
    description: "Browse through exciting campus events tailored to your interests.",
  },
  {
    title: "Register",
    icon: <UserPlus className="text-green-600 dark:text-green-400 w-6 h-6" />,
    description: "Quick and easy registration with smart QR code generation.",
  },
  {
    title: "Attend",
    icon: <CalendarCheck2 className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
    description: "Seamless check-in process using your personalized QR code.",
  },
  {
    title: "Get Recognized",
    icon: <Award className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
    description: "Receive automatic e-certificates and build your portfolio.",
  },
];

const smartFeatures = [
  {
    title: "Smart QR Entry",
    icon: <QrCode className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
    description: "Lightning-fast check-in with personalized QR codes.",
  },
  {
    title: "Auto E-Certificates",
    icon: <FileText className="text-green-600 dark:text-green-400 w-6 h-6" />,
    description: "Instant certificate generation upon event completion.",
  },
  {
    title: "Built-in Chatbot",
    icon: <Bot className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
    description: "24/7 AI assistant to help guide users and answer queries.",
  },
];

const clubBenefits = [
  {
    title: "Centralized Dashboard",
    icon: <LayoutDashboard className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
    description: "Manage all your events from one intuitive interface.",
  },
  {
    title: "Live Attendance Stats",
    icon: <BarChart3 className="text-green-600 dark:text-green-400 w-6 h-6" />,
    description: "Real-time insights into event participation.",
  },
  {
    title: "Easy Promotion",
    icon: <Megaphone className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
    description: "Built-in marketing tools to reach your audience.",
  },
  {
    title: "Certificate Automation",
    icon: <CheckCircle className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
    description: "Automatic certificate generation and distribution.",
  },
];

const HomePage = () => {
  return (
    <div className="font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-950 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">GLUBS</h1>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#smart-features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Smart Features</a>
            <a href="#club-benefits" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Why Clubs</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section with Centered Cards & Punchlines */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10 text-gray-900 dark:text-white">
          Transform the Way You <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Discover & Organize Events
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
              🚀 <span className="font-semibold text-blue-600 dark:text-blue-400">300% more registrations</span> through smarter discovery and QR-based signups.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
              📊 Centralized dashboard for <span className="text-purple-600 dark:text-purple-400 font-semibold">organizers</span> to manage everything in one place.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 font-medium text-base">
              🎓 Automatic <span className="font-semibold text-green-600 dark:text-green-400">e-certificates</span> and attendance stats — no paperwork required.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300">
            Explore Events
          </button>
          <button className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300">
            For Organizers
          </button>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white dark:bg-gray-900 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Smart Features */}
      <section id="smart-features" className="py-16 bg-blue-50 dark:bg-gray-800 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Smart Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          {smartFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Clubs Will Love GLUBS */}
      <section id="club-benefits" className="py-16 bg-white dark:bg-gray-900 px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Why Clubs Will Love GLUBS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {clubBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white dark:bg-black text-sm py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">GLUBS</h3>
            <p>Your gateway to campus opportunities and meaningful connections.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">About Us</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Features</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Pricing</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1">
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Help Center</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Privacy Policy</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">Terms of Service</li>
              <li className="hover:text-blue-400 cursor-pointer transition-transform hover:translate-x-1">API Docs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <ul className="flex gap-4">
              <li><Twitter className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
              <li><Linkedin className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
              <li><Instagram className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
              <li><MessageCircle className="w-5 h-5 hover:text-blue-400 transition-transform transform hover:scale-110" /></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400">© 2025 GLUBS. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default HomePage;
