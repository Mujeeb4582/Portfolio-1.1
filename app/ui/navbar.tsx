import { ThemeToggle } from '@/app/theme-toggle'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md">
      <div className="text-2xl font-bold">Portfolio</div>
      <div className="flex space-x-4">
        {/* <a href="#" className="">
          Home
        </a>
        <a href="#" className="">
          About
        </a>
        <a href="#" className="">
          Projects
        </a>
        <a href="#" className="">
          Contact
        </a> */}
        <ThemeToggle />
      </div>
    </nav>
  )
}
