import { WORK } from '@/app/lib/constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/ui/carousel'
import { UnderLine } from '@/app/ui/underLine'
import { WorkCard } from '@/app/ui/workCard'

// import CardCarousel from '../cardCarousel'

export default function WorkSection() {
  return (
    <div className="relative flex w-full flex-col space-y-4 bg-bg2 py-16 text-center">
      <div
        className="absolute inset-0 bg-work-bg bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.3 }}
      ></div>
      <div className="z-10 mb-16 flex flex-col items-center space-y-4">
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
      <div className="z-10 flex flex-col items-center space-y-8">
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {WORK.map((work, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <WorkCard key={index} work={work} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* <div className="flex items-center justify-center p-4">
        <CardCarousel
        // movies={movies}
        // autoplayInterval={6000}
        // showControls={true}
        />
      </div> */}
    </div>
  )
}
