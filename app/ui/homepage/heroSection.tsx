import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar'
import { Button } from '@/app/ui/button'
import { Card } from '@/app/ui/card'
import {
  Briefcase,
  Download,
  Link as LinkIcon,
  Mail,
  MapPin,
} from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  const languages = [
    { name: 'HTML', color: 'html' },
    { name: 'CSS', color: 'css' },
    { name: 'JS', color: 'js' },
    { name: 'React', color: 'react' },
  ]

  const professionalMetrics = [
    { count: 4, category: 'Programming Language' },
    { count: 6, category: 'Development Tools' },
    { count: 4, category: 'Years of Experience' },
  ]
  return (
    <div>
      <section className="mt-16 w-full px-9">
        <div className="flex flex-col items-center rounded-br-[160px] rounded-tl-[160px] border-4 border-white p-1 font-ibmPlexMono shadow-[-4px_-4px_2px_0px_#12F7D6]">
          <Avatar className="mt-9 size-24 border-4 border-brand1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-logo-m">Mujeeb</h1>
          <p className="text-code-m">Full Stack Developer</p>
          <div className="mt-8 flex flex-col space-y-4 text-code-m">
            <div className="flex items-center space-x-2">
              <Mail className="size-[14px] text-brand1" />
              <span>mujeeburahman4582@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="size-[14px] text-brand1" />
              <span>Pakistan</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="size-[14px] text-brand1" />
              <span>Full-time / Freelancer</span>
            </div>
            <div className="flex items-center space-x-2">
              <LinkIcon className="size-[14px] text-brand1" />
              <Link href="#">www.mujeeb.com</Link>
            </div>
            <div className="flex items-center space-x-2">
              {languages.map((language) => (
                <span
                  key={language.name}
                  className={`rounded-lg bg-brand1 px-2 py-1 uppercase text-black`}
                >
                  {language.name}
                </span>
              ))}
            </div>
            <div className="">
              <Button className="mb-9 mt-5 flex items-center gap-4 rounded-3xl px-8 py-4 font-ubuntu text-button-u">
                <span>Download CV</span>
                <Download />{' '}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 w-full px-9">
        <div>
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'<h1>'}
          </span>
          <h2 className="ml-4 font-ubuntu text-h2-u">
            Hey <br /> I&apos;m <span className="text-brand1">Mujeeb</span>
            <br />
            Full-stack developer
          </h2>
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'</h1>'}
          </span>
        </div>
        <div className="mt-9">
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'<p>'}
          </span>
          <p className="ml-4 font-ibmPlexMono text-para-m">
            I help business grow by crafting amazing web experiences. If you’re
            looking for a developer that likes to get stuff done,
          </p>
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'</p>'}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="font-ibmPlexMono text-h2-m text-brand1">
            Let&apos;s Talk
          </span>
          <Link href="#">
            <Mail className="h-[18px] w-[22px] text-brand1" />
          </Link>
        </div>
        <div className="flex w-full justify-center">
          <Card className="my-16 h-[378px] w-[215px] rounded-[80px]">
            <div className="flex flex-col space-y-12 px-8 py-12">
              {professionalMetrics.map((metric) => (
                <div
                  key={metric.category}
                  className="flex items-center justify-center gap-4"
                >
                  <span className="font-ibmPlexMono text-number-m text-brand1">
                    {metric.count}
                  </span>
                  <span className="font-ibmPlexMono text-para-m">
                    {metric.category}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
