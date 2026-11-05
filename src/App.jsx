import {useReveal} from '@/lib/useReveal'
import {Nav} from './sections/Nav'
import {Hero} from './sections/Hero'
import {Budget} from './sections/Budget'
import {Tagline} from './sections/Tagline'
import {HowItWorks} from './sections/HowItWorks'
import {Exposure} from './sections/Exposure'
import {Tray} from './sections/Tray'
import {Accuracy} from './sections/Accuracy'
import {Download} from './sections/Download'
import {Faq} from './sections/Faq'
import {FinalCta, Footer} from './sections/Footer'

export default function App() {
  useReveal()
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Budget />
        <Tagline />
        <HowItWorks />
        <Exposure />
        <Tray />
        <Accuracy />
        <Download />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
