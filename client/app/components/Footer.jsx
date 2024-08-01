import Link from "next/link";
import Image from "next/image";

import icon_insta from "../../public/images/sm_icons/icon-insta.svg";
import icon_linkedin from "../../public/images/sm_icons/icon-linkedin.svg";
import icon_github from "../../public/images/sm_icons/icon-github.svg";

import HE_Logo from "../../public/images/HE_Logo.svg";

const Footer = () => {
  const socials = [
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/el-qadi/",
      icon: icon_linkedin,
    },
    {
      label: "Github",
      href: "https://github.com/hassanelq/",
      icon: icon_github,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hassan_elq/",
      icon: icon_insta,
    },
  ];
  return (
    <footer className="w-full flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center py-8 gap-10 ">
        {socials.map(({ href, label, icon }) => (
          <Link key={label} href={href} target="_blank">
            <Image
              src={icon}
              width={30}
              height={30}
              alt="Social Media Icon"
            ></Image>
          </Link>
        ))}
      </div>
      <Image src={HE_Logo} height="auto" className="py-8" alt="HE Logo" />

      <p className="text-[#838383] py-8 text-center">
        All rights reserved. © Copyright Hassan EL QADI 2024
      </p>
    </footer>
  );
};

export default Footer;
