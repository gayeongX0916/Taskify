import { colorList } from "@/lib/utils/dashboardColor";
import Image from "next/image";
import { useState } from "react";
import checkIcon from "@/assets/white_check_icon.svg";
import ModalButton from "@/components/common/Button/ModalButton";
import { useDashboardStore } from "@/lib/stores/dashboard";
import { putDashboard } from "@/lib/api/dashboards";
import { putDashboardType } from "@/types/dashboards";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/lib/stores/loading";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

type EditDashboardCardProps = {
  dashboardId: number;
};

export function EditDashboardCard({ dashboardId }: EditDashboardCardProps) {
  const router = useRouter();
  const key = "editDashboard";
  const start = useLoadingStore((s) => s.startLoading);
  const stop = useLoadingStore((s) => s.stopLoading);
  const isLoading = useLoadingStore((s) => s.loadingMap[key] ?? false);
  const dashboardIdNum = Number(dashboardId);
  const dashboard = useDashboardStore(
    (state) => state.dashboardsById[dashboardIdNum]
  );
  const updateDashboard = useDashboardStore((s) => s.updateDashboard);
  const [color, setColor] = useState(dashboard?.color ?? "");
  const [title, setTitle] = useState("");

  const handlePutDashboard = async (data: putDashboardType) => {
    try {
      start(key);
      const res = await putDashboard(data);
      updateDashboard(res.data.id, res.data.title, res.data.color);
      toast.success("대시보드 수정에 성공했습니다.");
      router.push(`/dashboard/${dashboardId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "대시보드 수정에 실패했습니다."
        );
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      stop(key);
    }
  };

  return (
    <section className="bg-white_FFFFFF px-[16px] py-[20px] rounded-[8px] md:px-[28px] md:py-[32px] md:rounded-[16px]">
      <h1 className="text-xl text-black_333236 mb-[24px] font-bold md:text-2xl">
        {dashboard?.title}
      </h1>
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handlePutDashboard({
            dashboardId: dashboardId,
            title: title,
            color: color,
          });
        }}
      >
        <div className="flex flex-col gap-y-[8px] mb-[16px]">
          <label htmlFor="dashboard-name" className="text-lg text-black_333236">
            대시보드 이름
          </label>
          <input
            id="dashboard-name"
            className="px-[16px] py-[15px] rounded-[8px] border border-gray_D9D9D9 w-full h-[40px] md:h-[50px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex gap-x-[8px]">
          {colorList.map((list) => (
            <button
              key={list}
              type="button"
              onClick={() => setColor(list)}
              style={{ backgroundColor: list }}
              className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
            >
              {color === list && <Image src={checkIcon} alt="체크" />}
            </button>
          ))}
        </div>

        <footer className="mt-[32px]">
          <ModalButton
            mode="any"
            type="button"
            onClick={() =>
              handlePutDashboard({
                dashboardId: dashboardId,
                title: title,
                color: color,
              })
            }
            disabled={isLoading}
          >
            {isLoading ? "변경 중..." : "변경"}
          </ModalButton>
        </footer>
      </form>
    </section>
  );
}
