import { WORK } from '@/app/lib/constant'
import { UnderLine } from '@/app/ui/underLine'
import { WorkCard } from '@/app/ui/workCard'

export default function WorkSection() {
  return (
    <div className="relative flex w-full flex-col space-y-4 bg-bg2 py-16 text-center">
      {/* <div
        className="bg-work-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.1 }}
      ></div> */}
      <div className="mb-16 flex flex-col items-center space-y-4">
        <div className="flex w-[11.4375rem] flex-col items-center">
          <h3 className="text-center font-ubuntu text-h1-u text-brand1">
            Works
          </h3>
          <UnderLine />
        </div>
        <p className="w-[21.375rem] font-ibmPlexMono text-para-m">
          I had the pleasure of working with these awesome projects
        </p>
      </div>
      <div className="flex flex-col items-center space-y-8">
        {WORK.map((work, index) => (
          <WorkCard key={index} work={work} />
        ))}
      </div>
    </div>
  )
}
