"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'  // Shadcn Card

// NOWY: Typ dla użytkownika z backendu
interface User {
  _id: string
  fullName: string
  email: string
  createdAt: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)  // Typowane: User lub null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // Brak tokena – przekieruj do login
      window.location.href = '/login'
      return
    }

    // Pobierz profil z backendu
    fetch('http://localhost:4000/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Authorization error - please log in again.')
      }
      return res.json()
    })
    .then(data => {
      setUser(data)  // TS wie, że data to User (z backendu)
    })
    .catch(err => {
      setError(err.message)
      localStorage.removeItem('token')  // Wyczyść token przy błędzie
      localStorage.removeItem('user')
    })
    .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'  // Lub router.push('/login') – dodaj import useRouter jeśli chcesz
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.href = '/signup'} className="ml-4">Try again</Button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Access denied – please log in.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Your profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* FIX: Optional chaining ? dla bezpieczeństwa, choć user nie jest null */}
          <p><strong>Full name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString('pl-PL')}</p>
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}