import { SignupForm } from "../_components/SignupForm"

const SignupPage = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Create Account
        </h1>
        <p className="text-muted-foreground">Join Open Nest to get started</p>
      </div>

      <SignupForm />
    </div>
  )
}

export default SignupPage
