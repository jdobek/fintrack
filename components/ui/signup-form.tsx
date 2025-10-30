"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"  // Do przekierowania po sukcesie
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()  // Przekieruj po sukcesie

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Walidacja: Porównaj hasła
    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie pasują do siebie.')
      setLoading(false)
      return
    }

    // Walidacja: Min. 8 znaków (jak w opisie)
    if (formData.password.length < 8) {
      setError('Hasło musi mieć co najmniej 8 znaków.')
      setLoading(false)
      return
    }

    try {
      // Wyślij POST do backendu (fetch natywny w Next.js)
      const res = await fetch('http://localhost:4000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),  // Wyślij tylko potrzebne pola (bez confirmPassword)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Błąd rejestracji')
      }

      const data = await res.json()
      // Zapisz token i user do localStorage (do autoryzacji w /profile itp.)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      console.log('Rejestracja udana!', data.user)  // Debug w konsoli
      // Przekieruj do profilu lub home (dostosuj ścieżkę)
      router.push('/profile')  // Lub '/' dla home
    } catch (err: any) {
      setError(err.message || 'Błąd rejestracji. Spróbuj ponownie.')
      console.error('Błąd signup:', err)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input 
            id="name" 
            name="fullName"  // Dostosuj name do backendu
            type="text" 
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe" 
            required 
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="m@example.com" 
            required 
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input 
            id="password" 
            name="password"
            type="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input 
            id="confirm-password" 
            name="confirmPassword"
            type="password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        {error && (
          <p className="text-destructive text-sm text-center px-4 py-2 bg-destructive/10 rounded-md">
            {error}
          </p>
        )}
        <Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" disabled={loading}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login" className="text-primary underline">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}