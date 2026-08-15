import MotionDiv from "@/components/common/MotionDiv"
import { LoginForm } from "../_components/LoginForm"

const LoginPage = () => {
  return (
    <MotionDiv
      className="w-full rounded-2xl border border-white/20 bg-background/60 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40"
    >
      <div className="mb-8 text-center">
        <h1 className="mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-3xl font-extrabold text-primary">
          Welcome Back
        </h1>
        <p className="text-muted-foreground">Sign in to your Open Nest account</p>
      </div>

      <LoginForm />
    </MotionDiv>
  )
}

export default LoginPage
