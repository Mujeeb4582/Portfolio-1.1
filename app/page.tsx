/* eslint-disable tailwindcss/classnames-order */
import { Briefcase, Link as LinkIcon, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Home() {
  const languages = [
    { name: 'HTML', color: 'html' },
    { name: 'CSS', color: 'css' },
    { name: 'JavaScript', color: 'js' },
    { name: 'React', color: 'react' },
  ]
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <section className="mt-16 w-full px-9">
        <div className="flex flex-col items-center border-4 p-1 font-ibmPlexMono">
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
          </div>
        </div>
      </section>
    </main>
  )
}
