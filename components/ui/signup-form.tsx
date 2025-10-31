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
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    // Walidacja: Min. 8 znaków (jak w opisie)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setLoading(false)
      return
    }

    try {
      // Wyślij POST do backendu (fetch natywny w Next.js)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`, {
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
        throw new Error(data.message || 'Registration error')
      }

      const data = await res.json()
      // Zapisz token i user do localStorage (do autoryzacji w /profile itp.)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      console.log('Registration successful!', data.user)  // Debug w konsoli
      // Przekieruj do balance
      router.push('/balance')  // Lub '/' dla home
    } catch (err: any) {
      setError(err.message || 'Registration error. Please try again.')
      console.error('Registration error:', err)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-left gap-1 text-left">
          <h1 className="text-3xl font-bold">Create your account</h1>    
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input 
            id="name" 
            name="fullName"  // Dostosuj name do backendu
            type="text" 
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name" 
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
        <Field>          
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login" className="text-primary underline">Log in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}