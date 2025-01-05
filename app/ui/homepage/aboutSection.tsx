import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="relative bg-card">
      <div
        className="absolute inset-0 bg-about-bg bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.1 }}
      ></div>
      <div className="my-16 flex flex-col items-center justify-center">
        <h2 className="rounded-br-[40px] rounded-tl-[40px] border-4 border-brand1 bg-background px-10 py-4 font-ubuntu text-h2-u">
          About me
        </h2>
        <div
          className="mx-5 mt-8 flex flex-col rounded-[40px] bg-background p-6"
          style={{ zIndex: 1 }}
        >
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'<p>'}
          </span>
          <br />
          <span className="font-ibmPlexMono text-logo-m text-brand1">
            Hello!
          </span>
          <br />
          <p className="font-ibmPlexMono text-para-m">
            My name is Mujeeb and I specialize in web development that utilizes
            HTML, CSS, JS, and REACT etc. <br />
            <br />I am a highly motivated individual and eternal optimist
            dedicated to writing clear, concise, robust code that works.
            Striving to never stop learning and improving. <br />
            <br /> When I&apos;m not coding, I am writing blogs, reading, or
            picking up some new hands-on art project like photography. <br />
            <br />I like to have my perspective and belief systems challenged so
            that I see the world through new eyes.
          </p>
          <br />
          <span className="font-ibmPlexMono text-code-m text-brand2">
            {'<p>'}
          </span>
        </div>
        <div className="relative z-10">
          <Image
            src="/aboutImage.png"
            alt="About Image"
            width={400}
            height={400}
            className="mt-8"
          />
        </div>
      </div>
    </section>
  )
}
