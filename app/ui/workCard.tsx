import Image from 'next/image'

export const WorkCard: React.FC<{ work: { url: string; name: string } }> = ({
  work,
}) => {
  return (
    <div>
      <Image src={work.url} alt={work.name} width={300} height={300} />
    </div>
  )
}
