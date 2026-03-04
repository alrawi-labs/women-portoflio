export interface SocialLink {
  name: string;
  icon: string; // Icon adı string olarak
  href: string;
}

export interface ContactData {
  email: string;
  phone?: string;
  location?: string;
  cvPath: string;
  projectsPath: string;
  socialLinks: SocialLink[];
}

export const contactData: ContactData = {
  email: "yasir7alrawi23@gmail.com",
  phone: "+90 531 264 90 16",
  location: "Kırıkkale, Turkey",
  cvPath: "/assets/docs/cv.pdf",
  projectsPath: "/projects",
  socialLinks: [
    {
      name: "Instagram",
      icon: "Instagram",
      href: "https://www.instagram.com/yasir7_23"
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      href: "https://www.linkedin.com/in/yasir-alrawi"
    },
    {
      name: "Twitter",
      icon: "Twitter",
      href: "https://x.com/YasirAlrawi7"
    },
    {
      name: "GitHub",
      icon: "Github",
      href: "https://github.com/yasir237"
    }
  ]
};