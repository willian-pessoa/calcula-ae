import Image from 'next/image'

import Basal from '@/components/Basal/Basal'
import SobreTMB from '@/components/SobreTMB/SobreTMB'

export default function Home() {
  return (
    <main>
     <Basal />
     <SobreTMB />
    </main>
  )
}
