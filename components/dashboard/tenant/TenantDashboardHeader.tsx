import MotionDiv from "@/components/common/MotionDiv"

const TenantDashboardHeader = () => {
  return (
    <MotionDiv>
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        Welcome to Your Dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage your bookings and discover new properties
      </p>
    </MotionDiv>
  )
}

export default TenantDashboardHeader
