import Image from "next/image";

export function ThemeSection() {
  return (
    <section className="bg-[#eeede9] py-section">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-0">
        {/* 상단 타이틀 */}
        <div className="text-center">
          <p className="text-sm font-medium text-blue md:text-base">
            이번 달은 🍡🍔🍕 테마로 선별했습니다!
          </p>
          <p className="mt-2 text-sm text-black/70 md:text-base">
            매달 바뀌는 테마, 매달 달라지는 간식 1:1 전담 매니저가 만들어 드립니다.
          </p>
        </div>

        {/* 테마 카드 그리드 */}
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:px-[260px]">
          {/* 메인 테마 카드 (왼쪽, 세로로 큼) */}
          <article className="flex items-stretch">
            <div className="w-full max-w-[320px] rounded-[32px] bg-white shadow-sm">
              <Image
                src="/images/theme/theme-main.png"
                alt="24시간 대응 1:1 매니저 테마"
                width={320}
                height={360}
                className="h-auto w-full rounded-[32px]"
              />
              <p className="sr-only">
                24시간 대응 1:1 매니저 테마. 고객사의 긴급 요청부터 사소한 불편까지
                간식 담당 매니저가 바로 대응합니다.
              </p>
            </div>
          </article>

          {/* 오른쪽 테마 카드들 */}
          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
            {/* 1. 매달 바뀌는 테마간식 (가로로 긴 카드) */}
            <article className="col-span-2 rounded-[32px] bg-white shadow-sm">
              <Image
                src="/images/theme/theme-monthly.png"
                alt="매달 바뀌는 테마간식"
                width={640}
                height={180}
                className="h-auto w-full rounded-[32px]"
              />
              <p className="sr-only">
                매달 바뀌는 테마간식. 단백질 간식, 집중력 간식, 계절 한정 테마 등
                월별 테마에 맞춘 간식을 제공합니다.
              </p>
            </article>

            {/* 2. 배송의 한계를 넘어 */}
            <article className="rounded-[32px] bg-white shadow-sm">
              <Image
                src="/images/theme/theme-delivery.png"
                alt="배송의 한계를 넘어"
                width={300}
                height={180}
                className="h-auto w-full rounded-[32px]"
              />
              <p className="sr-only">
                배송의 한계를 넘어. 밤샘, 야간, 새벽 등 다양한 시간대에 맞춘 간식
                배송을 지원합니다.
              </p>
            </article>

            {/* 3. 커스터마이징 */}
            <article className="rounded-[32px] bg-white shadow-sm">
              <Image
                src="/images/theme/theme-customizing.png"
                alt="커스터마이징 테마"
                width={300}
                height={180}
                className="h-auto w-full rounded-[32px]"
              />
              <p className="sr-only">
                커스터마이징 테마. 다양한 알러지 및 입맛 제약을 고려해 팀에 딱 맞는
                간식 구성을 제안합니다.
              </p>
            </article>

            {/* 4. 회사별 맞춤 간식 (오른쪽 상단에 별도 카드가 있다면 사용) */}
            {/* 필요 시 아래 주석을 해제하고 이미지를 추가해 사용할 수 있습니다.
            <article className="col-span-2 rounded-[32px] bg-white shadow-sm">
              <Image
                src="/images/theme/theme-company.png"
                alt="회사별 맞춤 간식"
                width={640}
                height={160}
                className="h-auto w-full rounded-[32px]"
              />
              <p className="sr-only">
                회사별 맞춤 간식. 팀 문화와 업무 패턴에 맞춘 맞춤형 간식 구성을
                설계합니다.
              </p>
            </article>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}

