"use client";

import landingMain from "@/assets/landing_main.svg";
import landing1 from "@/assets/landing_1.svg";
import landing2 from "@/assets/landing_2.svg";
import landing3 from "@/assets/landing_3.svg";
import landing4 from "@/assets/landing_4.svg";
import landing5 from "@/assets/landing_5.svg";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const featureList = [
    {
      img: landing3,
      title: "대시보드 설정",
      des: "대시보드 사진과 이름을 변경할 수 있어요.",
    },
    { img: landing4, title: "초대", des: "새로운 팀원을 초대할 수 있어요." },
    {
      img: landing5,
      title: "구성원",
      des: "구성원을 초대하고 내보낼 수 있어요",
    },
  ];

  return (
    <div className="bg-black_000000 px-[16px] md:px-[40px] lg:px-0">
      <div className="mx-auto max-w-[1200px]">
        <section className="flex flex-col items-center pt-[35px]">
          <Image
            src={landingMain}
            alt="메인 페이지"
            width={287}
            height={168}
            className="w-full max-w-[722px] h-auto"
          />

          <div className="flex flex-col items-center md:flex-row gap-y-[6px] md:gap-x-[24px] mt-[26px] mb-[20px]">
            <h1 className="text-white_FFFFFF text-[40px] font-bold md:text-[56px] whitespace-nowrap">
              새로운 일정 관리
            </h1>
            <h1 className="text-violet_5534DA text-[42px] font-bold  md:text-[70px] whitespace-nowrap">
              Taskify
            </h1>
          </div>

          <button
            className="bg-violet_5534DA px-[87px] py-[11px] rounded-[8px] text-md text-white_FFFFFF md:text-2lg md:py-[14px]"
            onClick={() => router.push("/login")}
          >
            로그인하기
          </button>
        </section>

        <div className="mt-[70px] flex flex-col gap-y-[60px] mb-[120px]">
          <section className="bg-black_171717 rounded-[8px] pt-[60px] flex flex-col gap-y-[194px] md:pl-[60px] lg:flex-row lg:justify-between lg:pt-[100px]">
            <div className="flex flex-col items-center gap-y-[60px] md:items-start md:gap-y-[100px]">
              <span className="text-2lg text-gray_9FA6B2 lg:text-[22px]">
                Point 1
              </span>
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[36px] font-bold text-white_FFFFFF lg:text-[48px]">
                  일의 우선순위를
                </h2>
                <h2 className="text-[36px] font-bold text-white_FFFFFF lg:text-[48px]">
                  관리하세요
                </h2>
              </div>
            </div>
            <div className="flex justify-end pl-[40px] md:pl-[0]">
              <Image src={landing1} alt="우선순위 관리" />
            </div>
          </section>

          <section className="bg-black_171717 rounded-[8px] flex flex-col gap-y-[192px] pt-[60px] lg:flex-row-reverse lg:pl-[100px] lg:pt-[100px] lg:justify-end lg:gap-x-[100px]">
            <div className="flex flex-col gap-y-[61px] items-center md:items-start md:pl-[60px] lg:pl-0">
              <span className="text-2lg text-gray_9FA6B2 lg:text-[22px]">
                Point 2
              </span>
              <div className="flex flex-col items-center md:items-start">
                <h2 className="text-[36px] font-bold text-white_FFFFFF lg:text-[48px]">
                  해야 할 일을
                </h2>
                <h2 className="text-[36px] font-bold text-white_FFFFFF lg:text-[48px]">
                  등록하세요
                </h2>
              </div>
            </div>
            <div className="flex justify-center px-[60px] md:px-0">
              <Image src={landing2} alt="해야 할 일 등록" />
            </div>
          </section>

          <div className="flex flex-col gap-y-[40px] items-center lg:items-start">
            <h3 className="text-xl text-white_FFFFFF font-bold md:text-[28px]">
              생산성을 높이는 다양한 설정 ⚡
            </h3>

            <div className="flex flex-col gap-y-[40px] w-full lg:flex-row lg:gap-x-[30px]">
              {featureList.map(({ img, title, des }) => (
                <article
                  key={title}
                  className="bg-black_171717 rounded-[8px] w-full overflow-hidden"
                >
                  <div className="bg-black_4B4B4B flex justify-center items-center min-h-[250px] rounded-t-[8px]">
                    <Image src={img} alt={title} />
                  </div>

                  <div className="flex flex-col gap-y-[18px] py-[27px] pl-[32px]">
                    <h4 className="text-2lg text-white_FFFFFF font-bold">
                      {title}
                    </h4>
                    <p className="text-lg text-white_FFFFFF font-medium">
                      {des}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
