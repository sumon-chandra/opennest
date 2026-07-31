import { LoginForm } from "../_components/LoginForm"

const LoginPage = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Sign In</h1>
        <p className="text-muted-foreground">Welcome back to Open Nest</p>
      </div>

      <LoginForm />
    </div>
  )
}

export default LoginPage
