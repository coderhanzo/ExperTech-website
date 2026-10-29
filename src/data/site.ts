// Edit the template's business details and section content here.
export const site = {
  name: "NeuraForge",
  suffix: "Systems",
  email: "neuraforgesys@gmail.com",
  phone: "+233 (0) 20 375 8021",
  whatsapp: "https://wa.me/233203758021?text=Hello%20NeuraForge%20Systems%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  formId: "meajgvda",
  location: "Accra, Ghana",
};

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "Company", href: "#about" },
  { label: "Our process", href: "#process" },
];

export const projects = [
  { name: "CBK Beauty", category: "Beauty & wellness", title: "A better day at the salon.", description: "Appointments, products, loyalty and the team behind it all. One connected platform for the everyday work of running a beauty business.", features: ["Appointments", "Commerce", "Loyalty"], status: "In development", kind: "booking", href: "#contact", link: "Discuss a similar project", color: "peach" },
  { name: "Telande", category: "Food & media", title: "Good food. A bigger audience.", description: "A publishing platform that puts a growing recipe library in the hands of its creator. Easy to explore, search and keep coming back to.", features: ["Recipe library", "Search", "Publishing"], status: "Live project", kind: "publishing", href: "https://www.telandeworld.com", link: "Visit Telande", color: "green" },
  { name: "KwirkMart", category: "Retail & commerce", title: "From the shelf to your door.", description: "A shop-from-home experience connected to inventory, orders and the operations behind every delivery. Built for customers and the people serving them.", features: ["Mobile commerce", "Inventory", "Orders"], status: "Live project", kind: "commerce", href: "https://apps.apple.com/gb/app/kwirkmart/id6752880752", link: "View on the App Store", color: "blue" },
] as const;

export const process = [
  { name: "Scope", title: "Start with the real problem.", description: "We listen to how your business works, map out what needs to change, and agree on a clear scope, budget and delivery plan.", deliverable: "A shared plan before we write code." },
  { name: "Build", title: "See the work as it happens.", description: "Design, development and testing happen in focused iterations. You review working software, give feedback and stay close to the decisions.", deliverable: "Working software. Regular conversations." },
  { name: "Run", title: "Launch with a team behind you.", description: "We help move your team onto the new system, document how it works, and support it as real customers and real work arrive.", deliverable: "Your code, your platform, room to grow." },
];

export const industries = [
  { name: "Retail & commerce", image: "retail.webp", title: "Keep the whole shop connected.", description: "Connect the storefront, stockroom and delivery team, so every sale starts with the same information.", tags: ["Ecommerce", "Inventory", "Payments"] },
  { name: "Beauty & wellness", image: "beauty.webp", title: "Make room for your customers.", description: "Bring appointments, reminders, customer records and payments together in a simpler working day.", tags: ["Booking", "Customer records", "Loyalty"] },
  { name: "Food & hospitality", image: "hospitality.webp", title: "More time for good service.", description: "From recipe publishing to ordering and reservations, build the digital side around the experience you deliver.", tags: ["Publishing", "Ordering", "Reservations"] },
];

export const faqs = [
  { question: "What can you help us build?", answer: "We design and build websites, mobile apps, ecommerce platforms and internal business systems. We also improve existing software and connect tools with workflow automation." },
  { question: "How long does a project usually take?", answer: "Most engagements run 8 to 16 weeks to a first production release, depending on scope. We agree on a realistic delivery plan after understanding your requirements." },
  { question: "Can you work with our existing software?", answer: "Yes. We start by understanding what works today, then recommend what to keep, improve or replace. A complete rewrite is only useful when it solves the actual problem." },
  { question: "Who owns the code when we launch?", answer: "You own the code and infrastructure. We provide documentation and a handover, with optional ongoing support for maintenance and future development." },
  { question: "Do you work with businesses outside Ghana?", answer: "Yes. We are based in Accra and work remotely with teams across time zones, using regular demos, written updates and a shared project workspace." },
];
