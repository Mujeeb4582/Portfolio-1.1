import Image from 'next/image'
import Link from 'next/link'

export const WorkCard: React.FC<{ work: { url: string; name: string } }> = ({
  work,
}) => {
  return (
    <div className="grid h-[200px] grid-cols-5 gap-4">
      <div id="codingView" className="col-span-2">
        <div className="flex size-full flex-col items-center">
          <div className="relative size-full grow rounded-sm border-[6px] border-gray-700">
            <Image
              src={work.url}
              alt={work.name}
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="h-1/6 w-6 bg-gray-700"></div>
          <div className="h-1.5 w-20 rounded-t-full bg-gray-700"></div>
        </div>
      </div>
      <div id="WebsiteView" className="col-span-3 space-y-2">
        <div className="font-ibmPlexMono">
          <Link href={work.url} target="_blank" rel="noopener noreferrer">
            {work.name}
          </Link>
        </div>
        <div className="flex size-full grow flex-col items-center">
          <div className="relative h-4/6 w-full grow rounded-sm border-[6px] border-gray-700">
            <Image
              src={work.url}
              alt={work.name}
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex h-5 w-full items-center justify-center rounded-b-lg bg-gray-100">
            <div className="size-2 rounded-full bg-black"></div>
          </div>
          <div className="h-4 w-6 bg-gray-100"></div>
          <div className="h-1/6 w-20 rounded-t-md bg-gray-100"></div>
          {/* <div className="h-1.5 w-20 rounded-t-full bg-gray-100"></div> */}
        </div>
      </div>
    </div>
  )
}
