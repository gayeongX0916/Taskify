import emailIcon from "@/assets/email_icon.svg";
import facebookIcon from "@/assets/facebook_icon.svg";
import instagramIcon from "@/assets/instagram_icon.svg";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const socialList = [
    { img: emailIcon, alt: "이메일" },
    { img: facebookIcon, alt: "페이스북" },
    { img: instagramIcon, alt: "인스타그램" },
  ];

  return (
    <footer className="bg-black_000000 text-gray_9FA6B2 text-xs md:text-lg pb-[90px] md:pb-[0]">
      <div className="flex flex-col items-center md:flex-row md:justify-between md:px-[40px] md:py-[40px] lg:px-[140px]">
        <p className="mb-[12px] md:mb-[0]">&copy; codeit - 2023</p>
        <div className="mb-[68px] md:mb-[0] flex gap-x-[20px] md:gap-x-[32px]">
          <button>Privacy Policy</button>
          <button>FAQ</button>
        </div>
        <ul className="flex gap-x-[20px] items-center">
          {socialList.map(({ img, alt }) => (
            <li key={alt} className="flex">
              <Link href="#">
                <Image
                  key={alt}
                  src={img}
                  alt={alt}
                  width={18}
                  height={18}
                  className="md:w-[20px] md:h-[20px] lg:w-[22px] lg:h-[22px]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
