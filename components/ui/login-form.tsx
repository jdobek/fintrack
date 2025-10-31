"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Walidacja podstawowa (email, hasło niepuste)
    if (!formData.email || !formData.password) {
      setError('Fill in all fields.')
      setLoading(false)
      return
    }

    try {
      // Wyślij POST do backendu (/login endpoint)
      const res = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Login error')
      }

      const data = await res.json()
      // Zapisz token i user do localStorage (jak w signup)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      console.log('Login successful!', data.user)  // Debug
      // Przekieruj do profilu
      router.push('/expenses')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.')
      console.error('Login error:', err)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-left gap-2 text-left">
          <h1 className="text-3xl font-bold">Welcome back!</h1>          
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input 
            id="email" 
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="adam@example.com" 
            required 
          />          
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
        </Field>
        {error && (
          <p className="text-destructive text-sm text-center px-4 py-2 bg-destructive/10 rounded-md">
            {error}
          </p>
        )}
        <Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Field>        
        <Field>          
          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account? <a href="/signup" className="text-primary underline">Sign up</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}