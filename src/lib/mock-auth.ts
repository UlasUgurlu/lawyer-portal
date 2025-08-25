// Mock user data for demo purposes
export const mockUsers = [
  {
    id: '1',
    email: 'admin@omerhukuk.com',
    password: 'admin123', // In real app, this would be hashed
    name: 'Ömer Demir',
    role: 'FIRM_ADMIN',
    firmId: '1',
    isActive: true
  },
  {
    id: '2',
    email: 'avukat1@omerhukuk.com',
    password: 'lawyer123',
    name: 'Mehmet Kaya',
    role: 'LAWYER',
    firmId: '1',
    isActive: true
  },
  {
    id: '3',
    email: 'avukat2@omerhukuk.com',
    password: 'lawyer123',
    name: 'Ayşe Yılmaz',
    role: 'LAWYER',
    firmId: '1',
    isActive: true
  },
  {
    id: '4',
    email: 'paralegal@omerhukuk.com',
    password: 'paralegal123',
    name: 'Fatma Şen',
    role: 'PARALEGAL',
    firmId: '1',
    isActive: true
  },
  {
    id: '5',
    email: 'muvekkil1@example.com',
    password: 'client123',
    name: 'Ali Veli',
    role: 'CLIENT',
    firmId: '1',
    isActive: true
  },
  {
    id: '6',
    email: 'muvekkil2@example.com',
    password: 'client123',
    name: 'Zeynep Özkan',
    role: 'CLIENT',
    firmId: '1',
    isActive: true
  }
]

export function findUserByEmail(email: string) {
  return mockUsers.find(user => user.email === email)
}

export function validatePassword(plainPassword: string, userPassword: string) {
  // In demo mode, we just compare plain text
  // In production, use bcrypt.compare(plainPassword, hashedPassword)
  return plainPassword === userPassword
}
