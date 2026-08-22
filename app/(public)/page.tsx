import { HeroSection } from "@/components/(public)/home/HeroSection"
import { SystemFeatures } from "@/components/(public)/home/SystemFeatures"
import { PlatformBenefits } from "@/components/(public)/home/PlatformBenefits"
import { HowItWorks } from "@/components/(public)/home/HowItWorks"
import { StatsSection } from "@/components/(public)/home/StatsSection"
import { CTASection } from "@/components/(public)/home/CTASection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SystemFeatures />
      <PlatformBenefits />
      <HowItWorks />
      <StatsSection />
      <CTASection />
    </>
  )
}
